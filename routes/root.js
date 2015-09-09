var router = require('express').Router();
module.exports = router;

var bluebird = require('bluebird');

var models = require('../models');
// var Place = models.Place;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Hotel = models.Hotel;

router.get('/', function(req, res) {
  bluebird.map([Restaurant, Hotel, Activity], function(model) {
    return model.find({}).exec();
  }).then(function(data) {
    var asdf = {
      Restaurants: data[0],
      Hotels: data[1],
      Activities: data[2]
    };
    res.render('demo.html', asdf)
  })
  //
  //
  //
  // var r = Restaurant.find({}).exec();
  // var a = Activity.find({}).exec();
  // var h = Hotel.find({}).exec();
  // var finds = [ r, a, h ];
  // bluebird.all(finds).then(function(data) {
  //   var asdf = {
  //     Restaurants: data[0],
  //     Hotels: data[2],
  //     Activities: data[1]
  //   };
  //   // res.send(data[1])
  //   // console.log(asdf)
  //   res.render('demo.html', asdf)
  // })
});
