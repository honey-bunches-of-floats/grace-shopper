import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

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
            <p> {product.name}</p>
            <img className="productImage" src={product.imageUrl} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('from mapStateToProps:', state)
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProductsThunk: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
