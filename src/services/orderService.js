import { fetchOptions } from "../helper"

export const getAllOrders = () => {
	return fetch(`http://localhost:8088/orders`).then((response) =>
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
