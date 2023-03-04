

1.To create Database
use Zenclass

2.Create a Collection users
db.createCollection("users")
//Insert Data in Users

db.users.insertMany([
{
    userid:1,
    name:"Vicky",
    email:"vicky@gmail.com"
},{
    userid:2,
    name:"Zen",
    email:"zen@gmail.com"
},{
    userid:3,
    name:"GuviGeek",
    email:"guvigeek@gmail.com"
},{
    userid:4,
    name:"Deny",
    email:"deny@gmail.com"
},{
    userid:5,
    name:"Beno",
    email:"beno@gmail.com"
}
]);

3.Create a Collection codekata
  db.createCollection("codekata")
//Insert Data in Codekata
db.codekata.insertMany([
    {
        userid:1,
        problems_solved:35,
    },
     {
        userid:2,
        problems_solved:40,
    },
     {
        userid:3,
        problems_solved:20,
    },
     {
        userid:4,
        problems_solved:8,
    },
     {
        userid:5,
        problems_solved:14,
    }
    ]);
    4.Create a Collection Attendance
     db.createCollection("attendance")
   //Insert Data in Attendance
    db.attendance.insertMany([
    {
      userid: 1,
      topicid: 1,
      attended: true,
    },
    {
      userid: 2,
      topicid: 2,
      attended: false,
    },
    {
      userid: 3,
      topicid: 3,
      attended: false,
    },
    {
      userid: 4,
      topicid: 4,
      attended: false,
    },
    {
      userid: 5,
      topicid: 5,
      attended: true,
    },
  ]);
  5.Create a Collection Topics
   db.createCollection("topics")
  
  //Insert Data in Topics
  db.topics.insertMany([
    {
      topicid: 1,
      topic: "React",
      topic_date: new Date("8-oct-2020"),
    },
    {
      topicid: 2,
      topic: "Node",
      topic_date: new Date("5-oct-2020"),
    },
    {
      topicid: 3,
      topic: "MongoDb",
      topic_date: new Date("12-oct-2020"),
    },
    {
      topicid: 4,
      topic: "MySql",
      topic_date: new Date("22-oct-2020"),
    },
    {
      topicid: 5,
      topic: "AWS",
      topic_date: new Date("28-oct-2020"),
    },
  ]);
  6.Create a Collection Tasks
   db.createCollection("tasks")
  //Insert Data in Tasks
  db.tasks.insertMany([
    {
      taskid: 1,
      topicid: 1,
      userid: 1,
      task: ""React task",
      due_date: new Date("12-oct-2020"),
      submitted: true,
    },
    {
      taskid: 2,
      topicid: 2,
      userid: 2,
      task: "Node task",
      due_date: new Date("8-oct-2020"),
      submitted: true,
    },
    {
      taskid: 3,
      topicid: 3,
      userid: 3,
      task: "MongoDb task",
      due_date: new Date("15-oct-2020"),
      submitted: false,
    },
    {
      taskid: 4,
      topicid: 4,
      userid: 4,
      task: "MySql task",
      due_date: new Date("24-oct-2020"),
      submitted: false,
    },
    {
      taskid: 5,
      topicid: 5,
      userid: 5,
      task: "AWS task",
      due_date: new Date("30-oct-2020"),
      submitted: false,
    },
  ]);
  
  7.Create a Collection Company_drives
    db.createCollection("company_drives")
//  Insert Data in Company_drives
  db.company_drives.insertMany([
   {
      userid: 1,
      drive_date: new Date("14-oct-2020"),
      company: "Zoho",
    },
    {
      userid: 1,
      drive_date: new Date("15-oct-2020"),
      company: "Meta",
    },
    {
      userid: 2,
      drive_date: new Date("19-oct-2020"),
      company: "Wipro",
    },
    {
      userid: 3,
      drive_date: new Date("22-oct-2020"),
      company: "Tcs",
    },
    {
      userid: 4,
      drive_date: new Date("27-oct-2020"),
      company: "Cts",
    },
  ]);
  
  8.Create a Collection Mentors
    db.createCollection("mentors")
   //Insert Data in Mentors
  db.mentors.insertMany([
    {
        mentorid: 1,
        mentorname: "Rex",
        mentor_email:"Rex@gmail.com",
        class_count: 35,
    },
      {
        mentorid: 2,
        mentorname: "Kumar",
        mentor_email: "Kumar@gmail.com",
        class_count: 45,
    },
      {
        mentorid: 3,
        mentorname: "Arul",
        mentor_email: "Arul@gmail.com",
        class_count: 50,
    },
    {
        mentorid: 4,
        mentorname: "Pugazh",
        mentor_email: "Pugazh@gmail.com",
        class_count: 20,
    },{
        mentorid: 5,
        mentorname: "Bala",
        mentor_email: "Bala@gmail.com",
        class_count: 15,
    },])





//find all topics and task which are taught in month of october




1)Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "topicid",
        foreignField: "topicid",
        as: "task info",
      },
    },
    {
      $match: {
        $and: [
              { topic_date: { $gt: new Date("30-sep-2020") } },
              { topic_date: { $lt: new Date("1-nov-2020") } },
        ],
      },
    },
  ]);
  
  2)Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
  
  db.company_drives.find({drive_date:{$gte: new Date("15-oct-2020"), $lte: new Date("31-oct-2020") }})
  
  3)Find all the company drives and students who are appeared for the placement.
 
 db.company_drives.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "userid",
        as: "student",
      },
    },{
        $project:{
            _id:0,
            company:1,
            drive_date:1,
            "student.name":1,
            "student.email":1
        }
    }
  ]);
  
  4)Find the number of problems solved by the user in codekata
  
    db.codekata.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "userid",
        as: "student",
      },
    }, {
        $project:{
            _id:0,
            problems_solved:1,
            "student.name":1,
            "student.email":1
        }
    }
  ]);
  
  5)Find all the mentors with who has the mentee's count more than 15
  
  db.mentors.find({class_count:{$gt:15}})




