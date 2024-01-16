export const getAllOrders = async () => {
	return fetch(`http://localhost:8088/orders?_embed=pizzas`).then((res) =>
		res.json()
	)
}
export const addNewOrder = async (order) => {
	return await fetch("http://localhost:8088/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order),
	})
}
