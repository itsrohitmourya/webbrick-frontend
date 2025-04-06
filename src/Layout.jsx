import { Outlet } from "react-router-dom";
import {Nav, Footer} from './index'

const Layout = () => {
    return (
        <>
            <Nav />
            <main className="h-auto w-full">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
