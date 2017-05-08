/**
 * Created by lex on 27.09.16.
 */
'use strict';
angular.module('trackRubFrontApp')
  .controller('NewCashCtrl', function ($scope, CashResource, MapService, NotificationService, BanknoteTypeResource, BanknoteResource, $state, Session, $rootScope) {
    $scope.isAuthenticated = function () {
      return Session.isAuthenticated();
    };

    $scope.lookUpCash = {
      cashId: "",
      lat: null,
      lon: null,
      banknote: null

    };

    $scope.getTime  = function (date) {
      return moment.unix(date / 1000).format("DD.MM.YYYY")
    };

    $scope.goToMain  = function () {
      $state.go('root.main');
    };

    if (_.isUndefined($scope.map)) {
      MapService.initMap($scope, "lookup");
    } else {
      MapService.setDefaultBrowserLocation($scope, false)
    }
    $scope.banknotesLoaded = false;
    BanknoteTypeResource.findAll(function (data) {
      BanknoteResource.findByType({code: data[0].code}, function (data) {
        $scope.banknotes = data;
        $scope.banknotesLoaded = true;
      })
    });

    $scope.isAddable = function(){
      return ($scope.lookUpCash.cashId && $scope.lookUpCash.banknote)
    };

    $scope.add = function () {
      $scope.lookUpCash.user = Session.getMe();
      CashResource(Session.getToken()).add($scope.lookUpCash, function (data) {
        $rootScope.$emit('saveComplete', data.user);
        $state.go('root.main');
      })


    };






  });
