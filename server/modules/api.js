var express = require('express');
var app = express();
var db = require('./database.js');

app.get('/users', function (req, res) {
  var data = {
    result: []
  };

  var itemsOnPage = 10;
  var totalItemsLength = db.get('users').size().value();
  var fromItem = parseInt(req.query.fromItem) || 0;
  if (fromItem > totalItemsLength) {fromItem = totalItemsLength - 1;}
  if (fromItem < 0) {fromItem = 0;}
  var toItem = fromItem + itemsOnPage;
  var items = db.get('users').value().slice(fromItem, toItem);
  var lastItemTotal = db.get('users').last().value();
  var lastItem = items[items.length-1];
  var isLastPage = (lastItem.id === lastItemTotal.id);

  data.result = items;

  if (totalItemsLength > items.length && !isLastPage) {
    data.nextPageUrl = '?fromItem=' + toItem;
  }

  if (fromItem > 0) {
    let pages = (fromItem - itemsOnPage);
    pages = pages < 0 ? 0 : pages;
    data.previousPageUrl = '?fromItem=' + pages.toString();
  }

  res.send(data);
});

app.get('/user/:id', function (req, res) {
  var data = db.get('users').find({id: req.params.id}).value();
  if (!data) {
    data = {message: 'Not found'};
    res.status(404).send(data);
    return;
  }
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

module.exports = app;