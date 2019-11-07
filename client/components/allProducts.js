import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProductsThunk()
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
              <button type="button" className="button">
                Add To Cart
              </button>
            </Link>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchProductsThunk: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
