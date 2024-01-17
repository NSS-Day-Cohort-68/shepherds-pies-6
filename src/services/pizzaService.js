import { fetchOptions } from "../helper"

export const getAllCheeses = async () => {
  return await fetch("http://localhost:8088/cheeses").then((res) => res.json())
}

export const getAllSizes = async () => {
  return await fetch("http://localhost:8088/sizes").then((res) => res.json())
}

export const getAllSauces = async () => {
  return await fetch("http://localhost:8088/sauces").then((res) => res.json())
}

export const getAllToppings = async () => {
  return await fetch("http://localhost:8088/toppings").then((res) => res.json())
}

export const getCurrentPizzaToppings = async (pizzaId) => {
  return await fetch(
    `http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`
  ).then((res) => res.json())
}

export const postPizza = async (pizzaObject) => {
  const postOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pizzaObject),
  }
  let res = await fetch("http://localhost:8088/pizzas", postOptions)
  let pizza = res.json()
  return pizza
}

export const postTopping = async (toppingChoice) => {
  const postOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(toppingChoice),
  }
  await fetch("http://localhost:8088/pizzaToppings", postOptions)
}

export const deleteTopping = async (toppingObject) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(toppingObject),
  }
  await fetch(
    `http://localhost:8088/pizzaToppings/${toppingObject.id}`,
    deleteOptions
  )
}
export const getAllPizzas = async () => {
  return await fetch(`http://localhost:8088/pizzas?_expand=sauce`).then((res) =>
    res.json()
  )
}

export const getAllPizzaDetails = async () => {
  return await fetch(
    `http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce&embed=pizzaToppings`
  ).then((res) => res.json())
}

export const getPizzasByOrderId = async (orderId) => {
	return await fetch(
		`http://localhost:8088/pizzas?orderId=${orderId}&_expand=size&_expand=cheese&_expand=sauce&_expand=order&_embed=pizzaToppings`
	).then((res) => res.json())
}

export const addNewPizza = (pizza, order) => {
  return fetch(`http://localhost:8088/pizzas/${order.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  })
}

export const getPizzaToppings = async (pizza) => {
  return await fetch(
    `http://localhost:8088/pizzaToppings?_expand=topping`
  ).then((res) => res.json())
}

export const deletePizza = async (pizza) => {
  return await fetch(
    `http://localhost:8088/pizzas/${pizza.id}`,
    fetchOptions("DELETE")
  ).then((res) => res.json())
}

export const deleteToppingsForPizza = async (pizza) => {
  return await fetch(
    `http://localhost:8088/pizzaToppings?pizzaId=${pizza.id}`,
    fetchOptions("DELETE")
  ).then((res) => res.json())
}
