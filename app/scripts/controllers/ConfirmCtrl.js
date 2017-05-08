/**
 * Created by lex on 09.10.16.
 */
/**
 * Created by lex on 27.09.16.
 */
'use strict';
angular.module('trackRubFrontApp')
  .controller('ConfirmCtrl', function ($rootScope, $scope, $stateParams, AuthResource, Session, $state) {
    $scope.data = $stateParams.data;
    $scope.errorConfirm = false;
    AuthResource.confirm({hash: $scope.data}, function (data) {
      Session.create(data.token, data.user);
      $rootScope.$emit('login', data.user);
      $state.go("root.main", {'isNew': true});
    }, function (error) {
        $scope.errorConfirm = true;
    })
  });
