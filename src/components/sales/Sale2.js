import { useEffect, useState } from "react"
import { getPizzasByOrderId } from "../../services/pizzaService.js"

export const SaleTwo = ({ orderObj }) => {
	const [currentOrderPizzas, setCurrentOrderPizzas] = useState([])

	useEffect(() => {
		getPizzasByOrderId(orderObj.id).then((data) => {
			setCurrentOrderPizzas(data)
		})
	}, [orderObj])

	return (
		<div className="sale" key={orderObj.id}>
			<div className="sale-info">Order #{currentOrderPizzas[0]?.orderId}</div>
			{/* {currentOrderPizzas.map(())} */}
		</div>
	)
}
