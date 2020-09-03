import React, {Component} from 'react';
import Order from "./order";

class OrdersList extends Component {
    state = {
        ordersListState: []
    }
    componentDidMount() {
        this.getOrdersList();
    }
    render() {
        const ordersList = this.state.ordersListState;
        return (
            <div className="ordersList">
                <div className="ordersList__head">
                    <div className="order__wrapper">
                        <div className="order__number">Num</div>
                        <div className="order__date">Date</div>
                        <div className="order__company">Company</div>
                        <div className="order__name">Name</div>
                        <div className="order__phone">Phone</div>
                        <div className="order__code ordersList__code">ATI Code</div>
                    </div>
                </div>
                <ul className="ordersList__list">
                    {ordersList.map(item => (
                        <Order
                            key={item.id}
                            item={item}
                            handleRefresh={this.getOrdersList}
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
}

export default OrdersList;