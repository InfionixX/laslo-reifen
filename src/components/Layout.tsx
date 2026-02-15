import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ImpressumModal from './Modals/ImpressumModal';
import PrivacyModal from './Modals/PrivacyModal';
import TireRimModal from './Modals/TireRimModal';
import ChatWidget from './ChatWidget';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />

            {/* Global Modals */}
            <ImpressumModal />
            <PrivacyModal />
            <TireRimModal />

            <ChatWidget />
        </div>
    );
};

export default Layout;
