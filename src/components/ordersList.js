import React, {Component} from 'react';
import Order from "./order";
import orders from "../scripts/ordersFromServer";

class OrdersList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let ordersList = orders.map( item => {
            return <Order item={item} key={item.id} />
        })
        return (
            <div className="ordersList">
                <div className="ordersList__head">
                    <div className="order__wrapper">
                        <div className="order__number">Num</div>
                        <div className="order__date">Date</div>
                        <div className="order__company">Company</div>
                        <div className="order__name">Name</div>
                        <div className="order__phone">Phone</div>
                        <div className="order__code">ATI Code</div>
                    </div>
                </div>
                <ul className="ordersList__list">
                    {ordersList}
                </ul>
            </div>
        )
    }
}

export default OrdersList;