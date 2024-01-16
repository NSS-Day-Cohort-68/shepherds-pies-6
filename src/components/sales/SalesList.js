import { useEffect, useState } from "react"
import { Sale } from "./Sale.js"
import { getAllOrders } from "../../services/orderService.js"
import { Months } from "./Months"

export const SalesList = () => {
	const [allOrders, setAllOrders] = useState([])

	useEffect(() => {
		getAllOrders().then((data) => {
			setAllOrders(data)
		})
	}, [])

	return (
		<>
			<div className="sales-report">
				<h2>Sales Report</h2>
				<Months />
			</div>
			<div className="sales-container">
				<h2>Sales</h2>
				<article className="sales">
					{allOrders.map((orderObj) => {
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
