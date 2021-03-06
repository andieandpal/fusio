'use strict';

module.exports = function($scope, $http, $uibModalInstance, fusio) {

  $scope.app = {
    status: 1,
    name: '',
    url: '',
    scopes: []
  };

  $scope.states = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Pending'
  }, {
    key: 3,
    value: 'Deactivated'
  }];

  $scope.create = function(app) {
    var data = angular.copy(app);

    // remove null values from scope
    if (angular.isArray(data.scopes)) {
      data.scopes = data.scopes.filter(function(val) {
        return val !== null;
      });
    }

    $http.post(fusio.baseUrl + 'backend/app', data)
      .then(function(response) {
        var data = response.data;
        $scope.response = data;
        if (data.success === true) {
          $uibModalInstance.close(data);
        }
      })
      .catch(function(response) {
        $scope.response = response.data;
      });
  };

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $scope.getUsers = function(name) {
    return $http.get(fusio.baseUrl + 'backend/user?search=' + encodeURIComponent(name))
      .then(function(response) {
        var data = response.data;
        if (angular.isArray(data.entry)) {
          return data.entry;
          /*
           return response.data.entry.map(function(item){
           return item.name;
           });
           */
        } else {
          return [];
        }
      });
  };

  $http.get(fusio.baseUrl + 'backend/scope?count=1024')
    .then(function(response) {
      var data = response.data;
      $scope.scopes = data.entry;
    });

};
