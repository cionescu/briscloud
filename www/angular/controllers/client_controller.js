'use strict';

app.controller('mainController', function($scope){
});

app.controller('clientController', ["$scope", function($scope) {
  $scope.languages = ["plaintext", "python","ruby", "c", "cpp"]

  $scope.response = {};
  $scope.data1 = {
    code : "import time\ntime.sleep(10)\nprint \"Hello1\"",
    language_type : "python",
    input : ""
  }

}]);
