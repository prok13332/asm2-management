angular.module('myApp', [])
.controller('LoginController', function($scope, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.message = '';

    $scope.login = function() {
        $http.post('http://localhost:4000/login', {
            username: $scope.username,
            password: $scope.password
        }).then(function(response) {
            $scope.message = 'Login successful! Token: ' + response.data.token;
        }, function(error) {
            $scope.message = 'Login failed: ' + error.data;
        });
    };
});
