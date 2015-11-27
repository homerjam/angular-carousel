angular.module('ExampleApp', ['hj.carousel'])

  .controller('ExampleCtrl', ['$scope',
    function ($scope) {
      var vm = this;

      vm.activeSlideIndex = 0;

      vm.slides = [];

      for (var i = 0; i < 10; i++) {

        vm.slides.push({
          text: i + 1,
          color: '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
        });

      }

      vm.carouselOptions = {
        id: 'myCarousel',
        clickSpeed: 800,
        keySpeed: 800,
        prevClickEnabled: true
      };

      vm.carouselEmitter = function () {
        var args = Array.prototype.slice.call(arguments, 1);
        $scope.$emit('carousel:' + arguments[0], args.length ? args : undefined);
      };

      $scope.$on('carousel:changeSuccess', function (e, i) {
        vm.activeSlideIndex = i;
      });

      $scope.$on('carousel:status', function (e, status) {
        vm.isPlaying = (status === 'playing');
      });

    }
  ]);
