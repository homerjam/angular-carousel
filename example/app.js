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
            clickSpeed: 800,
            keySpeed: 800,
            prevClickEnabled: true
        };

        $scope.carouselEmitter = function() {
            var args = Array.prototype.slice.call(arguments, 1);
            $scope.$emit('carousel:' + arguments[0], args.length ? args : undefined);
        };

        $scope.$on('carousel:changeSuccess', function(e, i) {
            $scope.activeSlideIndex = i;
        });

        $scope.$on('carousel:status', function(e, status) {
            $scope.isPlaying = (status === 'playing');
        });

    }
]);

angular.module('ExampleApp', ['hj.carousel', 'ExampleCtrl']).config(function() {});
