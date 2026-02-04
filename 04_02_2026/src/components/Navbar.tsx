import { NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/kategorie">Kategorie</NavLink>
        </nav>
    )
}