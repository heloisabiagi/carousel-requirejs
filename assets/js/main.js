define(["jquery", "responsiveCarousel", "adminCarousel"],
    function ( $, responsiveCarousel, adminCarousel ) {
        responsiveCarousel.init($(".carousel-list"));
        adminCarousel.init();
    }
);