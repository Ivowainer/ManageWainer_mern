import formatearFecha from "../helpers/formatearFecha"

const Tarea = ({ tarea }) => {
    const { descripcion, prioridad, nombre, fechaEntrega, estado, _id } = tarea

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="">
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-xl">{ formatearFecha(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            </div>

            <div className="flex gap-2">
                <button className="bg-indigo-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">Editar</button>
                {estado ? (
                    <button className="bg-sky-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">Completa</button>
                ) : (
                    <button className="bg-gray-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">Incompleta</button>
                )}
                <button className="bg-red-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">Eliminar</button>
            </div>
        </div>
    )
}

export default Tarea