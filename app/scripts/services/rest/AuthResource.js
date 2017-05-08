/**
 * Created by lex on 09.10.16.
 */
angular.module('trackRubFrontApp')
  .factory('AuthResource', function ($resource, MAIN_URL, RequestErrorHandler, LoginErrorHandler) {
    return $resource(MAIN_URL + '/auth', {}, {
        'checkEmail': {
          url: MAIN_URL + '/auth/check/email',
          params: {p: "@p"},
          method: 'GET',
          interceptor: {responseError: RequestErrorHandler}

        },
        'register': {
          url: MAIN_URL + '/auth/register/',
          method: 'POST',
          interceptor: {responseError: RequestErrorHandler}
        },
        'resent': {
          url: MAIN_URL + '/auth/resent/',
          method: 'POST',
          interceptor: {responseError: RequestErrorHandler}
        },
        'login': {
          url: MAIN_URL + '/auth/login',
          method: 'POST',
          interceptor: {responseError: LoginErrorHandler}

        },
        'confirm': {
          url: MAIN_URL + '/auth/confirm',
          params: {hash: "@hash"},
          method: 'POST',

        },
        'checkLogin': {
          url: MAIN_URL + '/auth/check/login',
          params: {p: "@p"},
          method: 'GET',
          interceptor: {responseError: RequestErrorHandler}
        }
      }
    );
  });
