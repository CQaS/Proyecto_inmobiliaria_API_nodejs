// js/preloader.js
export const initializePreloader = () => {
    $(window).on('load', function () {
        const preloader = $('#preloader')
        if (preloader.length) {
            preloader.delay(100).fadeOut('slow', function () {
                $(this).remove()
            })
        }
    })
}