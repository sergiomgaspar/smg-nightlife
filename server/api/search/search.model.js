'use strict';

import mongoose from 'mongoose';

var SearchSchema = new mongoose.Schema({
  yelpid: String,
  userId: String,
  userName: String
});
/*
SearchSchema.methods.findByYelpId = function(cb) {  
  return this.model('Venues').find({ yelpid: this.yelpid }, cb);
};
*/
export default mongoose.model('Venues', SearchSchema);

// Custom Schema
/*
var VenuesSchema = new mongoose.Schema({
  yelp_id: String,
  count_users: Number,
  users: [String]
});

/* Custom methods */

/* Search Polls by ID of creator */
/*VenuesSchema.methods.findByYelpId = function(yelpId, cb) {  
  return this.model('Venues').find({ yelp_id: yelpId }, cb);
};

export default mongoose.model('Venues', VenuesSchema);
*/