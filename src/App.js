import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    const quan = product.quantity
    const alreadyExits = cartList.find(each => each.id === id)
    if (alreadyExits === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const {quantity} = cartList.find(each => each.id === id)
      console.log(quantity)
      const newQuantity = quantity + quan
      console.log(newQuantity)
      const newProduct = {...product, quantity: newQuantity}
      console.log(newProduct)
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: newQuantity}
          }
          return each
        }),
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === id)
    const {quantity} = item

    const newQuantity = quantity + 1

    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: newQuantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === id)
    const {quantity} = item
    if (quantity === 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(each => each.id !== id),
      }))
    } else {
      const newQuantity = quantity - 1

      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: newQuantity}
          }
          return each
        }),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
