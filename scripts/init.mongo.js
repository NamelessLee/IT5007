db.users.remove({});

const initialUsers = [
  {
    id: 1, 
    username: 'A0242720R',
    password: '12345678',
    name: 'Xinyue',
    type: ['student','admin']
  },
  {
      id: 2,
      username: 'A0242694X',
      password: '12345678',
      name: 'Qianqian',
      type: ['student','admin']
  },
  {
      id: 3,
      username: 'PKV',
      password: '12345678',
      name:'Dr.Prasanna',
      type:['teacher','tutor']
  }
];

db.users.insertMany(initialUsers);

const count = db.users.count();
print('Inserted', count, 'initialUsers');

db.users.createIndex({ id: 1 }, { unique: true });
