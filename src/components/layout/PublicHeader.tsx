import { Link } from 'react-router-dom';
import { Search, LogIn, User } from 'lucide-react';
import { PATHS } from '../../routes/paths';

function PublicHeader() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={PATHS.HOME} className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:shadow-lg transition-shadow">
                            <Search className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Knowledge360</h1>
                            <p className="text-xs text-gray-500">Sistema de Gestión del Conocimiento</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to={PATHS.SEARCH}
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Buscar
                        </Link>
                        <Link
                            to={PATHS.DOCUMENTS}
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Documentos
                        </Link>
                    </nav>

                    {/* Auth Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            to={PATHS.LOGIN}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            <LogIn size={18} />
                            <span className="hidden sm:inline">Iniciar Sesión</span>
                        </Link>
                        <Link
                            to={PATHS.DASHBOARD}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <User size={18} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PublicHeader;
