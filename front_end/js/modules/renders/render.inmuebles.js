export const renderInmuebles = (data) => {

    const shuffledData = data.sort(() => 0.5 - Math.random());
    const selectedInmuebles = shuffledData.slice(0, 4)

    console.log(selectedInmuebles)
}