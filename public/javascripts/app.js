angular.module('featuredItems', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'views/activeFeatured.html',
						controller: 'MainCtrl'
					})
				 $locationProvider.html5Mode({enabled: true, requireBase: false});
	}]);