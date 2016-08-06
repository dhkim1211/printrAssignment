var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featuredSchema = new Schema({
    name: String,
    username: String,
    profileImg: String,
    images: Array,
    publishDate: Date,
    tags: Array,
    active: Boolean,
    type: String,
    createdAt: Date,
    updatedAt: Date
});

// on every save, add the date
featuredSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updatedAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.createdAt)
      this.createdAt = currentDate;

    next();
});

var Featured = mongoose.model('Featured', featuredSchema);

module.exports = Featured;
