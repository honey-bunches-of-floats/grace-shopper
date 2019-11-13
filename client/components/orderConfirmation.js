import React from 'react'
import {connect} from 'react-redux'

class OrderConfirmation extends React.Component {
  render() {
    return this.props.user.id ? (
      <div>
        <h1>
          Thanks for shopping, {this.props.user.email}. Your order is confirmed!
        </h1>
        <h2>Order: #{this.props.checkout.id}</h2>
        <h2>Placed on {this.props.checkout.createdAt}</h2>
        <h2>A confirmation has been sent to {this.props.user.email}</h2>
        <div>
          <h1>Enjoy your new socks!</h1>
        </div>
      </div>
    ) : (
      <div>
        <h1>Thanks for shopping. Your order is confirmed!</h1>
        <h2>Order: #{this.props.checkout.id}</h2>
        <h2>Placed on {this.props.checkout.createdAt}</h2>
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
