import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class ItemCount extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {cart} = this.props
    let itemTotal = 0
    cart.map(item => {
      itemTotal += item.quantity
    })
    return <div>Cart | {itemTotal}</div>
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCount)
