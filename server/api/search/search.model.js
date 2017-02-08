'use strict';

import mongoose from 'mongoose';

var SearchSchema = new mongoose.Schema({
  yelpId: String,
  userId: String,
  userName: String
});

export default mongoose.model('Venues', SearchSchema);
