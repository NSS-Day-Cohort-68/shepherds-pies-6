import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderService.js"
import { Months } from "./Months.js"
import { getPizzasByOrderId } from "../../services/pizzaService.js"
import { SaleTwo } from "./Sale2.js"

export const SalesListTwo = () => {
	const [allOrders, setAllOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
	const [selectedMonth, setSelectedMonth] = useState("0")
	const [currentOrderPizzas, setOrderPizzas] = useState([])
	const [allToppings, setAllToppings] = useState([])
	const [pizzaToppings, setPizzaToppings] = useState([])

	useEffect(() => {
		getAllOrders().then((data) => {
			setAllOrders(data)
		})
	}, [])

	useEffect(() => {
		filteredOrders.map((pizza) => console.log(pizza))
	}, [filteredOrders])

	useEffect(() => {
		getPizzasByOrderId()
	}, [])

	useEffect(() => {
		const filterOrdersByMonth = () => {
			if (selectedMonth === "0") {
				setFilteredOrders(allOrders)
			} else {
				const filtered = allOrders.filter((order) => {
					const orderMonth = new Date(order.timestamp).getMonth() + 1 //Adding 1 because months are 0-indexed
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
				{filteredOrders.map((orderObj) => {
					return (
						<div>
							<SaleTwo orderObj={orderObj} />
						</div>
					)
				})}
				<article className="sales"></article>
			</div>
		</>
	)
}