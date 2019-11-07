import React from 'react'
import {connect} from 'react-redux'
import {fetchAProduct} from '../store/products'
import Select from 'react-select'
import {addingToCart} from '../store/cart'
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

class SingleProduct extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   selectedOption: null
    // }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption })
  // }
  handleSubmit = event => {
    event.preventDefault()
    console.log('Button working!')
    this.props.addToCart(this.props.item.id)
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.fetchAProduct(itemId)
  }

  render() {
    // const { selectedOption } = this.state
    const item = this.props.item
    return (
      <div className="singleProduct">
        <img className="singleProductImage" src={item.imageUrl} />
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <h2>{item.price}</h2>
        {/* <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        /> */}
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
