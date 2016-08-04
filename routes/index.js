var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendfile('./public/index.html');
});

// GET ALL ACTIVE FEATURED ITEMS
router.get('/v1/featured', function(req, res) {
	var Featured = require('../models/featuredItems.js');
	Featured.find({active: true}, function(err, data) {
		if (err) {throw err};
		res.send(data);
	})
});

//GET ALL PREVIOUS FEATURED ITEMS
router.get('/v1/prevfeatured', function(req, res) {
	var Featured = require('../models/featuredItems.js');
	Featured.find({active: false}, function(err, data) {
		if (err) {throw err};
		res.send(data);
	})
});

//ADD NEW FEATURED ITEM
router.post('/v1/featured', function(req, res) {
	var Featured = require('../models/featuredItems.js');
	var newFeatured = new Featured();

	newFeatured.name = req.body.name;
	newFeatured.username = req.user.username;
	newFeatured.profileImg = req.user.profileImg;
	newFeatured.images = req.body.images;
	newFeatured.publishDate = req.body.publishDate;
	newFeatured.tags = req.body.tags;
	newFeatured.active = true;
	newFeatured.type = req.body.type;
	newFeatured.description = req.body.description;
	newFeatured.save(function(err){
		  if (err) {
		    console.log("Error in Saving Item");
		    throw err;
		  }
		  console.log("Featured Item Added!");
		  res.sendStatus(200);
		})
});

//EDIT OR DEACTIVATE FEATURED ITEM
router.put('/v1/featured', function(req, res) {
	var Featured = require('../models/featuredItems.js');
	Featured.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name, images: req.body.images, publishDate: req.body.publishDate, tags: req.body.tags, active: req.body.active, type: req.body.type, description: req.body.description}}, function(err, data) {
		if (err) throw err;
		res.sendStatus(200);
	})
}); 

module.exports = router;



