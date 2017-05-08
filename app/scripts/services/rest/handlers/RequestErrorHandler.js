/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('RequestErrorHandler', function (NotificationService){
      return function(error){
        NotificationService.notifyError("Ошибка выполнения запроса " + error.status +":"+error.statusText);

      }
  });
