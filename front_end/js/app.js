import {
    pageFunctions
} from './page.controller.js'

import {
    _alerta
} from './alertas/alerta_swal.js'

const init = () => {
    const path = window.location.pathname
    const page = path.substring(path.lastIndexOf('/') + 1)

    if (pageFunctions[page]) {
        console.log('page')
        console.log(page)

        pageFunctions[page]()

    } else if (page == 'index.html') {

        const form = document.getElementById('login-form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const useremail = document.getElementById('useremail').value;
            const password = document.getElementById('password').value;

            pageFunctions['login'](useremail, password)
        })

    } else {

        console.error('No hay función definida para la página:', page)
        _alerta('No hay función definida para la página', 'error')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('init')

    init()
})