import React, {Component} from 'react'
import {createNewOrder} from '../store'
import {connect} from 'react-redux'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      billingAddress: '',
      shippingAddress: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      this.setState(createNewOrder(this.state))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      billingAddress,
      shippingAddress
    } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="firstName"
          value={firstName}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          onChange={this.handleChange}
          value={lastName}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          onChange={this.handleChange}
          value={email}
        />
        <label htmlFor="billingAddress">Billing Address:</label>
        <input
          type="text"
          name="billingAddress"
          onChange={this.handleChange}
          value={billingAddress}
        />
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          name="shippingAddress"
          onChange={this.handleChange}
          value={shippingAddress}
        />
        <button type="submit">Submit </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.newOrder
})

const mapDispatchToProps = dispatch => ({
  createNewOrder: order => dispatch(createNewOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
