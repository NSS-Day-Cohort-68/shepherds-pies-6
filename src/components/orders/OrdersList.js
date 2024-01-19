import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderService"
import { Order } from "./Order"
import "./Orders.css"
import { Months } from "../sales/Months"

export const OrdersList = () => {
	const [allOrders, setAllOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
	const [selectedMonth, setSelectedMonth] = useState("0")

	const getAndSetOrders = () => {
		getAllOrders().then((ordersArray) => {
			setAllOrders(ordersArray)
		})
	}

	useEffect(() => {
		getAndSetOrders()
	}, []) // ONLY runs on initial render of component

	useEffect(() => {
		const filterOrdersByMonth = () => {
			if (selectedMonth === "0") {
				setFilteredOrders(allOrders)
			} else {
				const filtered = allOrders.filter((order) => {
					const orderMonth = new Date(order.timestamp).getMonth() + 1 // Adding 1 because months are 0-indexed
					return orderMonth.toString() === selectedMonth
				})
				setFilteredOrders(filtered)
			}
		}

		filterOrdersByMonth()
	}, [allOrders, selectedMonth])

	return (
		<article className="orders">
			<h2 className="header">Order History</h2>
			<Months setMonth={setSelectedMonth} />
			{filteredOrders.map((orderObj) => {
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
