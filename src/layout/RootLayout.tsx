import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Header from "../components/Header"

function RootLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout