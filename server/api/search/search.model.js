'use strict';

import mongoose from 'mongoose';

var SearchSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Search', SearchSchema);
