(function() {

    'use strict';

    angular.module('hj.carousel', ['ngTouch']);

    angular.module('hj.carousel').service('customModernizr', ['$window', function($window) {
        /* Modernizr 2.8.3 (Custom Build) | MIT & BSD
         * Build: http://modernizr.com/download/#-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
         */
        return function(a, b, c) {
            function y(a) {
                i.cssText = a
            }

            function z(a, b) {
                return y(l.join(a + ";") + (b || ""))
            }

            function A(a, b) {
                return typeof a === b
            }

            function B(a, b) {
                return !!~("" + a).indexOf(b)
            }

            function C(a, b) {
                for (var d in a) {
                    var e = a[d];
                    if (!B(e, "-") && i[e] !== c) return b == "pfx" ? e : !0
                }
                return !1
            }

            function D(a, b, d) {
                for (var e in a) {
                    var f = b[a[e]];
                    if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
                }
                return !1
            }

            function E(a, b, c) {
                var d = a.charAt(0).toUpperCase() + a.slice(1),
                    e = (a + " " + n.join(d + " ") + d).split(" ");
                return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
            }
            var d = "2.8.3",
                e = {},
                f = b.documentElement,
                g = "modernizr",
                h = b.createElement(g),
                i = h.style,
                j, k = {}.toString,
                l = " -webkit- -moz- -o- -ms- ".split(" "),
                m = "Webkit Moz O ms",
                n = m.split(" "),
                o = m.toLowerCase().split(" "),
                p = {},
                q = {},
                r = {},
                s = [],
                t = s.slice,
                u, v = function(a, c, d, e) {
                    var h, i, j, k, l = b.createElement("div"),
                        m = b.body,
                        n = m || b.createElement("body");
                    if (parseInt(d, 10))
                        while (d--) j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), l.appendChild(j);
                    return h = ["&#173;", '<style id="s', g, '">', a, "</style>"].join(""), l.id = g, (m ? l : n).innerHTML += h, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = f.style.overflow, f.style.overflow = "hidden", f.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), f.style.overflow = k), !!i
                },
                w = {}.hasOwnProperty,
                x;
            !A(w, "undefined") && !A(w.call, "undefined") ? x = function(a, b) {
                return w.call(a, b)
            } : x = function(a, b) {
                return b in a && A(a.constructor.prototype[b], "undefined")
            }, Function.prototype.bind || (Function.prototype.bind = function(b) {
                var c = this;
                if (typeof c != "function") throw new TypeError;
                var d = t.call(arguments, 1),
                    e = function() {
                        if (this instanceof e) {
                            var a = function() {};
                            a.prototype = c.prototype;
                            var f = new a,
                                g = c.apply(f, d.concat(t.call(arguments)));
                            return Object(g) === g ? g : f
                        }
                        return c.apply(b, d.concat(t.call(arguments)))
                    };
                return e
            }), p.touch = function() {
                var c;
                return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : v(["@media (", l.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                    c = a.offsetTop === 9
                }), c
            };
            for (var F in p) x(p, F) && (u = F.toLowerCase(), e[u] = p[F](), s.push((e[u] ? "" : "no-") + u));
            return e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) x(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, y(""), h = j = null, e._version = d, e._prefixes = l, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function(a) {
                return C([a])
            }, e.testAllProps = E, e.testStyles = v, e.prefixed = function(a, b, c) {
                return b ? E(a, b, c) : E(a, "pfx")
            }, e
        }($window, $window.document);
    }]);

    angular.module('hj.carousel').constant('Ease', {
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
        easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
    });

    angular.module('hj.carousel').directive('hjCarousel', ['$swipe', '$timeout', '$log', '$window', '$document', 'customModernizr', 'Ease',
        function($swipe, $timeout, $log, $window, $document, customModernizr, Ease) {
            return {
                restrict: 'AC',
                transclude: true,
                template: '<div class="carousel-container">' + '<div class="carousel-wrapper">' + '<div class="carousel-slider" ng-transclude></div>' + '</div>' + '</div>',
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
                            autoPlayDelay: 3000 // delay between going to next page
                        };

                        // Parse the values out of the attr value.
                        var expression = $attr.hjCarousel,
                            match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*$/),
                            valueIdentifier, listIdentifier;

                        if (!match) {
                            $log.error('Expected hjCarousel in form of "_item_ in _array_" but got "' + expression + '".');
                        }

                        valueIdentifier = match[1];
                        listIdentifier = match[2];

                        if ($attr.hjCarouselOptions !== undefined) {
                            angular.extend(defaults, $scope.$eval($attr.hjCarouselOptions));
                        }

                        var transEndEventNames = {
                            'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
                            'MozTransition': 'transitionend', // only for FF < 15
                            'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
                        };

                        var pfxTransitionEnd = transEndEventNames[customModernizr.prefixed('transition')],
                            pfxTransitionDuration = customModernizr.prefixed('transitionDuration'),
                            pfxTransitionTimingFunction = customModernizr.prefixed('transitionTimingFunction');

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

                        var container = $element.children(),
                            slider = container.children();

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

                        var page, // The notional page in the infinite scrolling.
                            pageIndex = defaults.startIdx, // The index of that page in the array.
                            autoPlayTimeout;

                        $scope.playing = false;

                        $scope.$watch('playing', function(n, o) {
                            $scope.$emit('carousel:status', n ? 'playing' : 'stopped', defaults.id);
                        });

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

                            $scope.playing = true;

                            if (immediate) {
                                next();
                            }

                            $timeout.cancel(autoPlayTimeout);
                            autoPlayTimeout = $timeout(autoPlay, defaults.autoPlayDelay);
                        };

                        var stop = function() {
                            $scope.playing = false;

                            $timeout.cancel(autoPlayTimeout);
                        };

                        $scope.$on('carousel:playPause', function(e, immediate, id) {
                            if (id && defaults.id !== id) {
                                return false;
                            }

                            immediate = immediate || false;

                            if ($scope.playing) {
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

                        var repositionFrames = function() { // Makes sure the 'left' values of all frames are set correctly.
                            page = 0;

                            frames[0].$element.css('left', page * 100 - 200 + '%');
                            frames[1].$element.css('left', page * 100 - 100 + '%');
                            frames[2].$element.css('left', page * 100 + '%');
                            frames[3].$element.css('left', page * 100 + 100 + '%');
                            frames[4].$element.css('left', page * 100 + 200 + '%');
                        };

                        var list = [];

                        $scope.$watch(listIdentifier, function(n) {
                            if (n !== undefined) {
                                list = n;

                                init();
                            }
                        });

                        var setFramesPageId = function() {
                            frames[0].pageId = pageIndex === 0 ? list.length - 2 : pageIndex === 1 ? list.length - 1 : pageIndex - 2;
                            frames[1].pageId = pageIndex === 0 ? list.length - 1 : pageIndex - 1;
                            frames[2].pageId = pageIndex;
                            frames[3].pageId = pageIndex === list.length - 1 ? 0 : pageIndex + 1;
                            frames[4].pageId = pageIndex === list.length - 1 ? 1 : pageIndex === list.length - 2 ? 0 : pageIndex + 2;
                        };

                        var startX, pointX,
                            sliderX = 0,
                            viewportWidth, viewportHeight, snapThreshold;

                        var moved = false,
                            moving = false,
                            direction;

                        var setSizeVars = function() {
                            $scope.carouselWidth = viewportWidth = container[0].clientWidth;
                            $scope.carouselHeight = viewportHeight = container[0].clientHeight;

                            $scope.slideWidth = frames[2].$element.children().length ? frames[2].$element.children()[0].clientWidth : frames[2].$element[0].clientWidth;
                            $scope.slideHeight = frames[2].$element.children().length ? frames[2].$element.children()[0].clientHeight : frames[2].$element[0].clientHeight;

                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                            snapThreshold = Math.round(viewportWidth * defaults.snapThreshold);
                        };

                        var resize = function() {
                            setSizeVars();

                            moveSlider(-page * viewportWidth);
                        };

                        var reset = function() { // reset left/translate positions (improves resizing performance)
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

                            slider[0].style[customModernizr.prefixed('transform')] = 'translate3d(' + x + 'px, 0, 0)';
                            slider[0].style[pfxTransitionDuration] = transDuration + 'ms';
                            slider[0].style[pfxTransitionTimingFunction] = Ease[defaults.timingFunction] || defaults.timingFunction;

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

                            if (typeof(index) === 'number') {
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
                                var changeEvent = $scope.$emit('carousel:changeStart', pageIndex, args, defaults.id);

                                if (changeEvent.defaultPrevented) {
                                    return false;
                                }
                            }

                            var newX = -page * viewportWidth;

                            var transDuration = forceTransition === true ? speed : Math.floor(speed * Math.abs(sliderX - newX) / viewportWidth);

                            if (sliderX === newX && forceTransition === false) { // If we swiped exactly to the next page.
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
                                    $scope.$emit('carousel:changeSuccess', pageIndex, args, defaults.id);
                                }                                

                            }, transDuration);
                        };

                        var setFramesScope = function() {
                            for (var i = 0; i < 5; i++) {
                                var frameScope = frames[i].$scope,
                                    idx = frames[i].pageId;

                                frameScope[valueIdentifier] = list[idx];

                                frameScope.$index = idx;
                                frameScope.$first = idx === 0;
                                frameScope.$middle = idx > 0 && idx < frames.length - 1;
                                frameScope.$last = idx === frames.length - 1;
                                frameScope.$even = !(idx % 2);
                                frameScope.$odd = !!(idx % 2);

                                if (!frameScope.$$phase) {
                                    frameScope.$apply();
                                }

                                if (i === 2) {
                                    angular.element(frames[i].$element).addClass('current');
                                    frameScope.$current = true;

                                    $scope.currentFrame = frames[i];

                                } else {
                                    angular.element(frames[i].$element).removeClass('current');
                                    frameScope.$current = false;
                                }
                            }

                            $scope.frames = frames;
                            $scope.currentPage = pageIndex;
                        };

                        if (defaults.bindSwipe) {
                            $swipe.bind(slider, {
                                start: function(coords) {
                                    if (list.length < 2 || moving) {
                                        return false;
                                    }

                                    startX = coords.x;
                                    pointX = coords.x;
                                    direction = 0;

                                    stop();

                                    moved = false;

                                    moveSlider(-page * viewportWidth);
                                },

                                move: function(coords) {
                                    if (list.length < 2 || moving) {
                                        return false;
                                    }

                                    var deltaX = coords.x - pointX;
                                    var newX = sliderX + deltaX;
                                    pointX = coords.x;
                                    direction = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;

                                    moved = true;

                                    moveSlider(newX);
                                },

                                end: function(coords, e) {
                                    if (list.length < 2 || (customModernizr.touch && e.type !== 'touchend') || moving) {
                                        return false;
                                    }

                                    var x = coords && coords.x || pointX;
                                    var dist = Math.abs(x - startX);

                                    if (!moved) {
                                        flipPage(coords.x < viewportWidth * 0.5 && defaults.prevClickEnabled ? 'prev' : 'next', defaults.clickSpeed !== undefined ? defaults.clickSpeed : defaults.speed);
                                        return false;
                                    }

                                    if (dist < snapThreshold) {
                                        moveSlider(-page * viewportWidth, Math.floor(300 * (dist / snapThreshold)));

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
                                    prev(defaults.keySpeed !== undefined ? defaults.keySpeed : defaults.speed);
                                    break;
                                case 39:
                                    stop();
                                    next(defaults.keySpeed !== undefined ? defaults.keySpeed : defaults.speed);
                                    break;
                            }
                        };

                        var resizeEvent = 'onorientationchange' in $window ? 'orientationchange' : 'resize';

                        angular.element($window).on(resizeEvent, resize);

                        if (defaults.bindKeys) {
                            $document.on('keydown', keyDown);
                        }

                        $scope.$on('$destroy', function() {
                            angular.element($window).off(resizeEvent, resize);
                            $document.off('keydown', keyDown);
                        });

                    };
                }
            };
        }
    ]);

})();
