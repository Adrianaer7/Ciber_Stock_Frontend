const Alerta = ({children}) => {
    return (
        <div className="text-center bg-red-600 text-white rounded-lg shadow-md w-full mx-auto font-bold my-4 p-3 uppercase">
            {children}
        </div>
    )
}

export default Alerta