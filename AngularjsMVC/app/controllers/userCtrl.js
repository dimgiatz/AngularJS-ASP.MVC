(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 2;

            getData();

            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.users = result;
                });
            }

            $scope.deleteUser = function (id) {
                dataService.deleteUser(id).then(function () {
                    toastr.success('User deleted successfully');
                    getData();
                }, function () {
                    toast.error('Error in deleting user with Id:' + i);
                });
            };

            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            };
        }])
        .controller('userAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function (result) {
                    toastr.success('User created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in creating user');
                });
            };
        }])
        .controller('userEditCtrl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            $scope.states = { showUpdateButton: false };

            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error in fetching user' + $routeParams.id);
            });

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success('User updated successfully')
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updating user')
                });
            };
        }])
})();