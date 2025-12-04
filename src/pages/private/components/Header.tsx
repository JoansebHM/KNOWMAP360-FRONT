import { ChevronLeft, Bell, MessageCircle, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';

function Header() {
    return (
        <div className="bg-white p-5 flex justify-between items-center shadow-md">
            <Link className="flex items-center gap-1" to={PATHS.HOME}>
                <ChevronLeft />
                <span className="text-sm font-semibold">Regresar</span>
            </Link>
            <div className="flex justify-end gap-4 items-center">
                <Bell />
                <MessageCircle />
                <UserCircle2 />
            </div>
        </div>
    );
}

export default Header;
