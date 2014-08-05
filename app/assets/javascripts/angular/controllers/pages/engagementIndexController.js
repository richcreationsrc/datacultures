(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexController', function($scope, studentFactory, $location) {

    // Define variables for carot symbol flip for sorting
    $scope.showcaretStudent = false;
    $scope.showcaretSection = false;
    $scope.showcaretPoints = false;
    $scope.showcaretLastPoint = false;
    $scope.showcaretShare = false;

    // Define variables that deal with filling the EI
    $scope.showshare = true;
    $scope.showpoints = false;
    $scope.visibility = true;
    $scope.noshowStudents = []; // array storing students who are not sharing their score

    // Call getStudents() from EI factory to get students
    studentFactory.getStudents().
      success(function(results) {
        $scope.people = results.students; // get from ruby controller
        $scope.currentStudentID = results.current_canvas_user_id; // get from ruby controller
        // alert(typeof $scope.currentStudentID);
        $scope.currStudent = $scope.people[$scope.currentStudentID];
        $scope.shareStatus = $scope.currStudent.share;

        // Set current user share status to 'NO' if they choose not to share EI score
        // They will be removed from the main EI table below
        if ($location.path() === '/engagement_index') {
          $scope.currStudent.share = 'NO';
        }

        // Loop through and remove all students that are not sharing Engagement Index
        for (var i = $scope.people.length-1; i >= 0; i--) {
          if ($scope.people[i].share === true) {
            $scope.people[i].share = 'YES';
          }

          if ($scope.people[i].share === false) {
            $scope.people[i].share = 'NO';
              if ($location.path() === '/engagement_index_instructor') {
                continue;
              } else {
                $scope.studentToRemove = $scope.people[i]; // store "to be removed" into variable
                $scope.noshowStudents.push($scope.studentToRemove); // push not sharing students to new array
                $scope.people.splice($scope.people.indexOf($scope.studentToRemove), 1); // remove not sharing student
                continue;
              }
          }

          // Handle row highlighting
          if ($scope.people[i] === $scope.currStudent) {
            $scope.people[i].highlight = true;
          } else {
            $scope.people[i].highlight = false;
          }
          $scope.people[i].share = 'YES'; // if get here, means that the student chose to share EI score
        }

        // Send current student's share status to database
        studentFactory.postStudentStatus($scope.currentStudentID, $scope.shareStatus).
          success(function() {}).
          error(function() {
            window.alert('Check your internet connection, status was not pushed');
          });

        // Default Sort
        $scope.predicate = 'points';
        $scope.predicateUnshare = 'section';
      });

  });

})(window.angular);
