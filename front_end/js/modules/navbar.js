// js/navbar.js
export const initializeNavbar = () => {

    const btnBuscar = document.getElementById('btn_buscar')
    const cerrarform = document.getElementById('cerrar_form')

    if (btnBuscar) {

        btnBuscar.addEventListener('click', () => {
            console.log('open')
            document.body.classList.toggle('box-collapse-open')

        })
    }

    if (cerrarform) {

        cerrarform.addEventListener('click', () => {
            document.body.classList.add('box-collapse-closed')
            document.body.classList.remove('box-collapse-open')

        })
    }
}