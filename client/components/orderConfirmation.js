import React from 'react'

export const OrderConfirmation = props => {
  return (
    <div>
      <h1>Thanks for shopping, {props.user.name}. Your order is confirmed!</h1>
      <h2>Order: #{props.order.id}</h2>
      <h2>Placed on {props.order.createdAt}</h2>
      <h2>A confirmation has been sent to {props.user.email}</h2>
      <div>
        <h1>Enjoy your new socks!</h1>
      </div>
    </div>
  )
}
