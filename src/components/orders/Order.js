export const Order = ({ order, getAndSetOrders }) => {
  return (
    <div className="order">
      <div className="order-block" key={order.id}>
        <div className="order-title-block">
          <div className="order-title">Order #</div>
          <div>{order.id}</div>
        </div>
        <div className="date-block">
          <div className="date">Date:</div>
          <div>{order.timestamp}</div>
        </div>
      </div>
    </div>
  )
}
