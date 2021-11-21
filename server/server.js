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
    Positive,
    about: () => aboutMessage,
    User,
    Test,
    Health,
    Entry,
  },
  Mutation: {
    HealthAdd,
    EntryAdd,
  }
};

async function Positive(_, {date}) {
  const positives = await db.collection('positive').find({Date: date}).toArray();
  //console.log(date + " : positives="+ JSON.stringify(positives));
  return positives;
}

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

async function Entry(_, {username}) {
  const entry = await db.collection('entry').find({username: username}).toArray();
  return entry;
}

async function EntryAdd(_, {entry}) {
  await db.collection('entry').insert(entry);
  return entry;
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
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);
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
