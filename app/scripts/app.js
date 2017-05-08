'use strict';

/**
 * @ngdoc overview
 * @name trackRubFrontApp
 * @description
 * # trackRubFrontApp
 *
 * Main module of the application.
 */
angular
  .module('trackRubFrontApp', [
    'ngCookies', 'ngCookies', 'restangular', 'ui.router', 'angular-md5', 'ngMap', 'semantic-ui', 'ngResource', 'ngMask','ngSanitize','720kb.fx','LocalStorageModule'
  ])
  .constant('USER_ROLES', {
    all: '*',
    admin: 'ADMIN_ROLE',
    user: 'USER_ROLE'
  }).config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('trackRub')
  })
  .constant('MAIN_URL', 'https://moneyway.xyz:8443/restrub')//TODO вынести в конфиг и обмазать грантом
  .constant('_', window._)
  .constant('moment', window.moment)
  .config(function ($stateProvider, $urlRouterProvider,$locationProvider, USER_ROLES) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'views/mainlayout/header.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'views/mainlayout/footer.html',
            controller: 'FooterCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('root.main', {
        url: '/?isNew',
        views: {
          'container@': {
            templateUrl: 'views/home.html'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('root.confirm', {
        url: '/confirm?data',
        views: {
          'container@': {
            templateUrl: 'views/confirm.html',
            controller: 'ConfirmCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('root.newcash', {
        url: '/newcash',
        views: {
          'container@': {
            templateUrl: 'views/newcash.html',
            controller: 'NewCashCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('root.cash', {
        url: '/cash?id',
        views: {
          'container@': {
            templateUrl: 'views/cash.html',
            controller: 'CashCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('root.register', {
        url: '/register',
        views: {
          'container@': {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      });


    $urlRouterProvider.otherwise('/');
  }).run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    // var authorizedRoles = next.data.authorizedRoles;
  });

});

