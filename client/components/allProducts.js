import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProductsThunk()
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('Button working!')
    console.log('item', event.target.value)
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
              value={product}
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
  addToCart: item => dispatch(addToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
