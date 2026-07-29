import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {

    const location = useLocation();

    const menu = [

        {
            name: "Dashboard",
            path: "/admin",
            icon: "🏠"
        },

        {
            name: "Medicines",
            path: "/admin/medicines",
            icon: "💊"
        },

        {
            name: "Pharmacies",
            path: "/admin/pharmacies",
            icon: "🏥"
        },

        {
            name: "Inventory",
            path: "/admin/inventory",
            icon: "📦"
        }

    ];

    return (

        <div className="admin-sidebar">

            <h2>MediFind</h2>

            {

                menu.map(item => (

                    <Link

                        key={item.path}

                        to={item.path}

                        className={
                            location.pathname === item.path
                                ? "active"
                                : ""
                        }

                    >

                        {item.icon} {item.name}

                    </Link>

                ))

            }

        </div>

    );

}

export default AdminSidebar;