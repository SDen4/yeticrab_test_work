import React, {Component} from 'react';
import OrdersList from "./ordersList";
import NewOrder from "./newOrder";

class App extends Component {
    state = {
        newOrder: false
    }
    render() {
        return (
            <div className="app">
                <div className={`${this.state.newOrder && "app__left_unactive"} ${"app__left"}`}>
                    <h1 className="app__title">Logistics orders</h1>
                    <div className="app__main">
                        <OrdersList />
                    </div>
                </div>
                <NewOrder 
                    handleClickNewOrder={this.state.newOrder} 
                    handleClear={this.handleClickNewOrder}
                />
                <div className="app__panel">
                    <div className="app__panel_wrapper">
                        <button 
                            className="button button__submit"
                            onClick={this.handleClickNewOrder}
                        >Add new order</button>
                    </div>
                </div>
            </div>
        );
    }
    handleClickNewOrder = () => {
        this.setState({
            newOrder: !this.state.newOrder
        })
    }
};

export default App;