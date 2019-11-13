import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <div>
          <h1 className="navbar-brand" href="#">
            NYSE
          </h1>
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {isLoggedIn ? (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <h6>Home</h6>
            </Link>
            <Link to="/cart">
              <h6>Cart</h6>
            </Link>
            <Link to="/products">
              <h6>All Products</h6>
            </Link>
            <a href="#" onClick={handleClick}>
              <h6>Logout</h6>
            </a>
          </div>
        </div>
      ) : (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {/* The navbar will show these links before you log in */}
          <div className="navbar-nav">
            <Link to="/login">
              <h6>Login</h6>
            </Link>
            <Link to="/signup">
              <h6>Sign Up</h6>
            </Link>
            <Link to="/guestcart">
              <h6>Cart</h6>
            </Link>
            <Link to="/products">
              <h6>All Products</h6>
            </Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
