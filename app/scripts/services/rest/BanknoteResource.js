/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('BanknoteResource', function ($resource, MAIN_URL, RequestErrorHandler){
    var url = MAIN_URL + '/banknotes/find';
    return $resource(MAIN_URL + '/banknotes/', {code: "@code"},
      {
        'findByType': {url:url,
          method: 'GET', isArray: true,
          interceptor: {responseError: RequestErrorHandler}
        }
      });
  });
