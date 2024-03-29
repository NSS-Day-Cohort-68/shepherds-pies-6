import { useEffect, useState } from "react"
import { Sale } from "./Sale.js"
import { getAllOrders } from "../../services/orderService.js"
import { Months } from "./Months"

export const SalesList = () => {
	const [allOrders, setAllOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
	const [selectedMonth, setSelectedMonth] = useState("0")

	useEffect(() => {
		getAllOrders().then((data) => {
			setAllOrders(data)
		})
	}, [])

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
		<>
			<div className="sales-report">
				<h2>Sales Report</h2>
				<Months setSelectedMonth={setSelectedMonth} />
			</div>
			<div className="sales-container">
				<div>Total Selected Sales: </div>
				<h2>Sales</h2>
				<article className="sales">
					{filteredOrders.map((orderObj) => {
						return (
							<Sale
								order={orderObj}
								pizzasArray={orderObj.pizzas}
								key={orderObj.id}
							/>
						)
					})}
				</article>
			</div>
		</>
	)
}
