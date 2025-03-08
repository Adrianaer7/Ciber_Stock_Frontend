import Swal from "sweetalert2"

const mostarAlerta = (descripcionError, modo) => {
    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    })
    Eliminado.fire({
        icon: 'error',
        title: `${descripcionError}`,
        color: `${modo ? "white" : "#545454"}`,
        background: `${modo ? "#505050" : "white"}`,
    })
}

export default mostarAlerta;