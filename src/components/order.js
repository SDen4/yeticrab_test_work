import React, {Component} from 'react';
import axios from 'axios';

class Order extends Component {
    state = {
        delete: false,
        deleteId: null,
        cardWath: false,
        editMode: false,
        editedOrder: {
            orderNumber: null,
            orderDate: "",
            orderTime: "",
            carierCompany: "",
            carierName: "",
            phone: "",
            comments: "",
            code: "",
            id: null
        }
    }
    componentDidMount() {
        this.tempOrder()
    }
    render() {
        const {item} = this.props;
        return (
            <li className="order" >
                <div className="order__wrapper" onClick={this.handleCardWatch}>
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
                </div>
                <button 
                        className="order__delete"
                        onClick={(e) => this.deleteOrderWindow(item.id)}
                ></button>
                <div className={`${this.state.delete ? "order__delete_confirm" : "order__delete_confirm_unactive"}`}>
                    <div className="order__delete_confirm_window">
                        <div className="order__delete_confirm_text">
                            Are you sure to delete the order #{item.orderNumber} ?
                        </div>
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
                <div className={`${!this.state.cardWath ? "order__card_unactive" : "order__card"}`}>
                    <div className="order__card_wrapper">
                        <h2 className="newOrder__title">Order #{item.orderNumber}</h2>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Order date:</div>
                            <div className="order__card_info">
                                {item.orderDate}
                            </div>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Order time:</div>
                            <div className="order__card_info">
                                {item.orderTime}
                            </div>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Carier company:</div>
                            <div className={`${this.state.editMode ? "order__card_info_unactive" : "order__card_info"}`}>
                                {/* {this.state.editedOrder.carierCompany} */}
                                {item.carierCompany}
                            </div>
                            <label className={`${!this.state.editMode ? "newOrder__label_unactive" : "newOrder__label newOrder__label_card_edit"}`}>
                                <input 
                                    className="newOrder__input"
                                    type="text"
                                    placeholder="Enter the Carier company"
                                    name="carierCompany"
                                    value={this.state.editedOrder.carierCompany}
                                    onChange={this.handleChange}
                                ></input>
                            </label>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Name:</div>
                            <div className={`${this.state.editMode ? "order__card_info_unactive" : "order__card_info"}`}>
                                {/* {this.state.editedOrder.carierName} */}
                                {item.carierName}
                            </div>
                            <label className={`${!this.state.editMode ? "newOrder__label_unactive" : "newOrder__label newOrder__label_card_edit"}`}>
                                <input 
                                    className="newOrder__input"
                                    type="text"
                                    placeholder="Enter the Name"
                                    name="carierName"
                                    value={this.state.editedOrder.carierName}
                                    onChange={this.handleChange}
                                ></input>
                            </label>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Phone:</div>
                            <div className={`${this.state.editMode ? "order__card_info_unactive" : "order__card_info"}`}>
                                {/* {this.state.editedOrder.phone} */}
                                {item.phone}
                            </div>
                            <label className={`${!this.state.editMode ? "newOrder__label_unactive" : "newOrder__label newOrder__label_card_edit"}`}>
                                <input 
                                    className="newOrder__input"
                                    type="text"
                                    placeholder="Enter the Phone number"
                                    name="phone"
                                    value={this.state.editedOrder.phone}
                                    onChange={this.handleChange}
                                ></input>
                            </label>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">Comments:</div>
                            <div className={`${this.state.editMode ? "order__card_info_unactive" : "order__card_info"}`}>
                                {/* {this.state.editedOrder.comments} */}
                                {item.comments}
                            </div>
                            <label className={`${!this.state.editMode ? "newOrder__label_unactive" : "newOrder__label newOrder__label_card_edit"}`}>
                                <textarea 
                                    className="newOrder__input"
                                    type="text"
                                    placeholder="Enter your comment"
                                    name="comments"
                                    value={this.state.editedOrder.comments}
                                    onChange={this.handleChange}
                                ></textarea>
                            </label>
                        </div>
                        <div className="order__card_item">
                            <div className="order__card_subtitle">ATI Code:</div>
                            <a 
                                className={`${this.state.editMode ? "order__card_info_unactive" : "order__card_info"}`}
                                href={`https://ati.su/firms/${item.code}/info`} 
                                target="_blanck"
                            // >{this.state.editedOrder.code}</a>
                            >{item.code}</a>
                            <label className={`${!this.state.editMode ? "newOrder__label_unactive" : "newOrder__label newOrder__label_card_edit"}`}>
                                <input 
                                    className="newOrder__input"
                                    type="text"
                                    placeholder="Enter the ATI Code"
                                    name="code"
                                    value={this.state.editedOrder.code}
                                    onChange={this.handleChange}
                                ></input>
                            </label>
                        </div>
                        <div className="order__card_buttons_wrapper">
                            <button
                                className="button button__reset"
                                onClick={this.handleCardWatch}
                            >Back</button>
                            <button
                                className={`${this.state.editMode ? "button__unactive" : "button button__edit"}`}
                                onClick={(e) => this.editOrderButton(item)}
                            >Edit</button>
                            <button
                                className={`${!this.state.editMode ? "button__unactive" : "button button__submit"}`}
                                onClick={this.editOrder}
                            >Save</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
    tempOrder = () => {
        this.setState({
            editedOrder: {
                ...this.state.editedOrder,
                    orderNumber: this.props.item.orderNumber,
                    orderDate: this.props.item.orderDate,
                    orderTime: this.props.item.orderTime,
                    carierCompany: this.props.item.carierCompany,
                    carierName: this.props.item.carierName,
                    phone: this.props.item.phone,
                    comments: this.props.item.comments,
                    code: this.props.item.code,
                    id: this.props.item.id
            },
        });
    }
    handleChange = (event) => {
        this.setState({
            editedOrder: {[event.target.name]: event.target.value}
        });
        console.log(this.state.editedOrder);
    }
    editOrder = (event) => {
        event.preventDefault();

        console.log(this.state.deleteId);
        console.log(this.state.comments);
        axios.patch(`http://localhost:3000/orders/` + this.state.deleteId, this.state.editedOrder)
            .then( () => {
                this.setState({
                    editMode: false
                });
                // this.tempOrder();
            })
            .catch(error => {
                console.log(error);
            });
    }
    editOrderButton(i) {
        console.log(i);
        console.log(this.state.editedOrder);
        this.setState({
            editMode: true,
            deleteId: i.id
        })
        console.log(this.deleteId);
        console.log(this.editMode);
    }
    handleCardWatch = () => {
        this.setState({
            cardWath: !this.state.cardWath,
            editMode: false
        })
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

        this.props.deleteRefreshList(this.state.deleteId);

        this.setState({
            delete: false,
            deleteId: null
        });
    }
}

export default Order;