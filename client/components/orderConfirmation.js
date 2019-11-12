import React from 'react'
import {connect} from 'react-redux'

class OrderConfirmation extends React.Component {
  render() {
    console.log('user info', this.props.user)
    console.log('checkout', this.props.checkout)
    return (
      <div>
        <h1>
          Thanks for shopping, {this.props.user.email}. Your order is confirmed!
        </h1>
        {/* <h2>Order: #{props.order.id}</h2>
        <h2>Placed on {props.order.createdAt}</h2> */}
        <h2>A confirmation has been sent to {this.props.user.email}</h2>
        <div>
          <h1>Enjoy your new socks!</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  checkout: state.cart.checkout
})

export default connect(mapStateToProps)(OrderConfirmation)
