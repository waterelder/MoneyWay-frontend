/**
 * Created by lex on 29.09.16.
 */
angular.module('trackRubFrontApp')
  .factory('MapService', function ($http, NgMap) {
    var thisService = {
      initMap: function (scope, mapId) {

        NgMap.getMap(mapId).then(function (map) {
          scope.map = map;
          scope.map.setOptions({
            zoom: 8,
            center: {lat: 55.754941, lng: 37.617188},///TODO вынести в константы
            streetViewControl: false,
            rotateControl: false,
            mapTypeControl: false,
            scrollwheel: false,
          });

          thisService.setDefaultBrowserLocation(scope, true);

        });


      },
      setDefaultBrowserLocation: function (scope, isMarkerNeed) {

        navigator.geolocation.getCurrentPosition(
          function (position) {
            var coords = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            scope.map.panTo(coords);
            if (isMarkerNeed) {
              scope.marker = thisService.setMarker(scope)
            }

          }, thisService.setDefaultMarkerWithoutGeo(scope, isMarkerNeed));


      },
      setDefaultMarkerWithoutGeo: function (scope, isMarkerNeed) {
        if (isMarkerNeed) {
          scope.marker = thisService.setMarker(scope)
        }
      },
      setMarker: function (scope) {
        var marker = new google.maps.Marker({
          map: scope.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: scope.map.getCenter().lat(), lng: scope.map.getCenter().lng()}
        });
        thisService.replaceMarker(marker.getPosition(), marker, scope);
        scope.map.addListener('click', function (e) {
          thisService.replaceMarker(e.latLng, marker, scope);
        });

        return marker;
      },
      replaceMarker: function (latLng, marker, scope) {
        marker.setPosition(latLng);
        scope.map.panTo(latLng);
        thisService.getAddress(latLng).then(function (resp) {
          var objAddress = resp.data.results[0];
          scope.lookUpCash.lat = objAddress.geometry.location.lat;
          scope.lookUpCash.lon = objAddress.geometry.location.lng;
          var region = _.find(objAddress.address_components, function (item) {
            return _.include(item.types, "administrative_area_level_1")
          });
          scope.lookUpCash.region = region.short_name;
          var locality = _.find(objAddress.address_components, function (item) {
            return _.include(item.types, "locality");
          });
          if (!_.isUndefined(locality)) {
            scope.lookUpCash.locality = locality.short_name;
          }
          var country = _.find(objAddress.address_components, function (item) {
            return _.include(item.types, "country");
          });
          scope.lookUpCash.address = country.long_name + ", " + region.short_name;
          if (!_.isUndefined(locality)) {

            if (locality.short_name !== 'СПБ' && locality.short_name !== 'Москва') {
              scope.lookUpCash.address += ", " + locality.short_name;
            }
          }
        });

      },
      getAddress: function (item) {
        return $http({
          method: 'get',
          url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + item.lat() + "," + item.lng() + "&sensor=false&language=ru",
          headers: {'Content-Type': 'application/json'},
        });
      }
    };


    return thisService;

  });
