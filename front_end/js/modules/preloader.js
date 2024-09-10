export const initializePreloader = () => {
    $(window).on('load', () => {
        const preloader = $('#preloader')
        if (preloader.length) {
            preloader.delay(100).fadeOut('slow', () => {
                $(this).remove()
            })
        }
    })
}