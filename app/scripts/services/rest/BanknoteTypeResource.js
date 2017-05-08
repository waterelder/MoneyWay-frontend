/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('BanknoteTypeResource', function ($resource, MAIN_URL, RequestErrorHandler) {
    return $resource(MAIN_URL + '/banknotes/types', {},
      {
        'findAll': {
          method: 'GET', isArray: true,
          interceptor: {responseError: RequestErrorHandler}
        }
      });
  });
