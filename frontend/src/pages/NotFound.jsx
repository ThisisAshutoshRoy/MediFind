import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="not-found-page">

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>

                Sorry, the page you are looking for doesn't exist.

            </p>

            <Link
                to="/"
                className="home-btn"
            >
                ⬅ Back to Home
            </Link>

        </div>

    );

}

export default NotFound;