(function ($) {

    var defaults = {
        speedAnimation: 600
    };


    var num, skillLine, numbS;

    var fNum = function () {
        if (num.length > 0) {

            num.parent().each(function () {
                var self = $(this),
                    winTop = $(window).scrollTop(),
                    topPos = self.offset().top - $(window).height(),
                    blHeight = self.height() - 100,
                    sectionTop = self.parents('.container').offset().top;

                if (!self.hasClass('target')) {
                    self.find(num).each(function () {
                        var $this = $(this),
                            numb = $this.data('num'),
                            incr = $this.data('increment'),
                            fractional = $this.data('fractional') ? $this.data('fractional') : 0,
                            i = 0,
                            timer;

                        if ((winTop >= topPos && winTop <= (topPos + blHeight)) || (winTop <= sectionTop && (winTop + $(window).height()) >= sectionTop)) {
                            timer = setTimeout(function run() {
                                if (i < numb) i += incr;
                                else {
                                    i = numb;
                                    $this.text(i.toFixed(fractional).replace('.', ',')
                                        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                                    return i;
                                }
                                $this.text(i.toFixed(fractional).replace('.', ',')
                                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

                                if (skillLine.length > 0) {
                                    $this.parent().prev().animate({'width': i + '%'}, 17);
                                }

                                timer = setTimeout(run, 20);
                            }, 20);

                            $this.parent().addClass('target');
                        }
                        else {
                            numbS = numb.toString().replace('.', ',');
                            $this.text(numbS.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                            if (skillLine.length > 0) {
                                $this.parent().prev().css('width', numb + '%');
                            }
                        }
                    });
                }
            });
        }
    };

    var histEvent = null;

    var histLine = function () {
        if (histEvent.length > 0) {
            histEvent.each(function () {
                var self = $(this),
                    winTop = $(window).scrollTop(),
                    topPos = self.offset().top - $(window).height();
                if ((winTop >= topPos)) {
                    self.delay(defaults.speedAnimation / 3).animate({'opacity': 1}, defaults.speedAnimation);
                }
            });
        }
    };

    var chartEvent = null;
    var loadChart = function () {
        if (chartEvent.length > 0) {
            chartEvent.each(function () {
                var self = $(this),
                    winTop = $(window).scrollTop(),
                    topPos = self.offset().top - $(window).height();
                if ((winTop >= topPos) && !self.data('loaded')) {
                    self.attr('data-loaded', true);
                    self.easyPieChart({
                        barColor: '#e7543d',
                        animate: defaults.speedAnimation * 4,
                        size: 210,
                        lineWidth: 12,
                        lineCap: 'butt',
                        onStep: function (from, to, percent) {
                            if (!$(this.el).hasClass('no-percent')) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        }
                    });
                }
            });
        }
    };

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).load(function () {
        histEvent = $('.history').find('.row');
        chartEvent = $('.chart');
        num = $('[data-num]'),
            skillLine = $('.progresses'),
            numbS;

        $('#preloader').delay(defaults.speedAnimation)
            .fadeOut(defaults.speedAnimation / 2);

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });


        $('[data-toggle="popover"]').popover();
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').tooltip();


        // TODO: Modernizr.touchevents check

        fNum();
        histLine();
        loadChart();

        var scrollHandler = function () {  // onScroll function
            console.count("scroll");
            histLine();
            fNum();
            loadChart();
        };

        $(window).scroll(debounce(scrollHandler, 50));


        $('body').append('<script src="js/finishing.js" async></script>');

    });


})(jQuery);