import { NavLink } from "react-router"

function Header() {
  return (
    <header>
        <h1>Ecommerce</h1>
        <nav style={{display: "flex", gap: "1rem"}}>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/products"}>products</NavLink>
        </nav>
    </header>
  )
}

export default Header