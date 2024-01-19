import { fetchOptions } from "../helper"

export const getAllOrders = () => {
	return fetch(`http://localhost:8088/orders?_embed=pizzas`).then((response) =>
		response.json()
	)
}
export const addNewOrder = async (order) => {
	return fetch("http://localhost:8088/orders", fetchOptions("POST", order))
}

export const deleteOrder = async (order) => {
	return await fetch(
		`http://localhost:8088/orders/${order.id}`,
		fetchOptions("DELETE")
	).then((res) => res.json())
}

export const getOrderById = async (orderId) => {
	return await fetch(`http://localhost:8088/orders/${orderId}`).then((res) =>
		res.json()
	)
}
