import Navbar from "./Navbar";
import './Navbar.css'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Navbar />
            <div className="content">{children}</div>
        </main>
    )
}