angular.module('featuredItems')
.controller('MainCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$window',
	function($scope, $http, $location, $rootScope, $state, $window) {

		//Toggle Tabs
	    $scope.tab = 1;

	    $scope.setTab = function(newTab){
	      $scope.tab = newTab;
	    };

	    $scope.isSet = function(tabNum){
	      return $scope.tab === tabNum;
	    };

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