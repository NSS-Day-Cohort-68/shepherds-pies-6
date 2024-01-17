import { Link } from "react-router-dom"
import { deleteOrder, getSpecificOrder } from "../../services/orderService"

export const Order = ({ order, getAndSetOrders }) => {
  const deleteClick = async () => {
    await deleteOrder(order)
    getAndSetOrders()
  }

  return (
    <div className="order">
      <div className="order-block" key={order.id}>
        <div className="order-info">
          <Link to={`/allOrders/${order.id}`}>
            <div className="order-title">Order #{order.id}</div>
          </Link>
          <div className="date">Date: {order.timestamp}</div>
        </div>
        <div className="btns">
          <i className="delete-btn fa-solid fa-trash" onClick={deleteClick}></i>
        </div>
      </div>
    </div>
  )
}
