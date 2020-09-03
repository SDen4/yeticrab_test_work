import React, {Component} from 'react';
import axios from 'axios';

class Order extends Component {
    state = {
        delete: false,
        deleteId: null
    }
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
                    <a 
                        className="order__code order__ATI-link" 
                        href={`https://ati.su/firms/${item.code}/info`} 
                        target="_blanck"
                    >{item.code}</a>
                    <button 
                        className="order__delete"
                        onClick={(e) => this.deleteOrderWindow(item.id)}
                    ></button>
                </div>
                <div className={`${this.state.delete ? "order__delete_confirm" : "order__delete_confirm_unactive"}`}>
                    <div className="order__delete_confirm_window">
                        <div className="order__delete_confirm_text">Are you sure to delete the order #{item.orderNumber} ?</div>
                        <button 
                            className="button button__reset"
                            onClick={this.deleteOrder}
                        >Delete</button>
                        <button 
                            className="order__delete order__delete_confirm_cancel"
                            onClick={this.deleteOrderCancel}
                        ></button>
                    </div>
                </div>
            </li>
        )
    }
    deleteOrderCancel = () => {
        this.setState({
            delete: false,
            deleteId: null
        })
    }
    deleteOrderWindow(id) {
        this.setState({
            delete: true,
            deleteId: id
        })
    }
    deleteOrder = () => {
        axios.delete(`http://localhost:3000/orders/` + this.state.deleteId);
        this.setState({
            delete: false,
            deleteId: null
        });
        this.props.handleRefresh();
    }
}

export default Order;