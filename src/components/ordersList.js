import React, {Component} from 'react';
import Order from "./order";

class OrdersList extends Component {
    state = {
        ordersListState: [],
        sortDirection: "desc"
    }
    componentDidUpdate() {
        if (this.props.createRefresh) {
            this.getOrdersList();
            this.props.createRefreshBack();
            // console.log("!!!" + this.state.ordersListState.length);
            // this.props.totalOrders(this.state.ordersListState.length);
        };
    }
    componentDidMount() {
        this.getOrdersList();
    }
    render() {
        const ordersList = this.state.ordersListState;
        const { createRefresh, filterString } = this.props;
        return (
            <div className="ordersList">
                <div className="ordersList__head">
                    <div className="order__wrapper orderList__wrapper_head">
                        <div 
                            className="orderList__item orderList__number ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("orderNumber", "orderList__number")}
                        >Num</div>
                        <div 
                            className="orderList__item orderList__date ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("orderDate")}
                        >Date</div>
                        <div 
                            className="orderList__item orderList__company ordersList__head_arrows" 
                            onClick={(e) => this.sortCompany("carierCompany")}
                        >Company</div>
                        <div 
                            className="orderList__item orderList__name ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("carierName")}
                        >Name</div>
                        <div
                            className="orderList__item orderList__phone ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("phone")}
                        >Phone</div>
                        <div
                            className="orderList__item orderList__code ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("code")}
                        >ATI Code</div>
                    </div>
                </div>
                <ul className="ordersList__list">
                    {ordersList
                        // search in orders //
                        .filter(order => {
                                let alltext = (order.orderNumber + 
                                    " " + order.orderDate + 
                                    " " + order.orderTime + 
                                    " " + order.carierCompany + 
                                    " " + order.carierName + 
                                    " " + order.phone + 
                                    " " + order.comments).toLowerCase();
                                console.log(alltext);
                                let searchStrLowerCase = this.props.filterString.toLowerCase();
                                return alltext.includes(searchStrLowerCase);
                        }).map(item => (
                            <Order
                                key={item.id}
                                item={item}
                                deleteRefreshList={() => this.deleteRefreshList(item.id)}
                                refreshCloseModeWindow={this.refreshCloseModeWindow}
                                refreshCardInfo={this.refreshCardInfo}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
    refreshCardInfo = () => {
        this.getOrdersList();
    }
    refreshCloseModeWindow = () => {
        this.props.refreshCloseModeWindow();
    }
    deleteRefreshList = (id) => {
        const newOrderList = this.state.ordersListState.filter(order => order.id !== id)
        this.setState({
            ordersListState: newOrderList
        });
        console.log("1: " + this.state.ordersListState.length);

        this.props.totalOrders(this.state.ordersListState.length-1);
    }
    getOrdersList = async () => {
        let response = await fetch(`http://localhost:3000/orders`);
        let content = await response.json();
        this.setState({
            ordersListState: content
        });
        console.log(this.state.ordersListState.length);
        this.props.totalOrders(this.state.ordersListState.length);//??
    }
    sortCompany = async (field) => {
        if(this.state.sortDirection === "asc") {
            this.setState({
                sortDirection: "desc"
            });
        } else {
            this.setState({
                sortDirection: "asc"
            });
        };
        let sort = await fetch(`http://localhost:3000/orders?_sort=${field},views&_order=` + this.state.sortDirection);
        let sortContent = await sort.json();

        this.setState({
            ordersListState: sortContent
        });
    }
}

export default OrdersList;