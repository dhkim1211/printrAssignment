var express = require('express');
var router = express.Router();

var isValidPassword = function(user, password){
  	return bCrypt.compareSync(password, user.password);
}

var isAuthenticated = function (req, res, next) {
  	if (req.isAuthenticated())
    	return next();
  	res.redirect('/');
}

module.exports = function(passport) {

	//HANDLE LOGIN POST
	router.post('/login', function(req, res, next) {
	    passport.authenticate('login', function(err, user, info) {
	      if (err) {
	        return next(err);
	      }
	      if (!user) {
	        res.send({
	          message: 'no user'
	        });
	      }
	      req.login(user, function(err) {
	        if (err) {
	          return next(err);
	        }
	        res.send({
	          message: 'logged in'
	        });
	      });
	    })(req, res, next);
	  });

	//HANDLE LOGOUT
	router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

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
	router.get('/v1/prevfeatured', isAuthenticated, require('permission')(['admin']), function(req, res) {
		var Featured = require('../models/featuredItems.js');
		Featured.find({active: false}, function(err, data) {
			if (err) {throw err};
			res.send(data);
		})
	});

	//ADD NEW FEATURED ITEM
	router.post('/v1/featured/', isAuthenticated, require('permission')(['admin']), function(req, res) {
		console.log(req.body);
		var Featured = require('../models/featuredItems.js');
		var newFeatured = new Featured();

		newFeatured.name = req.body.name;
		newFeatured.username = req.body.username;
		newFeatured.profileImg = req.body.profileImg;
		newFeatured.images = req.body.images;
		newFeatured.publishDate = req.body.publishDate;
		newFeatured.tags = req.body.tags;
		newFeatured.active = true;
		newFeatured.type = req.body.type;
		console.log(newFeatured);
		newFeatured.save(function(err){
			  if (err) {
			    console.log("Error in Saving Item");
			    throw err;
			  }
			  console.log("Featured Item Added!");
			  res.sendStatus(200);
			})
	});

	//GET SINGLE FEATURED ITEM
	router.get('/v1/featured/:id', isAuthenticated, require('permission')(['admin']), function(req, res) {
		var Featured = require('../models/featuredItems.js');
		Featured.findById(req.params.id, function(err, data) {
			if (err) {throw err};
			res.send(data);
		})
	})

	//EDIT OR DEACTIVATE FEATURED ITEM
	router.put('/v1/featured/:id', isAuthenticated, require('permission')(['admin']), function(req, res) {
		var Featured = require('../models/featuredItems.js');
		Featured.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name, images: req.body.images, publishDate: req.body.publishDate, tags: req.body.tags, active: req.body.active, type: req.body.type, description: req.body.description}}, function(err, data) {
			if (err) throw err;
			res.sendStatus(200);
		})
	}); 

	return router;
}

	





