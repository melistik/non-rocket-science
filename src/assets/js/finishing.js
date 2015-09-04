(function ($) {

    var navbarLogo = $(".navbar-header .logo"),
        navbarContact = $(".navbar-header .contact-info");

    $(".navbar").sticky({topSpacing: 0, getWidthFrom: '.custom-navigation', responsiveWidth: true})
        .on('sticky-start', function () {
            navbarLogo.removeClass('hidden');
            navbarContact.addClass('hidden');
        })
        .on('sticky-end', function () {
            navbarLogo.addClass('hidden');
            navbarContact.removeClass('hidden');
        });

    skrollr.init();

    $.scrollUp({
        animation: 'fade',
        scrollDistance: 400,
        scrollText: '<i class="icon nonrocketico-chevron-up"></i>',
        scrollTitle: 'Scroll to top'
    });


})(jQuery);