db.users.remove({});
db.health.remove({});
db.entry.remove({});
db.positive.remove({});
db.buildings.remove({});
db.tutors.remove({});
db.reviews.remove({});
const initialUsers = [{
  id: 1,
  username: 'A0242720R',
  password: '12345678',
  name: 'Xinyue',
  type: ['student', 'admin'],
  dorm: '1-101',
  courses: ['IT5007', 'IT5005', 'BMD5301', 'BMF5342', 'FT5001', 'FT5002']
}, {
  id: 2,
  username: 'A0242694X',
  password: '12345678',
  name: 'Qianqian',
  type: ['student', 'admin'],
  dorm: '1-101',
  courses: ['IT5007', 'IT5005', 'IT5001', 'FT5001', 'FT5002']
}, {
  id: 3,
  username: 'PKV',
  password: '12345678',
  name: 'Dr.Prasanna',
  type: ['staff', 'tutor'],
  dorm: '2-101',
  courses: ['IT5007']
}, {
  id: 4,
  username: '1',
  password: '1',
  name: 'Corona',
  type: ['student', 'tutor'],
  dorm: '3-101',
  courses: ['IT5002']
}, {
  id: 5,
  username: '2',
  password: '2',
  name: 'Virus',
  type: ['student'],
  dorm: '3-102',
  courses: ['IT5002']
}];
const initialHealth = [{
  username: 'A0242720R',
  Date: '20211120',
  temperature: '36.5',
  status: 'Green',
  covid: 0,
  symptoms: []
}, {
  username: 'A0242694X',
  Date: '20211120',
  temperature: '36.5',
  status: 'Green',
  covid: 0,
  symptoms: []
}, {
  username: 'PKV',
  Date: '20211120',
  temperature: '36.5',
  status: 'Green',
  covid: 0,
  symptoms: []
}, {
  username: '1',
  Date: '20211118',
  temperature: '37.5',
  status: 'Red',
  covid: 1,
  symptoms: ['Fever', 'Headache']
}, {
  username: '2',
  Date: '20211118',
  temperature: '37.6',
  status: 'Red',
  covid: 1,
  symptoms: ['Fever', 'Cough']
}];
const initialEntry = [{
  username: 'PKV',
  Datetime: '202111181650',
  type: 0
}, {
  username: 'PKV',
  Datetime: '202111192050',
  type: 1,
  fromwhere: 2,
  residence: 'Room 1606, Marina Bay Sands Hotel, 10 Bayfront Avenue Singapore 018956',
  placesPassed: 'Marina Bay, Sands SkyPark'
}];
const initialPositive = [{
  username: '1',
  name: 'Corona',
  Date: '20211118',
  trace: ['BMF5346(BIZ1-0202)', 'FIN3117(BIZ2-0510)', 'LC2004(LAW_CR2-1)', 'YHU2323(Y-ArtsStud)']
}, {
  username: '2',
  name: 'Corona',
  Date: '20211118',
  trace: ['BMF5346(BIZ1-0202)', 'ME2112(EA-02-21)', ' IS6101(I3-AUD)', 'NUR41038(LT37-03-07A)']
}];
const initialBuildings = [{
  name: 'BIZ1',
  Date: '20211118',
  username: '1'
}, {
  name: 'BIZ2',
  Date: '20211118',
  username: '1'
}, {
  name: 'LAW_CR2-1',
  Date: '20211118',
  username: '1'
}, {
  name: 'Y-ArtsStud',
  Date: '20211118',
  username: '1'
}, {
  name: 'BIZ1',
  Date: '20211118',
  username: '2'
}, {
  name: 'EA-02-21',
  Date: '20211118',
  username: '2'
}, {
  name: 'I3-AUD',
  Date: '20211118',
  username: '2'
}, {
  name: 'LT37-03-07A',
  Date: '20211118',
  username: '2'
}];
const initialTutors = [{
  username: 'PKV',
  gender: 'M',
  courseType: ['CS', 'FT'],
  courses: ['CS3443', 'IT5001', 'FT5309'],
  price: [40, 60],
  // format: day of week - time of day (last for 1 hour)
  availability: ['1-10', '6-17', '7-19'],
  level: 'D',
  degree: 'Doctor of Philosophy in Computer Science',
  completedLessons: 49,
  numReviews: 2,
  stars: 5,
  intro: 'I love tutoring and I am also a big fan of computer science. The thought of combining these two together makes me so excited, and I am happy to help other students in CS.'
}, {
  username: '1',
  gender: 'F',
  courseType: ['CS', 'ST'],
  courses: ['CS3443', 'IT5002', 'ST5300'],
  price: [30, 50],
  availability: ['1-15', '3-17', '5-19'],
  level: 'M',
  degree: 'Master of Science in Statistics',
  completedLessons: 50,
  numReviews: 2,
  stars: 4.5,
  intro: 'I love tutoring and I am also a big fan of computer science. The thought of combining these two together makes me so excited, and I am happy to help other students in CS.'
}];
const initialReviews = [{
  date: '20201220',
  tutorName: 'PKV',
  studentName: 'A0242694X',
  stars: 5,
  content: 'Wonderful tutor who gives so many feedbacks on my progress.'
}, {
  date: '20200805',
  tutorName: 'PKV',
  studentName: 'A0242720R',
  stars: 5,
  content: 'Wonderful tutor who gives so many feedbacks on my progress.'
}, {
  date: '20201221',
  tutorName: '1',
  studentName: 'A0242694X',
  stars: 4,
  content: 'Wonderful tutor in general, hope could be more on-time.'
}, {
  date: '20201220',
  tutorName: '1',
  studentName: 'A0242720R',
  stars: 5,
  content: 'Wonderful tutor who gives so many feedbacks on my progress.'
}];
db.users.insertMany(initialUsers);
db.health.insertMany(initialHealth);
db.entry.insertMany(initialEntry);
db.positive.insertMany(initialPositive);
db.buildings.insertMany(initialBuildings);
db.tutors.insertMany(initialTutors);
db.reviews.insertMany(initialReviews); // const count = db.users.count();
// print('Inserted', count, 'initialUsers');

db.users.createIndex({
  id: 1
}, {
  unique: true
});
db.health.createIndex({
  username: 1
}, {
  unique: false
});
db.entry.createIndex({
  username: 1
}, {
  unique: false
});
db.tutors.createIndex({
  username: 1
}, {
  unique: true
});
db.reviews.createIndex({
  tutorName: 1
}, {
  unique: false
});