// (function(angular) {
//   'use strict';

//   angular.module('datacultures.controllers').controller('EngagementIndexLandingPageController', function($scope, $http) {

//     $scope.score = 'yes'; //sets default radio button to select the 'yes' option

//     $scope.redirectPage = function () {
//       if ($scope.score === 'yes'){

//       $http.post('/api/v1/engagement_index/', $scope.score).
//         success(function() {}).
//         error(function() {
//           window.alert('The Data did not send. Check your internet connection');
//         });


//         return '/engagement_index_share';
//       } else if ($scope.score === 'no'){
//         $http.post($scope.score);
//         return('/engagement_index');
//       }
//     };
//   });

// })(window.angular);
