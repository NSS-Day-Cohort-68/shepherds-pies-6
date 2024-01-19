import { useEffect, useState } from "react"
import {
	deletePizza,
	deleteToppingsForPizza,
	getAllToppings,
	getPizzaToppings,
	getPizzasByOrderId,
} from "../../services/pizzaService"
import { getOrderById } from "../../services/orderService"
import { Link, useParams } from "react-router-dom"
import { getAllEmployees } from "../../services/employeeService"

export const EditOrder = () => {
	const { orderId } = useParams()
	const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])
	const [currentOrder, setCurrentOrder] = useState([])
	const [allToppings, setAllToppings] = useState([])
	const [pizzaToppings, setPizzaToppings] = useState([])
	const [driverSelection, setDriverSelection] = useState(null)
	const [tableNumberSelection, setTableNumberSelection] = useState(0)
	const [allEmployees, setAllEmployees] = useState([])
	const tableNumbers = []

	for (let i = 1; i <= 20; i++) {
		tableNumbers.push(i)
	}

	const handleEmployeeChange = (event) => {
		setDriverSelection(event.target.value)

		//need to update order with this new info
	}

	const handleTableChange = (event) => {
		setTableNumberSelection(event.target.value)

		//need to update order with this new info
	}

	const getAndSetPizzas = (orderId) => {
		getPizzasByOrderId(orderId).then((currentPizzas) => {
			setCurrentOrdersPizzas(currentPizzas)
		})
	}

	const getToppingsForPizza = (pizza) => {
		if (!pizza) {
			return []
		}
		//gets all the pizzaToppings with the pizzaId
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

	useEffect(() => {
		getAllToppings().then((toppingsArr) => {
			setAllToppings(toppingsArr)
		})
		getPizzaToppings().then((pizzaToppingsArr) =>
			setPizzaToppings(pizzaToppingsArr)
		)
		getAllEmployees().then((employeesArr) => {
			setAllEmployees(employeesArr)
		})
	}, [])

	useEffect(() => {
		getAndSetPizzas(orderId)
		getOrderById(orderId).then((order) => {
			setCurrentOrder(order)
		})
	}, [orderId])

	return (
		<div className="create-order-container">
			{currentOrder.deliveryDriver !== null && (
				<div className="dropdown-container">
					<label>Change driver: </label>
					<select
						id="employeees-dropdown"
						className="dropdown"
						onChange={handleEmployeeChange}
					>
						<option className="employee-name" value="0">
							Delivery Driver
						</option>
						{allEmployees.map((employeeObj) => {
							return (
								<option className="employee" value={employeeObj.id}>
									{employeeObj.name}
								</option>
							)
						})}
					</select>
				</div>
			)}
			{currentOrder.deliveryDriver === null && (
				<div className="dropdown-container">
					<label>Change Table #: </label>
					<select
						id="table-dropdown"
						className="dropdown"
						onChange={handleTableChange}
					>
						<option className="table-name" value="0">
							Table
						</option>
						{tableNumbers.map((tableNum) => {
							return (
								<option className="table" value={tableNum}>
									{tableNum}
								</option>
							)
						})}
					</select>
				</div>
			)}

			<div className="pizzas-in-order-container">
				{currentOrdersPizzas.map((ordersPizzaObj) => {
					const toppingString = getToppingsForPizza(ordersPizzaObj)
						.map((topping) => topping.topping)
						.join(", ")
					return (
						<div className="pizzas-details">
							<div>
								<i
									className="delete-btn fa-solid fa-trash"
									onClick={async () => {
										await deletePizza(ordersPizzaObj)
										await deleteToppingsForPizza(ordersPizzaObj)
										getAndSetPizzas(orderId)
									}}
								></i>
							</div>
							<div className="pizzas-in-order">
								<div>
									A {ordersPizzaObj.size.size} pizza with{" "}
									{ordersPizzaObj.cheese.cheese} cheese, and{" "}
									{ordersPizzaObj.sauce.sauce} sauce
								</div>
								<div> Toppings: {toppingString} </div>
							</div>
							<div className="pizza-price">$00.00</div>
						</div>
					)
				})}
				<button className="add-new-pizza-btn">
					<Link to="/createPizza">New Pizza</Link>
				</button>
			</div>
			<div className="order-footer-container">
				<div className="order-total">Total:</div>
				<div className="order-total">${}</div>
			</div>
			<div className="order-footer-container">
				<button className="all-orders-btn">
					<Link to="/allOrders">All Orders</Link>
				</button>
			</div>
		</div>
	)
}
