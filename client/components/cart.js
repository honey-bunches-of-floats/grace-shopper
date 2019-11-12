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
  component
  //delete lineItem...not the product
  handleClick(itemId) {
    this.props.deleteFromCart(itemId)
  }
  //show order total
  async handleSubmit() {
    await this.props.history.push('/checkout')
    // this.props.newOrderCreated(order)
  }

  render() {
    const cart = this.props.cart
    let total = 0
    console.log('cart:', this.props.cart)
    return !cart.length ? (
      <div>CART EMPTY</div>
    ) : (
      <div>
        <h1>MY CART</h1>
        {cart.map((item, idx) => {
          total += item.product.price * item.itemQuantity
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
