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
        scrollText: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 12c0 6.623-5.377 12-12 12s-12-5.377-12-12 5.377-12 12-12 12 5.377 12 12zm-1 0c0 6.071-4.929 11-11 11s-11-4.929-11-11 4.929-11 11-11 11 4.929 11 11zm-11.5-4.828l-3.763 4.608-.737-.679 5-6.101 5 6.112-.753.666-3.747-4.604v11.826h-1v-11.828z" fills="white"/></svg>',
        scrollTitle: 'Scroll to top'
    });

    $(document).ready(function() {
        // No need to display this if user already accepted the policy
        if (userAlreadyAcceptedCookies()) {
            return;
        }

        // Ready to start!
        $('.eupopup-container').show();
    });


})(jQuery);