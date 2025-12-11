import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <header>
                <h1>Hello world</h1>
            </header>
            <Navbar />
            <main>{children}</main>
            <footer>
                <p>xd</p>
            </footer>
        </div>
    )
}