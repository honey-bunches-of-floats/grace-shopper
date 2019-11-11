import React from 'react'
import {newOrderCreated} from '../store/order'
import {connect} from 'react-redux'

class Checkout extends React.Component {
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

  async handleSubmit(event) {
    event.preventDefault()
    try {
      await this.props.newOrderCreated(this.state)
      return (
        <orderConfirmation
          order={this.props.newOrder}
          name={this.state.firstName}
          email={this.state.email}
        />
      )
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
        <div>
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
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order,
  newOrder: state.newOrder
})

const mapDispatchToProps = dispatch => ({
  newOrderCreated: order => dispatch(newOrderCreated(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
