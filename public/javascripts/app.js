angular.module('featuredItems', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/views/activeFeatured.html',
						controller: 'MainCtrl'
					})
					.state('edit', {
						url: '/edit/:id',
						templateUrl: '/views/editFeatured.html',
						controller: 'EditCtrl'
					})
					.state('login', {
						url: '/login',
						templateUrl: '/views/login.html',
						controller: 'MainCtrl'
					})
					.state('admin', {
						url: '/admin',
						templateUrl: '/views/admin.html',
						controller: 'MainCtrl'
					})
					.state('logout', {
						url: '/logout',
						controller: function($window, $state) {
							// User.logout();
							$state.go('logout');
							$window.location.reload();
						}
					})

				 $locationProvider.html5Mode({enabled: true, requireBase: false});
	}]);