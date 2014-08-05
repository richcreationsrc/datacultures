(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexLandingPageController', function($scope) {

    $scope.choice = 'yes';

    $scope.redirectPage = function () {
      if ($scope.choice === 'yes'){
        return ('/engagement_index_share');
      } else if ($scope.choice === 'no'){
        return ('/engagement_index');
      }
    };
  });

})(window.angular);
