import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen flex-col gap-6">
            <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
            <Link
                to="/"
                className="w-fit text-center text-sm  bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300"
            >
                Volver al inicio
            </Link>
        </div>
    );
}

export default NotFound;
