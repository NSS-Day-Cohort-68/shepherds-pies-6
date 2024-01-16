export const getAllToppings = async () => {
	return await fetch(`http://localhost:8088/toppings`).then((res) => res.json())
}

export const getPizzaToppingsByPizzaId = async (pizzaId) => {
	return await fetch(
		`http://locahost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`
	).then((res) => res.json())
}

export const getDetailedPizzaToppings = async () => {
	return await fetch(
		`http://localhost:8088/pizzaToppings?_expand=topping`
	).then((res) => res.json())
}
