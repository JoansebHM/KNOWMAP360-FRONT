import { ChevronLeft, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import { useState } from 'react';
import NotificationModal from '../modals/NotificationModal';

function Header() {
    const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
    return (
        <div className="bg-white p-5 flex justify-between items-center shadow-md">
            <Link className="flex items-center gap-1" to={PATHS.HOME}>
                <ChevronLeft />
                <span className="text-sm font-semibold">Regresar</span>
            </Link>
            <div className="flex justify-end gap-4 items-center">
                <Bell onClick={() => setNotificationsModalOpen(true)} className="cursor-pointer" />
            </div>
            {/* <Activity mode={notificationsModalOpen ? 'visible' : 'hidden'}>
                <NotificationModal onClose={() => setNotificationsModalOpen(false)} />
            </Activity> */}
            {notificationsModalOpen && (
                <NotificationModal onClose={() => setNotificationsModalOpen(false)} />
            )}
        </div>
    );
}

export default Header;
