/**
 * Created by lex on 27.09.16.
 */
'use strict';
angular.module('trackRubFrontApp')
  .controller('HeaderCtrl', function ($rootScope, $scope, $state, AuthResource, Session, md5) {

    $scope.loginData = {
      credintial: null,
      password: null
    };
    if (Session.isAuthenticated()){
      $scope.user = Session.getMe();
    }

    $scope.goToMain = function () {
      $state.go("root.main");
    };
    $scope.goToRegister = function () {
      $state.go('root.register');
    };

    $scope.loginModal = function () {
      $('.ui.modal.login').modal({
        onDeny: function () {
          return false;
        },
        onApprove: function () {
          return false;
        }
      })
        .modal('show')
      ;
    };

    $scope.isAuthenticated = function () {
      return Session.isAuthenticated();
    };

    $scope.logout = function () {
      Session.logout();
      $rootScope.$emit('logout', "");
    };

    $rootScope.$on('login',function(event, data){
      $scope.user = Session.getMe()
    });


    $scope.login = function () {
      var loginData = _.cloneDeep($scope.loginData);
      loginData.password = md5.createHash(loginData.password);
      AuthResource.login(loginData, function (data) {
        Session.create(data.token, data.user);
        $scope.loginData = {
          credintial: null,
          password: null
        };
        $rootScope.$emit('login', data.user);
        $('.ui.modal').modal("hide");
        $state.go('root.main');

      });
    }

  })
;
