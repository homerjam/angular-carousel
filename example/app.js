angular.module('ExampleCtrl', []).controller('ExampleCtrl', ['$scope',
    function($scope) {

        $scope.activeSlideIndex = 0;

        $scope.data = {};

        $scope.data.slides = [];

        for (var i = 0; i < 10; i++) {

            $scope.data.slides[i] = {
                text: i + 1,
                color: '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
            };

        }

        $scope.carouselOptions = {
            id: 'myCarousel',
            clickSpeed: 500,
            keySpeed: 500
        };

        $scope.carouselEmitter = function() {
            var args = Array.prototype.slice.call(arguments, 1);
            $scope.$emit('carousel:' + arguments[0], args.length ? args : null);
        };

        $scope.$on('carousel:change', function(e, i) {
            $scope.activeSlideIndex = i;
        });

    }
]);

angular.module('ExampleApp', ['angular-carousel2', 'ExampleCtrl']).config(function() {});
