export const Order = ({ order, getAndSetOrders }) => {
  return (
    <div className="order">
      <div className="order-block" key={order.id}>
        <div className="order-title">Order #{order.id}</div>
        <div className="date">Date: {order.timestamp}</div>
      </div>
    </div>
  )
}
