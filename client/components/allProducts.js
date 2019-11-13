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
    return (
      <div className="card-columns">
        {this.props.products.map(product => (
          <div className="card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="card-img-top" src={product.imageUrl} />
              <div className="card-body">
                <h5 className="card-title"> {product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <small className="text-muted">${product.price}</small>
                </p>
              </div>
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
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProductsThunk: () => dispatch(fetchProducts()),
  addToCart: item => dispatch(addingToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
