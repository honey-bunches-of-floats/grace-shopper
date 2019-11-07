import React from 'react'
import {connect} from 'react-redux'
import fetchCart from '../store/cart'
import Select from 'react-select'

const options = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
  {value: '7', label: '7'},
  {value: '8', label: '8'},
  {value: '9', label: '9'},
  {value: '10', label: '10'}
]

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: null
    }
  }
  render() {
    const {selectedOption} = this.state
    return (
      <div>
        <h1>MY CART</h1>
        {this.props.cart.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <h3>{item.name}</h3>
            <h3>
              Quantity: {item.quantity}
              <Select
                className="select"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
              <button type="button">UPDATE</button>
            </h3>
          </div>
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart)
})

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
