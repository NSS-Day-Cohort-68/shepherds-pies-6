import { useEffect, useState } from "react"
import { Sale } from "./Sale.js"
import { getAllOrders } from "../../services/orderService.js"

export const SalesList = () => {
	const months = [
		{ id: 1, month: "January" },
		{ id: 2, month: "February" },
		{ id: 3, month: "March" },
		{ id: 4, month: "April" },
		{ id: 5, month: "May" },
		{ id: 6, month: "June" },
		{ id: 7, month: "July" },
		{ id: 8, month: "August" },
		{ id: 9, month: "September" },
		{ id: 10, month: "October" },
		{ id: 11, month: "November" },
		{ id: 12, month: "December" },
	]
	// const date = new Date()
	// const formattedDate = date.toLocaleString("en-US", {
	// 	month: "long",
	// 	day: "numeric",
	// 	year: "numeric",
	// 	hour: "numeric",
	// 	minute: "numeric",
	// 	hour12: true,
	// })

	const [allOrders, setAllOrders] = useState([])

	useEffect(() => {
		getAllOrders().then((data) => {
			setAllOrders(data)
		})
	}, [])

	return (
		<>
			<div className="sales">
				<h2>Sales Report</h2>
				<div className="months-div">
					<select className="month-dropdown">
						<option value={0} className="month month-option">
							All Months
						</option>
						{months.map((monthObj) => {
							return (
								<option
									value={monthObj.id}
									className="month-option"
									key={monthObj.id}
								>
									{monthObj.month}
								</option>
							)
						})}
					</select>
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
			</div>
		</>
	)
}

// ! SIZES
// !
// ! SMALL - $10.00
// ! MEDIUM - $12.00
// ! LARGE - $15.00
// !
// ! TOPPINGS $0.50 / each
// !
// ! DELIVERY CHARGE - $5.00
