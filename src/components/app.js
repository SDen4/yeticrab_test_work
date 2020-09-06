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
        const newOrder = this.state.newOrder && 
            <NewOrder handleClear={this.handleClickNewOrder} createRefresh={() => this.createRefresh()}/>
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
                {newOrder}
                <div className={`${this.state.newOrder ? "app__panel_unactive" : "app__panel"}`}>
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
                            <div className="app__panel_filet-subtitle">Search orders</div>
                            <input
                                className="app__panel_filter_input"
                                type="text" name="filter"
                                placeholder="Enter search terms"
                                onChange={this.filter}
                                value={this.state.filterString}
                            ></input>
                            <button 
                                className="button__cross_delete button__reset_search"
                                onClick={this.clearSearchString}
                            ></button>
                            <div className="app__panel_filter_note">
                                *searching orders by company's name, phone number, date, time, code or by words in comments whis are not dispay in the list of orders
                            </div>
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
    }
    clearSearchString = () => {
        this.setState({
            filterString: ''
        });
    }
    totalOrders = (length) => {
        console.log("2: " + this.state.totalOrders);
        this.setState({
            totalOrders: length
        })
        console.log("3: " + this.state.totalOrders);
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