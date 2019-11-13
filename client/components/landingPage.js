import React from 'react'

const Landing = () => {
  return (
    <div className="card bg-dark text-white">
      <img
        src="https://www.happysocks.com/media/wysiwyg/Grid-images/2019/FW19/Happy-holidays/ForHim_HappyHolidays_FrontPageGrid.jpg"
        className="card-img"
      />
      <div className="card-img-overlay">
        <h5 className="display-4">Welcome to the New York Sock Exchange</h5>
        <a
          href="/products"
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          Start Shopping
        </a>
      </div>
    </div>
  )
}

export default Landing
