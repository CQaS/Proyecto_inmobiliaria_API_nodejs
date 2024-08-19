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

        pageFunctions[page]()

    } else if (page == 'index.html') {

        const ir_registrar = document.getElementById('ir_registrar')

        ir_registrar.addEventListener('click', () => {

            const login = document.getElementById('login')
            login.style.display = 'none'

            const registro = document.getElementById('registro')
            registro.style.display = 'block'
        })

        const ir_login = document.getElementById('ir_login')

        ir_login.addEventListener('click', () => {

            const login = document.getElementById('login')
            login.style.display = 'block'

            const registro = document.getElementById('registro')
            registro.style.display = 'none'
        })

        const form = document.getElementById('login-form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const useremail = document.getElementById('useremail').value;
            const password = document.getElementById('password').value;

            pageFunctions['login'](useremail, password)
        })

        const registro_form = document.getElementById('registro-form')

        registro_form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const username = document.getElementById('username').value;
            const first_name = document.getElementById('first_name').value;
            const last_name = document.getElementById('last_name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value

            const _is_staff = document.querySelector('#is_staff')
            let is_staff

            _is_staff.checked ? is_staff = true : is_staff = false


            const _is_active = document.querySelector('#is_active')
            let is_active

            _is_active.checked ? is_active = true : is_active = false

            const _is_superuser = document.querySelector('#is_superuser')
            let is_superuser

            _is_superuser.checked ? is_superuser = true : is_superuser = false

            const data = {
                username,
                first_name,
                last_name,
                email,
                password,
                is_staff,
                is_active,
                is_superuser
            }

            pageFunctions['registro'](data)

        })

        const btn_inner = document.getElementById('inner')
        btn_inner.addEventListener('click', () => {

            pageFunctions['logout']()
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