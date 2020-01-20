(function() {
  'use strict';

  angular
    .module('hj.carousel', [])

    .constant('Ease', {
      easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
      easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

      easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
      easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
      easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

      easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
      easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

      easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
      easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

      easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
      easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
      easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

      easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
      easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
      easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

      easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
      easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
      easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

      easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
      easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
      easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
    })

    .directive('hjCarousel', [
      '$timeout',
      '$log',
      '$window',
      '$document',
      'Ease',
      function($timeout, $log, $window, $document, Ease) {
        return {
          restrict: 'A',
          transclude: true,
          template:
            '<div class="carousel-container">' +
            '<div class="carousel-wrapper">' +
            '<div class="carousel-slider" ng-transclude></div>' +
            '</div>' +
            '</div>',
          compile: function(tElement, tAttr, transcludeFn) {
            return function link($scope, $element, $attr) {
              var defaults = {
                id: +new Date(), // `id` if using multiple instances
                speed: 800, // default transition speed
                // clickSpeed: 800, // (optional) default transition speed on click
                // keySpeed: 800, // (optional) default transition speed on keypress
                timingFunction: 'easeInOutQuart', // timing function for slide transitions
                snapThreshold: 0.1, // point at which carousel goes to next/previous slide on swipe/drag
                prevClickEnabled: false, // optionally enable go to previous slide on click left side
                bindSwipe: true, // should the carousel allow touch/mouse control
                bindKeys: true, // should the carousel allow keyboard control
                startIdx: 0, // optionally start at this index in the array
                autoPlay: false, // should the carousel autoplay
                autoPlayDelay: 3000, // delay between going to next page
              };

              // Parse the values out of the attr value.
              var expression = $attr.hjCarousel;
              var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*$/);
              var valueIdentifier;
              var listIdentifier;

              if (!match) {
                $log.error(
                  'Expected hjCarousel in form of "_item_ in _array_" but got "' +
                    expression +
                    '".'
                );
              }

              valueIdentifier = match[1];
              listIdentifier = match[2];

              if ($attr.hjCarouselOptions !== undefined) {
                angular.extend(defaults, $scope.$eval($attr.hjCarouselOptions));
              }

              var getPrefix = function(prop) {
                var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'];
                var elem = document.createElement('div');
                var upper = prop.charAt(0).toUpperCase() + prop.slice(1);

                if (prop in elem.style) {
                  return prop;
                }

                for (var len = prefixes.length; len--; ) {
                  if (prefixes[len] + upper in elem.style) {
                    return prefixes[len] + upper;
                  }
                }

                return false;
              };

              var isTouch =
                'ontouchstart' in window ||
                (window.DocumentTouch && document instanceof DocumentTouch);
              var pfxTransform = getPrefix('transform');
              var pfxTransitionDuration = getPrefix('transitionDuration');
              var pfxTransitionTimingFunction = getPrefix(
                'transitionTimingFunction'
              );

              var goTo = function(i, speed, args) {
                flipPage(parseInt(i), speed, args);
              };

              var next = function(speed) {
                if (list.length < 2 || moving) {
                  return false;
                }

                flipPage('next', speed !== undefined ? speed : defaults.speed);
              };

              var prev = function(speed) {
                if (list.length < 2 || moving) {
                  return false;
                }

                flipPage('prev', speed !== undefined ? speed : defaults.speed);
              };

              $scope.$on('carousel:goTo', function(e, i, speed, args, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                goTo(i, speed, args);
              });

              $scope.$on('carousel:next', function(e, speed, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                next(speed);
              });

              $scope.$on('carousel:prev', function(e, speed, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                prev(speed);
              });

              $scope.$carousel = {};

              var container = $element.children();
              var slider = container.children();

              // Empty out the slider.
              var templateFrame = slider.children();

              slider.children().remove();
              slider.append('<!-- hjCarousel -->');

              function linker(frame) {
                transcludeFn(frame.$scope, function(clone) {
                  var frameClone = templateFrame.clone();
                  frameClone.children().replaceWith(clone);
                  slider.append(frameClone);
                  frame.$element = frameClone;
                });
              }

              // Holds the 'frames' that are reused.
              var frames = [];
              for (var i = 0; i < 5; i++) {
                var frame = {};
                frame.$scope = $scope.$new();
                frames.push(frame);

                linker(frame);

                angular.element(frame.$element).attr('data-index', i);

                if (i === 2) {
                  angular.element(frame.$element).addClass('current');
                }
              }

              var page; // The notional page in the infinite scrolling.
              var pageIndex = defaults.startIdx; // The index of that page in the array.
              var autoPlayTimeout;

              $scope.$carousel.playing = false;

              $scope.$watch(
                function() {
                  return $scope.$carousel.playing;
                },
                function(newValue) {
                  $scope.$emit(
                    'carousel:status',
                    newValue ? 'playing' : 'stopped',
                    defaults.id
                  );
                }
              );

              var init = function() {
                repositionFrames();

                moveSlider(0);

                setFramesPageId();

                setFramesScope();

                $timeout(function() {
                  setSizeVars();

                  if (defaults.autoPlay) {
                    play();
                  }

                  $scope.$emit('carousel:init', defaults.id);
                });
              };

              var autoPlay = function() {
                next();

                play();
              };

              var play = function(immediate) {
                immediate = immediate || false;

                $scope.$carousel.playing = true;

                if (immediate) {
                  next();
                }

                $timeout.cancel(autoPlayTimeout);
                autoPlayTimeout = $timeout(autoPlay, defaults.autoPlayDelay);
              };

              var stop = function() {
                $scope.$carousel.playing = false;

                $timeout.cancel(autoPlayTimeout);
              };

              $scope.$on('carousel:playPause', function(e, immediate, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                immediate = immediate || false;

                if ($scope.$carousel.playing) {
                  stop();
                } else {
                  play(immediate);
                }
              });

              $scope.$on('carousel:play', function(e, immediate, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                immediate = immediate || false;

                play(immediate);
              });

              $scope.$on('carousel:stop', function(e, id) {
                if (id && defaults.id !== id) {
                  return false;
                }

                stop();
              });

              var repositionFrames = function() {
                // Makes sure the 'left' values of all frames are set correctly.
                page = 0;

                frames[0].$element.css('left', page * 100 - 200 + '%');
                frames[1].$element.css('left', page * 100 - 100 + '%');
                frames[2].$element.css('left', page * 100 + '%');
                frames[3].$element.css('left', page * 100 + 100 + '%');
                frames[4].$element.css('left', page * 100 + 200 + '%');
              };

              var list = [];

              $scope.$watch(listIdentifier, function(newValue) {
                if (newValue !== undefined) {
                  list = newValue;

                  init();
                }
              });

              var setFramesPageId = function() {
                frames[0].pageId =
                  pageIndex === 0
                    ? list.length - 2
                    : pageIndex === 1
                    ? list.length - 1
                    : pageIndex - 2;
                frames[1].pageId =
                  pageIndex === 0 ? list.length - 1 : pageIndex - 1;
                frames[2].pageId = pageIndex;
                frames[3].pageId =
                  pageIndex === list.length - 1 ? 0 : pageIndex + 1;
                frames[4].pageId =
                  pageIndex === list.length - 1
                    ? 1
                    : pageIndex === list.length - 2
                    ? 0
                    : pageIndex + 2;
              };

              var sliderX = 0;
              var viewportWidth;
              var viewportHeight;
              var snapThreshold;

              var moving = false,
                direction;

              var setSizeVars = function() {
                $scope.$carousel.width = viewportWidth =
                  container[0].clientWidth;
                $scope.$carousel.height = viewportHeight =
                  container[0].clientHeight;

                $scope.$carousel.slideWidth = frames[2].$element.children()
                  .length
                  ? frames[2].$element.children()[0].clientWidth
                  : frames[2].$element[0].clientWidth;
                $scope.$carousel.slideHeight = frames[2].$element.children()
                  .length
                  ? frames[2].$element.children()[0].clientHeight
                  : frames[2].$element[0].clientHeight;

                snapThreshold = Math.round(
                  viewportWidth * defaults.snapThreshold
                );
              };

              var resize = function() {
                setSizeVars();

                moveSlider(-page * viewportWidth);

                if (!$scope.$$phase) {
                  $scope.$apply();
                }
              };

              var reset = function() {
                // reset left/translate positions (improves resizing performance)
                if (direction !== undefined) {
                  repositionFrames();
                  moveSlider(0);
                }
              };

              var moveFrame = function(from, to) {
                /*jshint validthis: true */
                this.splice(to, 0, this.splice(from, 1)[0]);
              };

              var movingTimeout;

              var moveSlider = function(x, transDuration) {
                moving = true;

                transDuration = transDuration || 0;

                sliderX = x;

                slider[0].style[pfxTransform] =
                  'translate3d(' + x + 'px, 0, 0)';
                slider[0].style[pfxTransitionDuration] = transDuration + 'ms';
                slider[0].style[pfxTransitionTimingFunction] =
                  Ease[defaults.timingFunction] || defaults.timingFunction;

                $timeout.cancel(movingTimeout);

                if (transDuration > 0) {
                  movingTimeout = $timeout(function() {
                    moving = false;
                  }, transDuration);
                } else {
                  moving = false;
                }
              };

              var flipPage = function(index, speed, args) {
                speed = speed !== undefined ? speed : defaults.speed;
                args = args || {};

                var preventNotify = args.preventNotify || false;

                if (typeof index === 'number') {
                  direction = 0;
                } else if (index === 'auto') {
                  direction = sliderX / viewportWidth > 0 ? 1 : -1;
                } else if (index === 'next') {
                  direction = -1;
                } else if (index === 'prev') {
                  direction = 1;
                }

                page = page - direction;

                var forceTransition = false;

                if (direction === 0) {
                  var pageDiff = Math.abs(pageIndex - index);

                  forceTransition = pageDiff > 2 ? false : true;

                  if (forceTransition) {
                    page = index > pageIndex ? pageDiff : -pageDiff;
                  }

                  pageIndex = index;
                } else if (direction === 1) {
                  pageIndex = pageIndex === 0 ? list.length - 1 : pageIndex - 1;
                } else if (direction === -1) {
                  pageIndex = pageIndex === list.length - 1 ? 0 : pageIndex + 1;
                }

                if (!preventNotify) {
                  var changeEvent = $scope.$emit(
                    'carousel:changeStart',
                    pageIndex,
                    args,
                    defaults.id
                  );

                  if (changeEvent.defaultPrevented) {
                    return false;
                  }
                }

                var newX = -page * viewportWidth;

                var transDuration =
                  forceTransition === true
                    ? speed
                    : Math.floor(
                        (speed * Math.abs(sliderX - newX)) / viewportWidth
                      );

                if (sliderX === newX && forceTransition === false) {
                  // If we swiped exactly to the next page.
                  transDuration = 0;
                }

                moveSlider(newX, transDuration);

                $timeout(function() {
                  if (direction === 1) {
                    moveFrame.apply(frames, [frames.length - 1, 0]);

                    frames[0].$element.css('left', page * 100 - 200 + '%');
                    frames[1].$element.css('left', page * 100 - 100 + '%');
                  } else if (direction === -1) {
                    moveFrame.apply(frames, [0, frames.length - 1]);

                    frames[3].$element.css('left', page * 100 + 100 + '%');
                    frames[4].$element.css('left', page * 100 + 200 + '%');
                  }

                  setFramesPageId();

                  setFramesScope();

                  reset();

                  if (!preventNotify) {
                    $scope.$emit(
                      'carousel:changeSuccess',
                      pageIndex,
                      args,
                      defaults.id
                    );
                  }
                }, transDuration);
              };

              var setFramesScope = function() {
                for (var i = 0; i < 5; i++) {
                  var frameScope = frames[i].$scope;
                  var idx = frames[i].pageId;

                  frameScope[valueIdentifier] = list[idx];

                  frameScope.$index = idx;
                  frameScope.$first = idx === 0;
                  frameScope.$middle = idx > 0 && idx < frames.length - 1;
                  frameScope.$last = idx === frames.length - 1;
                  frameScope.$even = !(idx % 2);
                  frameScope.$odd = !!(idx % 2);

                  if (i === 2) {
                    angular.element(frames[i].$element).addClass('current');
                    frameScope.$current = true;

                    $scope.$carousel.currentFrame = frames[i];
                  } else {
                    angular.element(frames[i].$element).removeClass('current');
                    frameScope.$current = false;
                  }
                }

                $scope.$carousel.frames = frames;
                $scope.$carousel.pageIndex = pageIndex;
              };

              if (defaults.bindSwipe) {
                var hammer = new Hammer(slider[0]);

                hammer.on('tap', function(event) {
                  flipPage(
                    event.center.x < viewportWidth * 0.5 &&
                      defaults.prevClickEnabled
                      ? 'prev'
                      : 'next',
                    defaults.clickSpeed !== undefined
                      ? defaults.clickSpeed
                      : defaults.speed
                  );
                });

                hammer.on('pan', function(event) {
                  if (list.length < 2 || moving) {
                    return false;
                  }

                  if (event.isFirst) {
                    direction = 0;

                    stop();

                    moveSlider(-page * viewportWidth);
                  }

                  if (!event.isFirst && !event.isFinal) {
                    direction =
                      event.deltaX > 0 ? 1 : event.deltaX < 0 ? -1 : 0;

                    moveSlider(event.deltaX);
                  }

                  if (event.isFinal) {
                    if (event.distance < snapThreshold) {
                      moveSlider(
                        -page * viewportWidth,
                        Math.floor(300 * (event.distance / snapThreshold))
                      );
                    } else {
                      flipPage('auto');
                    }
                  }
                });
              }

              var keyDown = function(e) {
                switch (e.keyCode) {
                  case 37:
                    stop();
                    prev(
                      defaults.keySpeed !== undefined
                        ? defaults.keySpeed
                        : defaults.speed
                    );
                    break;
                  case 39:
                    stop();
                    next(
                      defaults.keySpeed !== undefined
                        ? defaults.keySpeed
                        : defaults.speed
                    );
                    break;
                }
              };

              var resizeEvent =
                'onorientationchange' in $window
                  ? 'orientationchange'
                  : 'resize';

              angular.element($window).on(resizeEvent, resize);

              if (defaults.bindKeys) {
                $document.on('keydown', keyDown);
              }

              $scope.$on('$destroy', function() {
                angular.element($window).off(resizeEvent, resize);
                $document.off('keydown', keyDown);
              });
            };
          },
        };
      },
    ]);
})();
