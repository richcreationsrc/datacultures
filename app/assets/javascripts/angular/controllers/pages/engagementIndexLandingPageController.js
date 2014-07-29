(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexLandingPageController', function($scope) {


    $scope.redirectPage = function () {
      if ($scope.score === 'yes'){
        window.location.replace('/engagement_index_share');
      } else if ($scope.score === 'no'){
        window.location.replace('/engagement_index');
      }
    };




  });

})(window.angular);
