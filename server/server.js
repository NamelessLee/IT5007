const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/safemngm';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

let db;
let aboutMessage = "Safe Management";

const resolvers = {
  Query: {
    about: () => aboutMessage,
    User,
    Test,
    Health,
  },
  Mutation: {
    HealthAdd,
  }
};

function Test(_, {id}) {
  var res = "id="+ id;
  console.log("id="+ id);
  return res;
}

async function User(_, {user}) {
  let username = user.username;
  const users = await db.collection('users').find({username: username}).toArray();
  console.log("users="+ JSON.stringify(users));
  return users;
}

async function Health(_, {username}) {
  const health = await db.collection('health').find({username: username}).toArray();
  return health[health.length - 1];
}

async function HealthAdd(_, {health}) {
  health.date = (new Date()).toString();
  const size = health.symptoms.length;
  if (health.covid == 1) health.status = 'Red';
  else if (size > 0 || parseFloat(health.temperature) > 37.5) health.status = 'Yellow';
  else health.status = 'Green';
  await db.collection('health').insert(health);
  return health;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
  const myCollections = await db.listCollections().toArray();
  console.log("myCollections= "+ JSON.stringify(myCollections));
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
});

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(8080, function () {
      console.log('App started on port 8080');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
