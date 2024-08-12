import {
    pageFunctions
} from './page.controller.js'

const init = () => {
    const path = window.location.pathname
    const page = path.substring(path.lastIndexOf('/') + 1)

    if (pageFunctions[page]) {
        pageFunctions[page]()
    } else {
        console.error('No hay función definida para la página:', page)
        _alerta('No hay función definida para la página', 'error')
    }
}

init()