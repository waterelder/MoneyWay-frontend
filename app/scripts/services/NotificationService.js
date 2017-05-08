/**
 * Created by lex on 30.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('NotificationService', function (){
    var thisService = {
      notifyError: function(body){
        $("#custom-error-notification").removeClass('hidden').find("p").text(body);
        thisService.showAndHide("custom-error-notification")
      },
      notifySuccess: function(header, body){
        $("#custom-success-notification").removeClass('hidden').find(".header").text(header).parent().find("p").text(body);
        thisService.showAndHide("custom-success-notification")
      },
      showAndHide: function(id){
        var x = document.getElementById(id);
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    };

    return thisService;




    /*function(error){
      $(".custom-error-notification").removeClass('hidden').find(".list").text(error).delay(5000).closest('.message')
        .transition('fade');

    }*/
  });
