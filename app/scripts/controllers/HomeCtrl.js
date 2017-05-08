/**
 * Created by lex on 27.09.16.
 */
'use strict';
angular.module('trackRubFrontApp')
  .controller('HomeCtrl', function ($scope,StatsResource, CashResource, MapService, NotificationService, BanknoteTypeResource, BanknoteResource, $state, Session, $rootScope) {
    $scope.isAuthenticated = function () {
      return Session.isAuthenticated();
    };
    $scope.isLookingUp = false;
    $scope.lookUpCash = {
      cashId: "",
      lat: null,
      lon: null

    };

    var getStatistics = function(){
      $scope.countOfBanknotes = null;
      $scope.summ = null;
      $scope.statsLocalities = [];
      $scope.statsUsers = [];
      $scope.statsRecords = [];

      StatsResource().getStatsLocalities(function(data){
        $scope.statsLocalities = data.content;
      });
      StatsResource().getStatsRecords(function(data){
        $scope.statsRecords = data.content;
      });
      StatsResource().getStatsUsers(function(data){
        $scope.statsUsers = data.content;
      });
      StatsResource().getRecordsCount(function(data){
        $scope.countOfBanknotes= data;
      });
      StatsResource().getSumm(function(data){
        $scope.summ = data;
      });

    };
    getStatistics();
    $scope.getTime = function (date) {
      return moment.unix(date / 1000).format("DD.MM.YYYY")
    };

    $rootScope.$on("logout", function () {
      $scope.myCash = [];
    });
    $scope.goToRegister = function () {
      $state.go('root.register');
    };
    $scope.pressLookUp = function () {
      $scope.isLookedUp = false;
      $scope.isLookingUp = $scope.isLookingUp ? false : true;
      if ($scope.isLookingUp) {
        if (_.isUndefined($scope.map)) {
          MapService.initMap($scope, "lookup");
        } else {
          MapService.setDefaultBrowserLocation($scope, false)
        }
      }


    };

    BanknoteTypeResource.findAll(function (data) {
      BanknoteResource.findByType({code: data[0].code}, function (data) {
        $scope.banknotes = data;
      })
    });

    $scope.lookUp = function () {
      $scope.isLookingUp = false;
      CashResource().send($scope.lookUpCash, function (data) {
        $scope.isLookedUp = true;
        $scope.cashArray = data;
      })


    };
    $scope.moneyCount = 0;
    $scope.getMyCash = function () {
      $scope.myCash = [];
      CashResource(Session.getToken()).getMyCash(function (data) {
        $scope.myCash = data;
        _.forEach($scope.myCash, function (item) {
          if (item.banknote) {
            $scope.moneyCount += item.banknote.currency;
          }
        });
      })
    };
    if ($scope.isAuthenticated()) {
      $scope.getMyCash();
    }

    $scope.addingModal = function () {

      $state.go('root.newcash');

    };

    $scope.newCash = {};

    $scope.goToCashPage = function (item) {
      $state.go('root.cash', {id: item.cashId});
    };


    $rootScope.$on('login', function (event, data) {
      $scope.getMyCash();
    });

    $scope.isAddable = function(){
      return ($scope.lookUpCash.cashId && $scope.lookUpCash.banknote)
    };


    $rootScope.$on('saveComplete', function (event, data) {
      NotificationService.notifySuccess("Успешно сохранено", "")
    });

  });
