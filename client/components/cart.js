import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteFromCart, newOrderCreated} from '../store/cart'
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
  //delete lineItem...not the product
  handleClick(itemId) {
    this.props.deleteFromCart(itemId)
  }
  //show order total
  async handleSubmit() {
    await this.props.history.push('/checkout')
  }

  render() {
    const cart = this.props.cart
    let total = 0
    return !cart.length ? (
      <div>
        <h1>Your cart is empty</h1>
        <a
          href="/products"
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          Start Shopping
        </a>
      </div>
    ) : (
      <div>
        <h1>SHOPPING CART</h1>
        {cart.map(item => {
          total += item.product.price * item.itemQuantity
          return (
            <div key={item.id} className="select">
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
              this.handleSubmit(cart)
            }}
            id="goToCheckout"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
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
