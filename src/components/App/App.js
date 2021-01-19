import React, { Component } from 'react';
import './App.css';
import {getOrders, postNewOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({
        orders: data.orders
      }))
      .catch(err => console.error('Error fetching:', err));
  }

  addToOrders = (order) => {
    postNewOrder(order)
      .then(this.setState({
        orders: [...this.state.orders, order]
      }))
  }

  removeFromOrders = (id) => {
    deleteOrder(id)
      .then(this.setState({
        orders: this.state.orders.filter(order => {
          return order.id !== id 
        })
      }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm 
            addToOrders={ this.addToOrders }
          />
        </header>

        <Orders 
          orders={this.state.orders}
          removeFromOrders={this.removeFromOrders}
        />
      </main>
    );
  }
}


export default App;
