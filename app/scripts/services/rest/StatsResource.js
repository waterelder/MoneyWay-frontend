/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('StatsResource', function ($resource, MAIN_URL, RequestErrorHandler, Session) {
    return function () {

      return $resource(MAIN_URL + '/stats/', {},
        {
          'getSumm': {
            url: MAIN_URL + '/stats/summ',
            method: 'GET',
            interceptor: {responseError: RequestErrorHandler}
          },
          'getRecordsCount': {
            url: MAIN_URL + '/cash/count',
            method: 'GET',
            interceptor: {responseError: RequestErrorHandler}
          },
          'getStatsRecords': {
            url: MAIN_URL + '/stats/records',
            method: 'GET',
            interceptor: {responseError: RequestErrorHandler}
          },
          'getStatsUsers': {
            url: MAIN_URL + '/stats/users',
            method: 'GET',
            interceptor: {responseError: RequestErrorHandler}
          },
          'getStatsLocalities': {
            url: MAIN_URL + '/stats/localities',
            method: 'GET',
            interceptor: {responseError: RequestErrorHandler}
          }

        });
    }
  });
