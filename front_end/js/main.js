// js/main.js
import {
	initializePreloader,
	initializeScrollEvents,
	initializeNavbar,
	initializeCarousels,
	loadHTML,
	validateContactForm,
	pageFunctions,
	_alerta
} from './modules/index.js'

const init = async () => {

	try {

		initializePreloader()
		initializeScrollEvents()
		initializeCarousels()

		await Promise.all([
			loadHTML('./navbar.html', 'navbar'),
			loadHTML('./footer.html', 'footer-container')
		])
		initializeNavbar()

		const path = window.location.pathname
		const page = path.substring(path.lastIndexOf('/') + 1)

		if (pageFunctions[page]) {

			pageFunctions[page]()

			/* const btn_inner = document.getElementById('inner')
			btn_inner.addEventListener('click', () => {
				
				pageFunctions['logout']()
				}) */

		} else if (page == 'contacto.html') {

			validateContactForm()

		} else {

			console.error('No hay función definida para la página:', page)
			_alerta('No hay función definida para la página', 'error')
		}

		console.log('Todos los HTML cargados. OK!')

	} catch (error) {
		console.error('Error al cargar HTML:', error)
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	console.log('init')

	init()
})