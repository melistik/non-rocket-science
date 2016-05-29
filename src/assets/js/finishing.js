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

    $.scrollUp({
        animation: 'fade',
        scrollDistance: 400,
        scrollText: '<i class="icon nonrocketico-chevron-up"></i>',
        scrollTitle: 'Scroll to top'
    });



    // Cookie Banner
    var COOKIE_NAME = 'EU_COOKIE_LAW_CONSENT', COOKIE_EXPIRES_IN_DAYS = 90;

    // Storing the consent in a cookie
    var setUserAcceptsCookies = function(consent) {
        var d = new Date();
        var expiresInDays = COOKIE_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000;
        d.setTime( d.getTime() + expiresInDays );
        var expires = "expires=" + d.toGMTString();
        document.cookie = COOKIE_NAME + '=' + consent + "; " + expires + ";path=/";
    };

    // Let's see if we have a consent cookie already
    var userAlreadyAcceptedCookies = function() {
        var userAcceptedCookies = false;
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i].trim();
            if (c.indexOf(COOKIE_NAME) == 0) {
                userAcceptedCookies = c.substring(COOKIE_NAME.length + 1, c.length);
            }
        }

        return userAcceptedCookies;
    };

    var hideContainer = function() {
        $('.eupopup-container').animate({
            opacity: 0,
            height: 0
        }, 200, function() {
            $('.eupopup-container').hide(0);
        });
    };

    $(document).ready(function() {
        // No need to display this if user already accepted the policy
        if (userAlreadyAcceptedCookies()) {
            return;
        }

        $('.eupopup-button').click(function() {
            setUserAcceptsCookies(true);
            hideContainer();
            return false;
        });

        // Ready to start!
        $('.eupopup-container').show();
    });


})(jQuery);