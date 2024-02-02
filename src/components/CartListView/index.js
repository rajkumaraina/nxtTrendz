import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import TotalPrice from '../CartSummary'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          <TotalPrice />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
