(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexLandingPageController', function($scope, $http) {

    // $scope.score = 'yes'; //sets default radio button to select the 'yes' option
    $scope.choice = 'yes';

    // current_canvas_user_id

    // var postStudentStatus = function(canvasUserID, choice1) {
    //   var url = '/api/v1/students/' + current_canvas_user_id;
    //   var data = {'status': choice1};
    //   $http.post(url, data);
    // };




    // alert(current_canvas_user_id);

    $scope.redirectPage = function () {
      var url = '/api/v1/students/' + current_canvas_user_id;
      if ($scope.choice == 'yes'){
        var data = {'status': $scope.choice1};
        $http.post(url, data);
        return ('/engagement_index_share');
      } else if ($scope.choice2){
        var data2 = {'status': $scope.choice2};
        $http.post(url, data2);
        return ('/engagement_index');
      }
    };
  });

})(window.angular);
