angular.module('trackRubFrontApp').service('Session', function ($cookies, $state, localStorageService) {

  this.create = function (token, user) {
    localStorageService.set('user', user);
    $cookies.put('token', token);
    $cookies.put('role', user.authorities[0]);
  };
  this.destroy = function () {
    localStorageService.remove('user');
    $cookies.remove('token');
    $cookies.remove('role');
  };
  this.getToken = function () {
    return $cookies.get('token');
  };
  this.getRole = function () {
    return $cookies.get('role');
  };

  this.getMe = function () {
    return localStorageService.get('user');
  };

  this.isAuthenticated = function () {
    return !!$cookies.get('token');
  };

  this.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (this.isAuthenticated() &&
    authorizedRoles.indexOf($cookies.get("role")) !== -1);
  };

  this.logout = function () {
    this.destroy();
    localStorageService.remove('user');
    $state.go('root.main');
  };


  return this;
});
