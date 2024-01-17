import { useEffect, useState } from "react"
import { Sale } from "./Sale.js"
import { getAllOrders } from "../../services/orderService.js"
import { Months } from "./Months"

export const SalesList = () => {
	const [allOrders, setAllOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
	const [selectedMonth, setSelectedMonth] = useState("0")
	const [currentPizzas, setCurrentPizzas] = useState([])

	// ! initial getting of all orders
	useEffect(() => {
		getAllOrders().then((data) => {
			setAllOrders(data)
		})
	}, [])

	// ! addition of "filteredOrders to only be filled with "allOrders" when dropdown value = 0
	// ! else -> filter "allOrders" by ---->new Date(order.timestamp).getMonth() + 1 // Adding 1 because months are 0-indexed<--
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

	const getFilteredOrdersTotalPrice = () => {}

	return (
		<>
			<div className="sales-report">
				<h2>Sales Report</h2>
				<Months
					setMonth={setSelectedMonth}
					getFilteredOrdersTotalPrice={getFilteredOrdersTotalPrice}
				/>
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
