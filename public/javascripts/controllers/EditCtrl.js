angular.module('featuredItems')
.controller('EditCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$window', '$stateParams',
	function($scope, $http, $location, $rootScope, $state, $window, $stateParams) {

	    //FEATURED ITEMS VIEW -----------------------------
	    $http.get('/v1/featured/'+$stateParams.id).success(function(data) {
	    	event.preventDefault();
			$scope.item = data;
	    })

	    $scope.updateItem = function() {
			$http({
				url: '/v1/featured/'+ $scope.item._id,
				method: 'PUT',
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
		}
		
	}])