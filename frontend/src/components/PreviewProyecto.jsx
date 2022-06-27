import { Link } from 'react-router-dom'

const PreviewProyecto = ({ proyecto }) => {
    const {nombre, cliente, _id} = proyecto

    return (
        <div className='border-b flex p-5 flex-col md:flex-row'>
            <p className='flex-1'>{nombre} <span className='text-sm text-gray-500 uppercase'>{''}{cliente}</span></p>

            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold transition-colors">Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto