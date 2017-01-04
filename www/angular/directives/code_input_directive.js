'use strict'

app.directive('codeinput', function(){
  return {
    restrict: 'E',
    templateUrl: '/briscloud/www/angular/templates/_codeBox.html',
    scope: {
      languages: '=',
      code: '='
    },
    controller: ['$scope', '$element',  function($scope, $element){
      $scope.language_type = $scope.languages[1]

      // $scope.response = {status: 'pending'}

      // languages mapping to code styles
      $scope.mode = {
        python: {name: "python", version: 3, singleLineStringErrors: false },
        ruby: "text/x-ruby",
        c: "text/x-csrc",
        cpp: "text/x-csrc",
        plaintext : "default"
      }

      // code object
      $scope.codeBox = CodeMirror.fromTextArea($element.find("#codeInput")[0], {
        value: $scope.code,
        mode: $scope.mode[$scope.language_type],
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true,
        keyMap: "sublime"
        // theme: "monokai"
      });

      $scope.codeBox.setValue($scope.code);

      $scope.submit = function(event) {
        $scope.data = {
          code: $scope.codeBox.getValue(),
          language_type: $scope.language_type,
          input: ""
        }

        $scope.response = {status: 'pending'}

        console.log($scope.data);
        var callbackSuccessFn = function(data, text, jqXHR) {
          var timerId  = 0;

          if ( data.id === null ) return;

          var checkReady = function() {
            $.get('https://morning-shelf-70830.herokuapp.com/api/submissions/'+data.id+".json", successFn);
          }

          var successFn = function(response) {
            console.log("still running", response.status, data.id);

            if (response.status === "finalised" || response.status === "error") {
              clearInterval(timerId);
              console.log(response);
              $scope.response  = response;
              $scope.$apply();
            }
            if (response.status === "timeout"){
              clearInterval(timerId);
              console.log(response);
              $scope.response  = response;
              $scope.response.result = "Timeout"
              $scope.$apply();
            }
          }

          timerId = setInterval(checkReady, 1000);
        };
        $.post("https://morning-shelf-70830.herokuapp.com/api/submissions", $scope.data).done(callbackSuccessFn);
      };

      $scope.$watch("language_type", function(){
        $scope.codeBox.setOption("mode", $scope.mode[$scope.language_type] );
      });

    }]
  };
});
