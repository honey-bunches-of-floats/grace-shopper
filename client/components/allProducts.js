import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {addingToCart} from '../store/cart'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchProductsThunk()
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addToCart(event.target.value)
  }

  render() {
    console.log('props from allProducts component:', this.props.products) //state isn't being mapped to props
    return (
      <div>
        <p>Hello from All Products Component!</p>
        {this.props.products.map(product => (
          <div className="productCard" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="productImage" src={product.imageUrl} />
              <h3> {product.name}</h3>
              <p>${product.price}</p>
            </Link>
            <button
              onClick={this.handleSubmit}
              value={product.id}
              type="button"
              className="button"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('from mapStateToProps:', state)
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProductsThunk: () => dispatch(fetchProducts()),
  addToCart: item => dispatch(addingToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
