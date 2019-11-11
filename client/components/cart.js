import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteFromCart} from '../store/cart'
// import Select from 'react-select'
import {newOrderCreated} from '../store/order'

// const options = [
//   {value: '1', label: '1'},
//   {value: '2', label: '2'},
//   {value: '3', label: '3'},
//   {value: '4', label: '4'},
//   {value: '5', label: '5'},
//   {value: '6', label: '6'},
//   {value: '7', label: '7'},
//   {value: '8', label: '8'},
//   {value: '9', label: '9'},
//   {value: '10', label: '10'}
// ]

// class Cart extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       selectedOption: null
//     }
//     this.handleClick = this.handleClick.bind(this)
//   }
//   handleClick(evt) {
//     deleteFromCart(evt.target.id)
//   }
//   render() {
//     const {selectedOption} = this.state
//     return (
//       <div>
//         <h1>MY CART</h1>
//         {this.props.cart.map(item => (
//           <div key={item.id}>
//             <img src={item.imageUrl} />
//             <h3>{item.name}</h3>
//             <h3>
//               Quantity: {item.quantity}
//               <Select
//                 className="select"
//                 value={selectedOption}
//                 onChange={this.handleChange}
//                 options={options}
//               />
//               <button type="button">UPDATE</button>
//             </h3>
//             <h3>
//               <button type="button" onClick={this.handleClick}>
//                 DELETE FROM CART
//               </button>
//             </h3>
//           </div>
//         ))}
//       </div>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   deletefromCart: itemId => dispatch(deleteFromCart(itemId))
// })

// const mapStateToProps = state => ({
//   cart: state.cart,
//   user: state.user
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cart)

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
  handleSubmit(orderTotal) {
    this.props.newOrderCreated(orderTotal)
  }

  render() {
    const {cart} = this.props
    let total = 0
    return (
      <div>
        <h1>MY CART</h1>
        {cart.map(item => {
          total += item.price * item.quantity
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
        })}
        <div className="subtotal">
          <div>SUBTOTAL: ${total}</div>
          <button
            type="submit"
            onClick={() => this.handleSubmit(total)}
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
  cart: state.cart
  // user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: itemId => dispatch(deleteFromCart(itemId)),
  newOrderCreated: total => dispatch(newOrderCreated(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
