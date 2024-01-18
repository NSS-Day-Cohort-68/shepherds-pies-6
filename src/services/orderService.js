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

export const getOrderById = async (orderId) => {
  return await fetch(
    `http://localhost:8088/orders/${orderId}`
  ).then((res) => res.json())
}

export const editOrder = async (order) => {
  return await fetch(`http://localhost:8088/orders/${order.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json())
}
