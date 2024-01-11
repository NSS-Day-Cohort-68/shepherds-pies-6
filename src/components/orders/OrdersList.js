import { useEffect, useState } from "react"
import { getAllOrders } from "../../ServicesDirectory/orderService"
import { Order } from "./Order"
import "./Orders.css"

export const OrderList = () => {
  const [allOrders, setAllOrders] = useState([])

  const getAndSetOrders = () => {
    getAllOrders().then((ordersArray) => {
      setAllOrders(ordersArray)
    })
  }

  useEffect(() => {
    getAndSetOrders()
  }, []) // ONLY runs on intial render of component

  return (
    <article className="orders">
      {allOrders.map((orderObj) => {
        return <Order order={orderObj} getAndSetOrders={getAndSetOrders} />
      })}
    </article>
  )
}
