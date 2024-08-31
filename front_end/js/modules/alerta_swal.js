//////ALERTAS////////

export const _alerta = (texto, icon) => {

    const iconosPermitidos = ['success', 'error', 'warning', 'info', 'question']
    const iconTipo = iconosPermitidos.includes(icon) ? icon : 'info'

    Swal.fire({
        icon: iconTipo,
        title: 'Alerta',
        text: `${texto}`
    })
}