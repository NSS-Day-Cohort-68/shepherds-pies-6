import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderService"
import { Order } from "./Order"
import "./Orders.css"

export const OrdersList = () => {
	const [allOrders, setAllOrders] = useState([])

	const getAndSetOrders = () => {
		getAllOrders().then((ordersArray) => {
			setAllOrders(ordersArray)
		})
	}

	useEffect(() => {
		getAndSetOrders()
	}, []) // ONLY runs on initial render of component

	return (
		<article className="orders">
			<h2>Order History</h2>
			{allOrders.map((orderObj) => {
				return (
					<Order
						key={orderObj.id}
						order={orderObj}
						getAndSetOrders={getAndSetOrders}
					/>
				)
			})}
		</article>
	)
}
