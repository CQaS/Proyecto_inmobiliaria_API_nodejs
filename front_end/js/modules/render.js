export const renderInmuebles = (data) => {

    const shuffledData = data.sort(() => 0.5 - Math.random());
    const selectedInmuebles = shuffledData.slice(0, 4)

    console.log(selectedInmuebles)

    for (let i = 0; i < selectedInmuebles.length; i++) {

        let link = document.getElementById(`link${i+1}`)
        let precio = document.getElementById(`precio${i+1}`)
        console.log(`${selectedInmuebles[i].dir_inmueble} <br />${selectedInmuebles[i].ciudad_inmueble}`, link, precio)

        link.innerHTML = `${selectedInmuebles[i].dir_inmueble} <br />${selectedInmuebles[i].ciudad_inmueble}`
        precio.innerHTML = `${selectedInmuebles[i].tipo_operacion} | $${selectedInmuebles[i].valor_inmueble}`
    }
}

export const renderClientes = (data) => {
    const list = document.getElementById('clientes-lista')
    list.innerHTML = data.map(cliente => `
        <li class="p-2 border-b border-gray-200">${cliente.nom_cliente}</li>
        `).join('')
}

export const renderEmpleados = (data) => {

    const shuffledData = data.sort(() => 0.5 - Math.random());
    const selectedEmpleados = shuffledData.slice(0, 4)

    console.log(selectedEmpleados)

    /* for (let i = 0; i < selectedInmuebles.length; i++) {
    
            let link = document.getElementById(`link${i+1}`)
            let precio = document.getElementById(`precio${i+1}`)
            console.log(`${selectedInmuebles[i].dir_inmueble} <br />${selectedInmuebles[i].ciudad_inmueble}`, link, precio)
    
            link.innerHTML = `${selectedInmuebles[i].dir_inmueble} <br />${selectedInmuebles[i].ciudad_inmueble}`
            precio.innerHTML = `${selectedInmuebles[i].tipo_operacion} | $${selectedInmuebles[i].valor_inmueble}`
        } */
}