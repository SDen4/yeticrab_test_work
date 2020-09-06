import React, {Component} from 'react';
import OrdersList from "./ordersList";
import NewOrder from "./newOrder";

class App extends Component {
    state = {
        newOrder: false,
        refresh: false,
        totalOrders: null,
        filterString: ""
    }
    componentDidMount() {
        this.totalOrders();
    }
    render() {
        return (
            <div className="app">
                <div className={`${this.state.newOrder && "app__left_unactive"} ${"app__left"}`}>
                    <h1 className="app__title">Logistics orders</h1>
                    <div className="app__main">
                        <OrdersList 
                            createRefresh={this.state.refresh}
                            createRefreshBack={this.createRefreshBack}
                            totalOrders={this.totalOrders}
                            refreshCloseModeWindow={this.createRefresh}
                            filterString={this.state.filterString}
                        />
                    </div>
                </div>
                <NewOrder 
                    handleClickNewOrder={this.state.newOrder} 
                    handleClear={this.handleClickNewOrder}
                    createRefresh={() => this.createRefresh()}
                />
                <div className="app__panel">
                    <div className="app__panel_wrapper">
                        <div className="app__panel_total_orders">
                            Total orders: {this.state.totalOrders}
                        </div>
                        <div className="app__panel_button">
                            <button 
                                className="button button__submit"
                                onClick={this.handleClickNewOrder}
                            >Add new order</button>
                        </div>
                        <div className="app__panel_filter">
                            <div className="app__panel_filet-subtitle">Search orders by company's name</div>
                            <input
                                className="app__panel_filter_input"
                                type="text" name="filter"
                                placeholder="Enter the company's name"
                                onChange={this.filter}
                                value={this.state.filterString}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    filter = (event) => {
        this.setState({
            filterString: event.target.value
        });
        // console.log(this.state.filterString)
    }
    totalOrders = (length) => {
        this.setState({
            totalOrders: length
        })
    }
    createRefreshBack = () => {
        this.setState({
            refresh: false
        })
    }
    createRefresh = () => {
        this.setState({
            refresh: true
        });
    }
    handleClickNewOrder = () => {
        this.setState({
            newOrder: !this.state.newOrder
        })
        this.totalOrders();
    }
};

export default App;