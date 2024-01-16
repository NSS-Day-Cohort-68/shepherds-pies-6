export const getCurrentPizzaToppings = async (pizzaId) => {
	return await fetch(
		`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`
	).then((res) => res.json())
}

export const getPizzasByOrderId = async (orderId) => {
	return await fetch(
		`http://localhost:8088/pizzas?orderId=${orderId}&_expand=size&_expand=cheese&_expand=sauce&_expand=order&_embed=pizzaToppings`
	).then((res) => res.json())
}
