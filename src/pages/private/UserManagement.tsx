import { useState } from 'react';
import { Search, UserPlus, Trash2, Edit, Shield, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    createdAt: string;
}

// Mock data
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Admin Usuario',
        email: 'admin@knowledge360.com',
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-15',
    },
    {
        id: '2',
        name: 'María González',
        email: 'maria.gonzalez@university.edu',
        role: 'user',
        status: 'active',
        createdAt: '2024-02-20',
    },
    {
        id: '3',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@university.edu',
        role: 'user',
        status: 'active',
        createdAt: '2024-03-10',
    },
];

function UserManagement() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user' as 'admin' | 'user',
        password: '',
    });

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateUser = () => {
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
        };

        setUsers([...users, newUser]);
        toast.success(`Usuario ${formData.name} creado exitosamente`);
        setShowCreateModal(false);
        setFormData({ name: '', email: '', role: 'user', password: '' });
    };

    const handleUpdateUser = () => {
        if (!editingUser) return;

        setUsers(
            users.map((user) =>
                user.id === editingUser.id
                    ? { ...user, name: formData.name, email: formData.email, role: formData.role }
                    : user
            )
        );
        toast.success(`Usuario ${formData.name} actualizado`);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'user', password: '' });
    };

    const handleDeleteUser = (user: User) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
            setUsers(users.filter((u) => u.id !== user.id));
            toast.success(`Usuario ${user.name} eliminado`);
        }
    };

    const handleToggleStatus = (user: User) => {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
        toast.success(`Usuario ${user.name} ${newStatus === 'active' ? 'activado' : 'desactivado'}`);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
        });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
                <p className="text-gray-600">Administra los usuarios del sistema</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <UserPlus size={20} />
                    Crear Usuario
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Fecha Creación
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Mail size={14} />
                                                {user.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {user.role === 'admin' && <Shield size={12} />}
                                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleStatus(user)}
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No se encontraron usuarios</p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || editingUser) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nombre completo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="email@ejemplo.com"
                                />
                            </div>

                            {!editingUser && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="user">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingUser(null);
                                    setFormData({ name: '', email: '', role: 'user', password: '' });
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {editingUser ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
