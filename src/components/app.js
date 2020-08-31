import React, {Component} from 'react';
import OrdersList from "./ordersList";

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1 className="title">Logistics orders</h1>
                <OrdersList />
            </div>
        );
    }
};

export default App;