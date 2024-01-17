import { useEffect, useState } from "react"
import "./Sale.css"
import { getPizzasByOrderId } from "../../services/pizzaService.js"
import {
	getAllToppings,
	getDetailedPizzaToppings,
} from "../../services/toppingsService.js"

export const Sale = ({ order, pizzasArray }) => {
	const [currentOrder, setCurrentOrder] = useState([])
	const [pizzaToppings, setPizzaToppings] = useState([])
	const [allToppings, setAllToppings] = useState([])
	// const [totalFilteredSales, setTotalFilteredSales] = useState(0)

	useEffect(() => {
		getPizzasByOrderId(order.id).then((data) => {
			setCurrentOrder(data)
		})
	}, [order])

	useEffect(() => {
		getDetailedPizzaToppings().then((data) => {
			setPizzaToppings(data)
		})
	}, [])

	useEffect(() => {
		getAllToppings().then((data) => {
			setAllToppings(data)
		})
	}, [])

	useEffect(() => {
		if (pizzasArray) {
			let matchingToppingsArray = []
			for (const pizzaTopping of pizzaToppings) {
				for (const pizza of pizzasArray) {
					if (pizzaTopping.pizzaId === pizza.id) {
						matchingToppingsArray.push(pizzaTopping.topping.topping)
					}
				}
			}
			// console.log(matchingToppingsArray)
		}
	}, [pizzaToppings, pizzasArray])

	const getToppingsForPizza = (pizza) => {
		//gets all the pizzaToppings with the pizzaId
		//returns an Array of pizzaTopping Objects
		const pizzaToppingsForPizza = pizzaToppings.filter(
			(pizzaTopping) => pizzaTopping.pizzaId === pizza.id
		)
		//then map each pizzaTopping to get the toppingId
		const toppingIds = pizzaToppingsForPizza.map(
			(pizzaTopping) => pizzaTopping.toppingId
		)
		//then for each toppingId we want to compare it to the topping id and return the topping for that pizza
		const toppingsForPizza = toppingIds.map((toppingId) =>
			allToppings.find((topping) => topping.id === toppingId)
		)

		return toppingsForPizza
	}

	const getTotalOrderPrice = (order) => {
		const totalPrice = order.map(
			(price) => price.size.price + price.pizzaToppings.length * 0.5
		)
		let sum = 0
		for (const price of totalPrice) {
			sum += price
		}
		return sum.toFixed(2)
	}

	// useEffect(() => {
	// 	const filteredSalesTotal = filteredOrders.map((order) => )
	// }, [])

	let count = 1
	return (
		<div className="sale" key={order.orderId}>
			<div className="sale-info">Order #{currentOrder[0]?.order.id}</div>
			{currentOrder.map((pizzaObj) => {
				return (
					<div>
						<header className="sale-info">
							<b>Pizza#: {count++}</b>
						</header>
						<div className="sale-info">Size: {pizzaObj.size.size}</div>
						<div className="sale-info">Cheese: {pizzaObj.cheese.cheese}</div>
						<div className="sale-info">Sauce: {pizzaObj.sauce.sauce}</div>

						<div className="sale-info toppings">
							<u>Toppings:</u>
							{getToppingsForPizza(pizzaObj).map((topping) => (
								<div className="topping">{topping?.topping}</div>
							))}
						</div>
						<div className="sale-info">
							Price: $
							{!pizzaObj.order.deliveryDriver
								? (
										pizzaObj.size.price +
										pizzaObj.pizzaToppings.length * 0.5
								  ).toFixed(2)
								: (
										pizzaObj.size.price +
										pizzaObj.pizzaToppings.length * 0.5 +
										5
								  ).toFixed(2)}
						</div>
					</div>
				)
			})}
			<div className="sale-info date">
				<b>Date:</b> {order.timestamp}
			</div>
			<div className="sale-info">
				<b>Total Price: ${getTotalOrderPrice(currentOrder)}</b>
			</div>
		</div>
	)
}

/* {`${(
	pizzaObj.size.price +
	pizzaObj.pizzaToppings.length * 0.5
).toFixed(2)}`} */
