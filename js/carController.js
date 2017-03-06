app.controller('carController', function ($scope, $http) {
            $scope.cars;
            $scope.orderByField="name";
            $scope.rangeValue;
            $scope.filterValue="";

            $scope.byRange = function (minValue, maxValue) {

              return function predicateFunc(item) {
                return minValue <= item['mileage'] && item['mileage'] <= maxValue;
              };
            };

            $scope.$watch('rangeValue', function(value) {

              if(value=='tens') {
                $scope.filterValue = $scope.byRange(0,99)
                }
              else if(value=='hundreds') {
                $scope.filterValue = $scope.byRange(100,999)
              }
              else if(value=='thousands') {
                $scope.filterValue = $scope.byRange(1000,9999)
              }
              else if(value=='tenthousands') {
                $scope.filterValue = $scope.byRange(10000,99999)
              }
              else {
                $scope.filterValue = $scope.byRange(Number.MIN_VALUE,Number.MAX_VALUE)
              }
            });

            $http({
              method : 'GET',
              url : 'https://mobiledev.sunovacu.ca/api/Values/GetCars',
              timeout : 10000,
              params  : {},  // Query Parameters (GET)
              transformResponse : function(data) {
                $scope.cars = JSON.parse(data);
              }
            });

        });
