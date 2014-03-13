angular.module('ExampleCtrl', []).controller('ExampleCtrl', ['$scope',
    function($scope) {

		$scope.activeSlideIndex = 0;

        $scope.data = {};

        $scope.data.slides = [];

        for (var i = 0; i < 10; i++) {

            $scope.data.slides[i] = {
                text: i + 1,
                color: '#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6)
            };

        }

        $scope.onChangeSlide = function(i) {
            $scope.activeSlideIndex = i;
        };

    }
]);

angular.module('ExampleApp', ['angular-carousel2', 'ExampleCtrl']).config(function() {});