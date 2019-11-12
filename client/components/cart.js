import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteFromCart} from '../store/cart'
import {newOrderCreated} from '../store/order'
class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //get current cart
  componentDidMount() {
    this.props.fetchCart()
  }
  component
  //delete lineItem...not the product
  handleClick(itemId) {
    this.props.deleteFromCart(itemId)
  }
  //show order total
  handleSubmit(orderTotal) {
    this.props.newOrderCreated(orderTotal)
    this.props.history.push('/checkout')
  }
  handleReset = () => {
    const clearedQty = this.props.items.map(item => {
      item.quantity = 0
      return clearedQty
    })
  }
  render() {
    const cart = this.props.cart
    let total = 0
    console.log('props from cart:', this.props)
    return cart ? (
      <div>
        <h1>MY CART</h1>
        {cart.map((item, idx) => {
          item.itemtotal += item.product.price * item.itemQuantity
          return (
            <div key={idx} className="select">
              <img src={item.product.imageUrl} />
              <li className="cart-item">{item.product.name} </li>
              <div>Quantity: {item.itemQuantity}</div>
              <button
                type="submit"
                onClick={() => this.handleClick(item.product.id)}
                id="deleteFromCart"
              >
                DELETE FROM CART
              </button>
            </div>
          )
        })}
        <div className="subtotal">
          <div>SUBTOTAL: ${total}</div>
          <button
            type="submit"
            onClick={() => {
              this.handleSubmit(total)
              this.handleReset()
            }}
            id="goToCheckout"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    ) : (
      <div>CART EMPTY</div>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart.cart}
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: itemId => dispatch(deleteFromCart(itemId)),
  newOrderCreated: total => dispatch(newOrderCreated(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
