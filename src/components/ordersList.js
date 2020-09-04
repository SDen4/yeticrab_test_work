import React, {Component} from 'react';
import Order from "./order";

class OrdersList extends Component {
    state = {
        ordersListState: [],
        sortDirection: "desc"
    }
    componentDidMount() {
        this.getOrdersList();
    }
    render() {
        const ordersList = this.state.ordersListState;
        return (
            <div className="ordersList">
                <div className="ordersList__head">
                    <div className="order__wrapper orderList__wrapper_head">
                        <div 
                            className="orderList__iten orderList__number ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("orderNumber")}
                        >Num</div>
                        <div 
                            className="orderList__iten orderList__date ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("orderDate")}
                        >Date</div>
                        <div 
                            className="orderList__iten orderList__company ordersList__head_arrows" 
                            onClick={(e) => this.sortCompany("carierCompany")}
                        >Company</div>
                        <div 
                            className="orderList__iten orderList__name ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("carierName")}
                        >Name</div>
                        <div
                            className="orderList__iten orderList__phone ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("phone")}
                        >Phone</div>
                        <div
                            className="orderList__iten orderList__code ordersList__head_arrows"
                            onClick={(e) => this.sortCompany("code")}
                        >ATI Code</div>
                    </div>
                </div>
                <ul className="ordersList__list">
                    {ordersList.map(item => (
                        <Order
                            key={item.id}
                            item={item}
                        />
                    ))}
                </ul>
            </div>
        )
    }
    getOrdersList = async () => {
        let response = await fetch(`http://localhost:3000/orders`);
        let content = await response.json();
        this.setState({
            ordersListState: content
        });
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