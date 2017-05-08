/**
 * Created by lex on 06.10.16.
 */
/**
 * Created by lex on 27.09.16.
 */
'use strict';
angular.module('trackRubFrontApp')
  .controller('RegisterCtrl', function ($scope, AuthResource, md5) {

    $scope.registerData = {
      login: "",
      email: "",
      password: ""
    };

    $scope.sended = false;


    $scope.accessory = {
      repPassword: "",
      dontAsshole: false
    };

    $scope.loginNotDirty = true;
    $scope.checkLoginDirty = function () {
      $scope.loginNotDirty = ($scope.registerData.username.length >= 6 && /^\w+$/.test($scope.registerData.username));
    };

    function validEmail(e) {
      var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
      return String(e).search(filter) != -1;
    }

    $scope.emailNotDirty = true;
    $scope.checkEmailDirty = function () {
      $scope.emailNotDirty = validEmail($scope.registerData.email);
    };

    $scope.loginValid = true;
    $scope.emailValid = true;
    $scope.passwordValid = true;
    $scope.passwordNotDirty = true;
    $scope.foundUserUnconfirmed = false;
    $scope.allOk = false;

    $scope.checkPassDirty = function () {
      $scope.passwordNotDirty = $scope.registerData.password.length >= 6;
    };


    $scope.checkEmail = function () {
      if ($scope.registerData.email) {
        AuthResource.checkEmail({p: $scope.registerData.email}, function (data) {
          $scope.emailValid = !data.status;
        });
      }
    };

    $scope.checkLogin = function () {
      if ($scope.registerData.username) {
        AuthResource.checkLogin({p: $scope.registerData.username}, function (data) {
          $scope.loginValid = !data.status;
        });
      }
    };

    $scope.clickRegister = function () {
      var regData = _.cloneDeep($scope.registerData);
      regData.password = md5.createHash(regData.password);
      AuthResource.register(regData, function (data) {
        $scope.sended = true;
        if (data.status == false) {
          $scope.foundUserUnconfirmed = true;
        } else {
          $scope.allOk = true;
        }
      })
    };
    $scope.clickResend = function(){
      var regData = _.cloneDeep($scope.registerData);
      regData.password = md5.createHash(regData.password);
      AuthResource.resent(regData, function(data){
        $scope.foundUserUnconfirmed = false;
        $scope.allOk = true;
      })
    };

    $scope.isRegisterBtnDisabled = function () {
      return ((!$scope.registerData.password) || (!$scope.registerData.email) || (!$scope.accessory.repPassword) || (!$scope.registerData.username) || !$scope.passwordNotDirty || !$scope.emailNotDirty || !$scope.loginValid || !$scope.emailValid || !$scope.passwordValid || !$scope.accessory.dontAsshole || !$scope.loginNotDirty);
    };

    $scope.isPasswordDismatch = function () {
      if ($scope.accessory.repPassword && $scope.registerData.password) {
        $scope.passwordValid = $scope.accessory.repPassword == $scope.registerData.password;
      }

    };


  });
