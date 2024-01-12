export const Order = ({ order, getAndSetOrders }) => {
  return (
    <div className="order" key={order.id}>
      <div className="order-block">
        <div className="order-title">Order #{order.id}</div>
        <div className="date">Date: {order.timestamp}</div>
      </div>
    </div>
  )
}
