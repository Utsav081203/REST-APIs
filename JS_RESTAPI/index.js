const express = require('express');
const fs = require('fs');
let users = require('./MOCK_DATA.json');

const app = express();

const PORT = 8000;

// middlewares used 
// intermediate for request handling
// express isn't aware which type of data is arriving in post request and how to handle it.
app.use(express.urlencoded({extended: false}));
// app.use() adds middleware to application
// express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads (i.e., data sent using forms)
// extended option is a boolean flag that determines the library used to parse the URL-encoded data.

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    // .join('') since map makes elements and they are seperated by , by default
    res.send(html);
});

// REST API

app.get('/api/users', (req, res) => {
    return res.json(users);
});

// colon suggests the url maybe dynamic and the parameter could be accessed
app.get('/api/users/:userid', (req, res) => {
    const id = req.params.userid;
    return res.json(users.filter(user => user.id == id));
    // const id = Number(req.params.userid);
    // const user = users.find((user) => user.id === id);
    // return res.json(user);
});

app.post('/api/users',(req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    });
});

app.patch('/api/users/:userid', (req, res) => {
    const userid = Number(req.params.userid);
    const insertuser = req.body;
    const newusers = users.filter(user => user.id !== userid);
    newusers.push({...insertuser, id: userid});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newusers), (err, data) => {
        return res.json({status: "Success", id: userid});
    });
    users = newusers;
});

app.delete('/api/users/:userid', (req, res) => {
    const userid = Number(req.params.userid);
    const newusers = users.filter(user => user.id !== userid);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newusers), (err, data) => {
        return res.json({status: "Success", id: userid});
    });
});

// app
//   .route('/api/users/:userid')
//   .get((req, res) => {
//     // logic for get
//   })
//   .patch((req, res) => {
//     // logic for put
//   })
//   .delete((req, res) => {
//     // logic for delete
//   });

// if url is same or route is same for methods, then we can merge them

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

/*
JSON data supported
We want to make an API that supports browser as well as mobile apps and other platforms.
So we customize the api for handling browser differently and others who want JSON raw data differently

GET /users - HTML Document Rendered.
GET api/users - List all users.
GET api/users/userid - Get the user with user id userid.

POST api/users - Create new user.

PATCH api/users/userid - Edit the user with user id userid.

DELETE api/users/userid - Delete the user with user id userid.
*/