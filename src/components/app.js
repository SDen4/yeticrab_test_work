import React, {Component} from 'react';
import OrdersList from "./ordersList";
import Panel from "./panel";
import NewOrder from "./newOrder";

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1 className="title">Logistics orders</h1>
                <div className="app__main">
                    <OrdersList />
                    <Panel />
                    <NewOrder />
                </div>
            </div>
        );
    }
};

export default App;