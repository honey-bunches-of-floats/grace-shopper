import React from 'react'
import {connect} from 'react-redux'
import {getOrderHistory} from '../store/order'
import {Link} from 'react-router-dom'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrderHistory()
  }

  render() {
    const orders = this.props.orders
    return !orders.length ? (
      <div>NO ORDERS YET</div>
    ) : (
      <div>
        <h1>Your Past Orders:</h1>
        {orders.map(order => {
          return (
            <Link to={`/orderHistory/${order.id}`} key={order.id}>
              <h4>
                Order # {order.id}. Placed on {order.updatedAt}
              </h4>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orderHistory
})

const mapDispatchToProps = dispatch => ({
  getOrderHistory: () => dispatch(getOrderHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
