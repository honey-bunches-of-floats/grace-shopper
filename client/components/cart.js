import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteFromCart} from '../store/cart'
import {fetchProducts} from '../store/products'
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
    this.props.fetchProducts()
  }

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
    console.log('products:', this.props.products)
    // const cart = this.props.products.filter(item => {
    //   return this.props.cart.cart.includes(item.id)
    // })
    console.log('cart from cart component', this.props.cart)
    let total = 0
    return (
      <div>
        <h1>MY CART</h1>
        {/* {cart.map(item => {
          total += item.price * item.quantity
          console.log('product from map', item)
          return (
            <div key={item.id} className="select">
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
        })} */}
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
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  products: state.products.allProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: itemId => dispatch(deleteFromCart(itemId)),
  newOrderCreated: total => dispatch(newOrderCreated(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
