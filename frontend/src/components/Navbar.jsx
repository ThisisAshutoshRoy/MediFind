import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const location = useLocation();

    return (

        <nav className="navbar">

            <div className="logo">

                💊 MediFind

            </div>

            <div className="nav-links">

                <Link
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
                >
                    Home
                </Link>

                <Link
                    to="/recommendations"
                    className={location.pathname === "/recommendations" ? "active" : ""}
                >
                    Recommendations
                </Link>

                <Link
                    to="/compare"
                    className={location.pathname === "/compare" ? "active" : ""}
                >
                    Compare
                </Link>

                <Link
                    to="/pharmacies"
                    className={location.pathname === "/pharmacies" ? "active" : ""}
                >
                    Pharmacies
                </Link>

                <Link
                    to="/about"
                    className={location.pathname === "/about" ? "active" : ""}
                >
                    About
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;