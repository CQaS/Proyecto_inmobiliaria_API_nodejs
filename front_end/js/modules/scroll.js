// js/scroll.js
export const initializeScrollEvents = () => {
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top')
        if (window.scrollY > 100) {
            backToTop.style.display = 'block'
        } else {
            backToTop.style.display = 'none'
        }
    })

    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    const nav = document.querySelector('nav')

    window.addEventListener('scroll', () => {
        const pixels = 50
        const top = 1200
        if (window.scrollY > pixels) {
            nav.classList.add('navbar-reduce')
            nav.classList.remove('navbar-trans')
        } else {
            nav.classList.add('navbar-trans')
            nav.classList.remove('navbar-reduce')
        }
        if (window.scrollY > top) {
            document.querySelector('.scrolltop-mf').style.display = 'block'
        } else {
            document.querySelector('.scrolltop-mf').style.display = 'none'
        }
    })
}