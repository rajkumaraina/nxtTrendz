import './index.css'

import CartContext from '../../context/CartContext'

const TotalPrice = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length
      const amount = cartList.map(each => {
        const price = each.price * each.quantity
        return price
      })
      const finalAmount = amount.reduce((acc, currentVal) => acc + currentVal)
      return (
        <div className="TotalPriceContainer">
          <div className="TotalPriceInsideContainer">
            <h1 className="totalpriceHeading">
              Order Total:
              <span className="spanElement"> Rs {finalAmount}/-</span>
            </h1>
            <p className="totalPricePara">{count} Items in Cart</p>
            <button className="checkoutButton" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default TotalPrice
