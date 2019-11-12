import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteFromCart} from '../store/cart'
class GuestCart extends React.Component {
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
  }

  render() {
    const cart = this.props.cart
    let total = 0
    return cart.length ? (
      <div>
        <h1>MY CART</h1>
        {cart.map((item, idx) => {
          total += Number(item.price)
          return (
            <div key={idx} className="select">
              <img src={item.imageUrl} />
              <li className="cart-item">{item.name} </li>
              <div>Quantity: {item.quantity}</div>
              <button
                type="submit"
                onClick={() => this.handleClick(item.id)}
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
              this.handleSubmit()
            }}
            id="goToCheckout"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    ) : (
      <div>GUEST CART EMPTY</div>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart.cart}
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: itemId => dispatch(deleteFromCart(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
