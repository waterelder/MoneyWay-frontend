/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('LoginErrorHandler', function (NotificationService){
      return function(error){
        NotificationService.notifyError("Неправильный логин/email или пароль ");

      }
  });
