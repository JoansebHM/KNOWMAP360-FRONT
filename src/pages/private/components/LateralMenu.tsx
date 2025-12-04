import { dashboardTabs } from '../../../services/constants/dashboard/tabs';

function LateralMenu() {
    return (
        <div className="w-[25%] max-w-[235px] bg-blue-900 p-4 flex flex-col gap-6">
            {/* Logo */}
            <div className="flex flex-col">
                <span className="text-white font-bold text-4xl">K360</span>
                <span className="text-white text-sm leading-4">
                    Software de gestión de conocimiento
                </span>
            </div>

            <hr className="text-white" />

            {/* Botones laterales */}
            <div className="flex flex-col gap-2">
                {dashboardTabs.map((tab, index) => (
                    <button
                        key={index}
                        className="cursor-pointer flex items-center gap-2 text-white w-full justify-start rounded-[10px] rounded-l-none px-3 py-2 hover:bg-white/20 hover:text-md hover:font-semibold transition-all duration-200"
                        title={tab.label}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default LateralMenu;
