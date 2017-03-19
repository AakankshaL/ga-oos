var app = angular.module("ga-oos", ["firebase"]);
//
//
//
//
app.controller('signout', function ($scope, $window) {
    $scope.logout = function () {
        firebase.auth().signOut().then(function () {
            //successful
            window.location.href = "index.html";
        });
    }
})
app.controller("viewOrders", function ($scope, $firebaseObject, $firebaseArray) {
    var refArray = firebase.database().ref().child("allOrders");
    $scope.allOrders = $firebaseArray(refArray);
    /*   $scope.allOrders.$loaded().then(function () {
          console.log($scope.allOrders);
      }).catch(function (err) {
          console.error(err);
      });*/
});