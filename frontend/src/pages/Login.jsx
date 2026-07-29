import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(

                "http://localhost:8080/api/auth/login",

                {

                    username,

                    password

                }

            );

            localStorage.setItem(

                "token",

                response.data.token

            );

            localStorage.setItem(

                "username",

                response.data.username

            );

            localStorage.setItem(

                "role",

                response.data.role

            );

            navigate("/admin");

        }

        catch (error) {

            alert("Invalid username or password.");

        }

    };

    return (

        <div className="login-page">

            <h1>Admin Login</h1>

            <input

                type="text"

                placeholder="Username"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

            />

            <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <button

                onClick={handleLogin}

            >

                Login

            </button>

        </div>

    );

}

export default Login;