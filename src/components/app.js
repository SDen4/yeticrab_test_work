import React, {Component} from 'react';
import OrdersList from "./ordersList";
import Panel from "./panel";

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1 className="title">Logistics orders</h1>
                <div className="app__main">
                    <OrdersList />
                    <Panel />
                </div>
            </div>
        );
    }
};

export default App;