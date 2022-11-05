const express = require('express');
const fs = require('fs');
const path = require('path');

// import express from 'express';
// import fs from "fs";
// import path from 'path';

// const DBPath = path.join(__dirname, './index.html');

const app = express();

// app.get('/hello', (req, res) => {
//     res.send(`Hello ` + req.query.name);
// });    // localhost:3000/hello?name=Ivan

// app.get('/hello/:id', (req, res) => {
//     res.send(`Hello ` + req.params.id);
// });   // localhost:3000/hello/790

// app.get('/person', (req, res) => {     // 1
//     res.send(req.query);
// });   // localhost:3000/person?name=Ivan

// app.get('/person', (req, res) => {    // 2
//     // res.sendFile(DBPath);
//     res.sendFile('Lesson-3/index.html', {root: '.'});

//     // fs.readFile('Lesson-3/index.html', 'utf-8', (err, data) => {
//     //     if (err) res.send(err);
//     //     else res.send(data);
//     //     console.log('data-get', data)
//     // });
// });   // localhost:3000/person

// app.get('/person', (req, res) => {   // 3 не сделал
//     res.sendStatus(204)
//     // res.status(404);
//     // res.send('NO-CONTENT');
// }); // localhost:3000/person

// app.get('/hel+o/:id', (req, res) => {   // 1
//     res.send(`req.url-${req.url} req.params.id-${req.params.id}`);
// });

// app.get('/hell?o/:id', (req, res) => {  // 2
//     res.send(`req.url-${req.url} req.params.id-${req.params.id}`);
// });

// app.get('/hello/(:id)?', (req, res) => {   // 3
//     res.send(`req.url-${req.url} req.params.id-${req.params.id}`);
// });

// app.get(/.*/, (req, res) => {   // 4
//     res.send(`req.url-${req.url} req.params.id-${req.params.id}`);
// });

//middlewares
app.use((req, res, next) => {
    //user:password
    if (req.header('Authorization') !== 'Basic dXNlcjpwYXNzd29yZA==') {
        res.header('WWW-Authenticate', 'Basic');
        res.sendStatus(401);
    } else {
        next();
    }
})
app.use((req, res, next) => {
    console.log(new Date().toISOString());
    next();
});
app.get('/person', (req, res) => res.send({name: 'Ivan'}))



//Статический веб-контент
// app.use('/', express.static('./public'));

app.listen(3000, () => console.log('start')); 

// "start": "nodemon Lesson-3/index.js",

// "type": "module",