/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('CashResource', function ($resource, MAIN_URL, RequestErrorHandler, Session) {
    return function (token) {

      return $resource(MAIN_URL + '/cash/lookup', {},
        {
          'send': {
            url: MAIN_URL + '/cash/lookup/',
            method: 'POST', isArray: true,
            interceptor: {responseError: RequestErrorHandler}
          },
          'add': {
            url: MAIN_URL + '/rest/cash',
            headers: {'token': token},
            method: 'POST',
            interceptor: {responseError: RequestErrorHandler}
          },
          'getCashById': {
            url: MAIN_URL + '/rest/cash/search',
            method: 'GET',
            params: {cashId: "@cashId"},
            isArray: true,
            headers: {'token': token},
            interceptor: {responseError: RequestErrorHandler}
          },
          'getMyCash': {
            url: MAIN_URL + '/rest/cash/',
            method: 'GET',
            isArray: true,
            headers: {'token': token},
            interceptor: {responseError: RequestErrorHandler}
          }

        });
    }
  });
