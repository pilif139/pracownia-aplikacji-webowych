import { NavLink } from "react-router";

export default function Home() {
    return (
        <div className="home">
            <h1>Witaj na blogu</h1>
            <article>
                <h2>Posty</h2>
                <ul>
                    <li>
                        <h3>
                            <NavLink to="/post/1">Post 1</NavLink>
                        </h3>
                        <p>Opis posta 1</p>
                    </li>
                    <li>
                        <h3>
                            <NavLink to="/post/2">Post 2</NavLink>
                        </h3>
                        <p>Opis posta 2</p>
                    </li>
                </ul>
            </article>
        </div>
    )
}