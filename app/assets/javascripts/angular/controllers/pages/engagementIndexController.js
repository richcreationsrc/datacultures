(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexController', function($scope, studentFactory) {

    $scope.shownote = true;
    $scope.showshare = true;
    $scope.showpoints = false;
    $scope.visibility = true;
    $scope.noshowStudents = [];

    studentFactory.getStudents().
      success(function(results) {
        $scope.people = results.students;


        $scope.currStudent = $scope.people[0];
        $scope.people.splice($scope.people.indexOf($scope.currStudent), 1);


        for (var i = 0; i<$scope.people.length; i++) {
        //   if ($scope.people[i].currentStudent === true) {
        //     $scope.currStudent = $scope.people[i];
        //     $scope.people.splice($scope.people.indexOf($scope.currStudent), 1);
        // }

          if ($scope.people[i].share === 'NO') {
            $scope.people[i].points = '--';
            $scope.people[i].lastupdate = '--';
            // $scope.optOutStudent = $scope.people.splice($scope.people.indexOf($scope.people[i]), 1);


            $scope.optOutStudent = $scope.people[i];
            alert($scope.optOutStudent.points);
            $scope.noshowStudents.push($scope.optOutStudent);
            alert($scope.optOutStudent.name);

          }
      }
        // Default Sort
        $scope.predicate = 'points';
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
