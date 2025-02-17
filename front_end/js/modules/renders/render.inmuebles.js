export const renderExclusivosInmuebles = (data) => {


  const shuffledData = data.sort(() => 0.5 - Math.random());
  const selectedInmuebles = shuffledData.slice(0, 4)

  console.log(selectedInmuebles)

  const tipo_precio1 = document.getElementById('tipo_precio1')
  if (tipo_precio1) {
    tipo_precio1.innerHTML = `${selectedInmuebles[0].tipo_operacion} | $ ${selectedInmuebles[0].valor_inmueble}`
  }

}

export const renderAllInmuebles = async (data) => {


  const shuffledData = data.sort(() => 0.5 - Math.random());
  const selectedInmuebles = shuffledData.slice(0, 3)

  console.log(selectedInmuebles)

  const actualizarPrecio = (clase, tipo, valor) => {
    let elementos = document.querySelectorAll(`.${clase}`)

    if (elementos.length > 0) {
      elementos.forEach(element => {
        element.innerHTML = `${tipo} | $ ${valor}`
      });
    } else {
      console.log(`No se encontraron elementos con la clase ${clase}`)
    }
  }

  actualizarPrecio('tipo_precio1', selectedInmuebles[0].tipo_operacion, selectedInmuebles[0].valor_inmueble);
  actualizarPrecio('tipo_precio2', selectedInmuebles[1].tipo_operacion, selectedInmuebles[1].valor_inmueble);
  actualizarPrecio('tipo_precio3', selectedInmuebles[2].tipo_operacion, selectedInmuebles[2].valor_inmueble);

}

export const renderUnInmuebles = (data) => {

  console.log(data)

}