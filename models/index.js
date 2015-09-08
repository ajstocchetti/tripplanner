// Make sue your `mongod` process is running!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var placeSchema = new mongoose.Schema({
  address: String,
  city: String,
  State: String,
  phone: String,
  location: [Number]
})

var hotelSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  num_stars: { type: Number, min: 1, max: 5 },
  amenities: { type: [String], get: makeCommaList }
});

var activitySchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  age_range: String
});

var restaurantSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  price: { type: Number, min: 1, max: 5 },
  cuisine: { type: [String], get: makeCommaList }
});


function makeCommaList(arr) {
  return arr.reduce(function(prev, curr) {
    if(prev == "")
      return curr;
    else
      return prev += ", " + curr;
  });
};

var Place = mongoose.model('Place', placeSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant
};
