import { deleteOrder } from "../../services/orderService"

export const Order = ({ order, getAndSetOrders }) => {
  const deleteClick = async () => {
    await deleteOrder(order)
    getAndSetOrders()
  }

  return (
    <div className="order">
      <div className="order-block" key={order.id}>
        <div className="order-info">
          <div className="order-title">Order #{order.id}</div>
          <div className="date">Date: {order.timestamp}</div>
        </div>
        <i className="delete-btn fa-solid fa-trash" onClick={deleteClick}></i>
      </div>
    </div>
  )
}
