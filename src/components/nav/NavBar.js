import { Link, useNavigate } from "react-router-dom"
import /* addNewOrder */ "../../services/orderService.js"
import "./NavBar.css"

export const NavBar = ({ currentUser }) => {
	const navigate = useNavigate()

	const handleAddNewOrder = (event) => {
		event.preventDefault()
		// const newOrderObj = {
		// 	employeeId: currentUser.id,
		// 	deliveryDriver: null,
		// 	tableNumber: 0,
		// 	timestamp: new Date(),
		// }

		// uncomment this line once order functionality is added
		// addNewOrder(newOrderObj)
		navigate("/createOrder")
	}

	return (
		<ul className="navbar">
			<li className="navbar-item">
				<Link to="/allOrders">All Orders</Link>
			</li>
			<li className="navbar-item">
				<Link onClick={handleAddNewOrder}>Create Order</Link>
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
