db.users.remove({});

const initialUsers = [
  {
    id: 1, 
    username: 'A0242720R',
    password: '12345678',
    name: 'Xinyue',
    type: ['student','admin'],
  },
  {
      id: 2,
      username: 'A0242694X',
      password: '12345678',
      name: 'Qianqian',
      type: ['student','admin'],
  },
  {
      id: 3,
      username: 'PKV',
      password: '12345678',
      name:'Dr.Prasanna',
      type:['teacher','tutor'],
  },
  {
    id: 4,
    username: '1',
    password: '1',
    name:'Corona',
    type:['student','tutor'],
  },
  {
    id: 5,
    username: '2',
    password: '2',
    name:'Virus',
    type:['student'],
}
];

const initialHealth = [
    {username:'A0242720R', Date:'20211120', temperature:'36.5', status:'Green', covid:0, symptoms:[]},
    {username:'A0242694X', Date:'20211120', temperature:'36.5', status:'Green', covid:0, symptoms:[]},
    {username:'PKV', Date:'20211120', temperature:'36.5', status:'Green', covid:0, symptoms:[]},
    {username:'1', Date:'20211118', temperature:'37.5', status:'Red', covid:1, symptoms:['Fever','Headache']},
    {username:'2', Date:'20211118', temperature:'37.6', status:'Red', covid:1, symptoms:['Fever','Cough']},
];

const initialEntry = [
  {username:'PKV', Datetime:'202111181650', type:0},
  {username:'PKV', Datetime:'202111192050', type:1, fromwhere:2, residence:'Room 1606, Marina Bay Sands Hotel, 10 Bayfront Avenue Singapore 018956', placesPassed:'Marina Bay, Sands SkyPark'},
];

const initialPositive = [
  {username:'1', name:'Corona', Date:'20211118', trace:['BMF5346(BIZ1-0202)','FIN3117(BIZ2-0510)','LC2004(LAW_CR2-1)','YHU2323(Y-ArtsStud)']},
  {username:'2', name:'Corona', Date:'20211118', trace:['BMF5346(BIZ1-0202)','ME2112(EA-02-21)',' IS6101(I3-AUD)','NUR41038(LT37-03-07A)']}
]

const initialBuildings = [
  {name:'BIZ1', Date:'20211118',username:'1'},
  {name:'BIZ2', Date:'20211118',username:'1'},
  {name:'LAW_CR2-1', Date:'20211118',username:'1'},
  {name:'Y-ArtsStud', Date:'20211118',username:'1'},
  {name:'BIZ1', Date:'20211118',username:'2'},
  {name:'EA-02-21', Date:'20211118',username:'2'},
  {name:'I3-AUD', Date:'20211118',username:'2'},
  {name:'LT37-03-07A', Date:'20211118',username:'2'},
]

db.users.insertMany(initialUsers);
db.health.insertMany(initialHealth);
db.entry.insertMany(initialEntry);
db.positive.insertMany(initialPositive);
db.buildings.insertMany(initialBuildings);

const count = db.users.count();
print('Inserted', count, 'initialUsers');

db.users.createIndex({ id: 1 }, { unique: true });
db.health.createIndex({ username : 1}, { unique : true});