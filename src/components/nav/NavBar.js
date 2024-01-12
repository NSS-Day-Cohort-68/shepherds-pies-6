import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/allOrders">All Orders</Link>
      </li>
      <li className="navbar-item">
        <Link to="/showOrder">New Order</Link>
      </li>
      <li className="navbar-item">
        <Link to="/employees">Employees</Link>
      </li>
      <li className="navbar-item">
        <Link to="/salesReport">Sales Report</Link>
      </li>
      {localStorage.getItem("shepard_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("shepard_user")
              navigate("/", { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
