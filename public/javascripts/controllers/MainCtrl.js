angular.module('featuredItems')
.controller('MainCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$window', '$stateParams',
	function($scope, $http, $location, $rootScope, $state, $window, $stateParams) {

		//Toggle Tabs
	    $scope.tab = 1;

	    $scope.setTab = function(newTab){
			$scope.tab = newTab;
	    };

	    $scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
	    };

	    //ADMIN LOGIN POST
	    $scope.login = function() {
			$http.post('/login', {
				username: $scope.username,
				password: $scope.password
			})
			.success(function(data) {
				if (data.message === 'logged in') {
					$location.path('/admin');
				}
			});
	    }

	    //FEATURED ITEMS VIEW -----------------------------
	    $http.get('/v1/featured').success(function(data) {
	    	event.preventDefault();
			$scope.featuredItems = data;
	    })

	    $scope.initFirst = function() {
	    	$http.get('/v1/featured').success(function(data) {
		    	event.preventDefault();
				$scope.featuredItems = data;
				$scope.tab = 1;
		    });
		    
	    };

	    //FILTER TYPES OF FEATURED ITEMS ----------------------
	    $scope.filter = '';

	    $scope.setFilter = function(filter) {
	    	$scope.filter = filter;
	    }

	    $scope.filterSet = function(filter) {
	    	return $scope.filter === filter;
	    }

	    $scope.getFilter = function() {
	    	switch ($scope.filter) {
	    		case 'Modelfile':
	    			return {type: 'Modelfile'};
    			case 'App':
    				return {type: 'App'};
				case 'Account':
					return {type: 'Account'};
				default: 
					return '';
	    	}
	    }

	    //PREVIOUSLY FEATURED ITEMS -------------------------
	    $http.get('/v1/prevfeatured').success(function(data) {
	    	event.preventDefault();
			$scope.prevItems = data;
	    })

	    //ADD NEW FEATURED ITEM ---------------------------------
		$scope.tags = [];
		$scope.tag = '';

		$scope.addTag = function() {
			$scope.tags.push($scope.tag);
			$scope.tag = '';
		}

		$scope.images = [];
		$scope.singleImage = '';

		$scope.addImage = function() {
			$scope.images.push($scope.singleImage);
			$scope.singleImage = '';
		}

		$scope.addItem = function() {
			$http({
				url: '/v1/featured',
				method: 'POST',
				data: {
					name: $scope.name,
					username: $scope.username,
					profileImg: $scope.profileImg,
					images: $scope.images,
					publishDate: $scope.publishDate,
					tags: $scope.tags,
					type: $scope.type
				}
			}).success(function(data) {
				event.preventDefault();
				$state.go('home');
				console.log(data);				
			})

			$scope.initFirst();
		}
		
		
	}])