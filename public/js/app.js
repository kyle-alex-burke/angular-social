/**
 * Created by kyle on 12/4/14.
 */
(function() {
  angular.module("home", ['firebase'])
    .controller("HomeController", ['$scope', '$firebase', '$http',
      function($scope, $firebase, $http) {
        var ref = new Firebase("https://brilliant-torch-8918.firebaseio.com/");
        var sync = $firebase(ref);

        $scope.messages = sync.$asArray();
        $scope.username = "";
        $scope.profilePic = "/img/profile.png";
        $scope.activeUserPic = "";
        $scope.loggedIn = false;


        $scope.addMessage = function(e) {
          if ($scope.msg) {
            $scope.messages.$add({
              name: $scope.username || 'Anonymous',
              description: $scope.msg,
              img: $scope.activeUserPic
            });

            $scope.msg = "";

          }
        };

        $scope.expandTextArea = function($event) {
          console.log($event);
          $event.target.setAttribute('rows', '3');
          console.log(angular.element('#msgtextarea'));
          angular.element('#msg-submit').css('display', 'inline');
          angular.element('.glyphicon-camera').css('display', 'inline');

        };

        $scope.shrinkTextArea = function($event) {
          if (!$scope.msg) {
            $event.target.setAttribute('rows', '1');
            angular.element('#msg-submit').css('display', 'none');
            angular.element('.glyphicon-camera').css('display', 'none');
          }
        };

        $scope.triggerOauth = function() {
          ref.authWithOAuthPopup("google", function(error, authData) {
            console.log('GOT THAT AUTHDATA: ');
            console.log(authData);
            $scope.username = authData.google.displayName;
            $scope.profilePic = authData.google.cachedUserProfile.picture;
            $scope.activeUserPic = authData.google.cachedUserProfile.picture;

            $scope.loggedIn = true;
            $scope.$apply();
          });
        }
    }])
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      }
    });


})();