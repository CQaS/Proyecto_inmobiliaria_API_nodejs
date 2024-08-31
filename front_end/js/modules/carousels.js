// js/carousels.js


export const initializeCarousels = () => {
    $('#carousel').owlCarousel({
        loop: true,
        margin: -1,
        items: 1,
        nav: true,
        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    })

    $('#property-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            769: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    })

    $('#property-single-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            }
        }
    })

    $('#new-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            769: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    })

    $('#te-carousel').owlCarousel({
        margin: 0,
        autoplay: true,
        nav: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeInUp',
        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    })
}