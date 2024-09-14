export const renderExclusivosInmuebles = (data) => {


  const shuffledData = data.sort(() => 0.5 - Math.random());
  const selectedInmuebles = shuffledData.slice(0, 4)

  console.log(selectedInmuebles)

  const tipo_precio1 = document.getElementById('tipo_precio1')
  if (tipo_precio1) {
    tipo_precio1.innerHTML = `${selectedInmuebles[0].tipo_operacion} | $ ${selectedInmuebles[0].valor_inmueble}`
  }

}

export const renderAllInmuebles = (data) => {

  console.log(data)

}

export const renderUnInmuebles = (data) => {

  console.log(data)

}