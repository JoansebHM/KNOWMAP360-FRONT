import LateralMenu from './components/LateralMenu';
import Header from './components/Header';
import Main from './components/Main';

function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <LateralMenu />
            <div className="flex-1">
                <Header />
                <Main />
            </div>
        </div>
    );
}

export default Dashboard;
