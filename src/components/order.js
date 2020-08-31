import React, {Component} from 'react';

class Order extends Component {
    render() {
        const {item} = this.props;
        return (
            <li className="order">
                <div className="order__wrapper">
                    <div className="order__number">{item.orderNumber}</div>
                    <div className="order__date">{item.orderDate}</div>
                    <div className="order__company">{item.carierCompany}</div>
                    <div className="order__name">{item.carierName}</div>
                    <div className="order__phone">{item.phone}</div>
                    <a className="order__code order__ATI-link" href={`https://ati.su/firms/${item.code}/info`} target="_blanck">{item.code}</a>
                </div>
            </li>
        )
    }
}

export default Order;