(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexController', function($scope, studentFactory) {

    $scope.shownote = true;
    $scope.showshare = true;
    $scope.showpoints = false;

    studentFactory.getStudents().
      success(function(results) {
        $scope.people = results.students;

        for (var i = 0; i<$scope.people.length; i++) {
          if ($scope.people[i].currentStudent === true) {
            $scope.currStudent = $scope.people[i];
            $scope.people.splice($scope.people.indexOf($scope.currStudent), 1);
        }

          if ($scope.people[i].sharePoints === 'NO') {
            $scope.people[i].points = '--';
          }
      }
        // Default Sort
        $scope.predicate = 'position';
    });


    $scope.shareView = function (currentStudent) {
      $scope.people.push(currentStudent);
      $scope.showshare = false;
      $scope.shownote = false;
      $scope.showpoints = true;
    };


    $scope.unshareView = function (currentStudent) {
      $scope.people.splice($scope.people.indexOf(currentStudent), 1);
      $scope.showshare = true;
      $scope.shownote = true;
      $scope.showpoints = false;
    };

  });

})(window.angular);
