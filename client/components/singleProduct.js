import React from 'react'
import {connect} from 'react-redux'
import {fetchAProduct} from '../store/products'
import {addingToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.addToCart(this.props.item.id)
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.fetchAProduct(itemId)
  }

  render() {
    const item = this.props.item
    return (
      <div className="singleProduct">
        <img className="singleProductImage" src={item.imageUrl} />
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <h2>{item.price}</h2>
        <button onClick={this.handleSubmit} type="button" className="button">
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {item: state.products.selectedItem}
}

const mapDispatchToProps = dispatch => ({
  fetchAProduct: itemId => dispatch(fetchAProduct(itemId)),
  addToCart: item => dispatch(addingToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
