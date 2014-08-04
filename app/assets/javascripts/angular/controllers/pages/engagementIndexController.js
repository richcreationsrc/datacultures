(function(angular) {
  'use strict';

  angular.module('datacultures.controllers').controller('EngagementIndexController', function($scope, studentFactory, $location, $http) {

    $scope.showcaretStudent = false;
    $scope.showcaretSection = false;
    $scope.showcaretPoints = false;
    $scope.showcaretLastPoint = false;
    $scope.score = 'yes'; //sets default radio button to select the 'yes' option


    $scope.showshare = true;
    $scope.showpoints = false;
    $scope.visibility = true;
    $scope.noshowStudents = []; // array that stores all students who are not sharing their score

    studentFactory.getStudents().success(function(results) {
        $scope.people = results.students;

        $scope.currStudentID = results.current_canvas_user_id;// simulating the first student in json file is the current user
        $scope.currStudent = $scope.people[$scope.currStudentID];




        alert($scope.currStudentID);


        
        //if user chooses not to share EI, remove them from the shared table
        if ($location.path() === '/engagement_index') {
          $scope.currStudent.share = 'NO';
        }

        //Loop through and remove all students that are not sharing Engagement Index
        for (var i = $scope.people.length-1; i >= 0; i--) {
          if($scope.people[i].share === false) {
            $scope.people[i].share = 'NO';
            $scope.studentToRemove = $scope.people[i];
            $scope.noshowStudents.push($scope.studentToRemove); //push not sharing students to new array
            $scope.people.splice($scope.people.indexOf($scope.studentToRemove), 1); //remove not sharing student
            continue;
          }
          $scope.people[i].share = 'YES';
        }

        // Default Sort
        $scope.predicate = 'points';
        $scope.predicateUnshare = 'section';
    });


    //This code will temporarily be here for now -- eventually will pull Nolan's version down
    $scope.redirectPage = function () {

      if ($scope.score === 'yes'){
        return '/engagement_index_share';
      } else if ($scope.score === 'no'){
        return('/engagement_index');
      }
    };
  });

})(window.angular);
