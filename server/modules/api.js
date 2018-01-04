var express = require('express');
var app = express();
var db = require('./database.js');
// var moment = require('moment');

app.get('/users', function (req, res) {
  var data = db.get('users').value();
  res.send(data);
});

app.get('/user/:id', function (req, res) {
  var data = db.get('users').find({id: req.params.id}).value();
  res.send(data);
});

app.post('/users/:id', function (req, res) {
  var isEmptyName = (req.body.name.length === 0);
  var isTooLong = (req.body.name.length > 500 || req.body.avatarUrl.length > 500);

  if (isEmptyName || isTooLong) {
    res.status(400).send('invalid data');
    return;
  }

  var newUserData = {
    name: req.body.name,
    avatarUrl: req.body.avatarUrl
  };

  db.get('users').find({ id: req.params.id }).assign(newUserData).write();
  res.send('updated, t-thanks');
});

// app.post('/posts', function (req, res) {
//   var newPost = {
//     text: req.body.text,
//     id: new Date().getTime(),
//     date: moment().format('MMM Do, HH:mm')
//   };

//   if (req.body.text) {
//     db.get('posts').push(newPost).write();
//     res.send(newPost);
//   } else {
//     res.status(400).send(newPost);
//   }
// });

// app.delete('/posts/:id', function (req, res) {
//   var deleteResult = db.get('posts').remove({ id: parseInt(req.params.id, 10) }).write();

//   if (deleteResult.length) {
//     res.status(200).send(deleteResult);
//   } else {
//     res.status(400).send(deleteResult);
//   }
// });

module.exports = app;