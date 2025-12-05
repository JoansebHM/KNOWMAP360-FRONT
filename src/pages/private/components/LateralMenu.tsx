import { LogOut, ChevronRightCircle, ChevronLeftCircleIcon } from 'lucide-react';
import { dashboardTabs } from '../../../services/constants/dashboard/tabs';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import { useState } from 'react';

function LateralMenu() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`${isCollapsed ? 'w-16' : 'w-[25%] max-w-[235px]'} bg-blue-900 p-4 flex flex-col gap-6 transition-all duration-300`}
        >
            <div className="flex items-center">
                {!isCollapsed && (
                    <div className="flex flex-col gap-5">
                        <div className='flex flex-col'>
                            <span className="text-white font-bold text-4xl">K360</span>
                            <span className="text-white text-sm leading-4">
                                Software de gestión de conocimiento
                            </span>
                        </div>
                        <span className="text-md text-white">
                            Hola, <span className="font-semibold">Julian Galeano!</span>
                        </span>
                    </div>
                )}
                <button
                    onClick={toggleCollapse}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 cursor-pointer"
                    type="button"
                    title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
                >
                    {isCollapsed ? (
                        <ChevronRightCircle size={20} />
                    ) : (
                        <ChevronLeftCircleIcon size={20} />
                    )}
                </button>
            </div>

            <hr className="text-white" />

            <div className="flex flex-col gap-2">
                {dashboardTabs.map((tab, index) => (
                    <div key={index} className="relative group">
                        <Link
                            onClick={() => setSelectedTab(index)}
                            className={`cursor-pointer flex items-center gap-2 text-white w-full justify-start p-2 hover:bg-white/20 hover:text-md hover:font-semibold transition-all duration-200
                                ${selectedTab === index ? 'bg-white/20 text-md font-semibold' : ''}
                                ${isCollapsed ? 'justify-center items-center rounded-full' : 'rounded-full'}
                            `}
                            title={isCollapsed ? tab.label : ''}
                            to={tab.path}
                        >
                            <div className="shrink-0">{tab.icon}</div>
                            {!isCollapsed && (
                                <span className="whitespace-nowrap overflow-hidden">
                                    {tab.label}
                                </span>
                            )}
                        </Link>

                        {isCollapsed && (
                            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                {tab.label}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <hr className="text-white" />

                <div className="relative group">
                    <Link
                        className={`cursor-pointer flex items-center gap-2 rounded-full text-white w-full justify-start p-2 hover:bg-white/20 hover:text-md hover:font-semibold transition-all duration-200
                            ${isCollapsed ? 'justify-center rounded-full' : ''}
                        `}
                        title={isCollapsed ? 'Cerrar sesión' : ''}
                        to={PATHS.HOME}
                    >
                        <div className="shrink-0">
                            <LogOut size={16} />
                        </div>
                        {!isCollapsed && (
                            <span className="whitespace-nowrap overflow-hidden">Cerrar sesión</span>
                        )}
                    </Link>

                    {isCollapsed && (
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            Cerrar sesión
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LateralMenu;
