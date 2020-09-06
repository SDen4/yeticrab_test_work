import React, {Component} from 'react';
import axios from 'axios';
import EditedForm from "./editedForm";


class Order extends Component {
    state = {
        delete: false,
        deleteId: null,
        cardWath: false,
        editMode: false,
    }
    render() {
        const {item} = this.props;
        const editedForm = this.state.editMode && 
            <EditedForm 
                editedOrder={this.props.item}
                editId={this.state.deleteId}
                closeEditMode={this.closeEditMode}
                refreshCardInfo={this.refreshCardInfo}
            />
        return (
            <li className="order" >
                <div className="order__wrapper" onClick={this.handleCardWatch}>
                    <div className="order__number">{item.orderNumber}</div>
                    <div className="order__date">{item.orderDate}</div>
                    <div className="order__company">{item.carierCompany}</div>
                    <div className="order__name">{item.carierName}</div>
                    <div className="order__phone">{item.phone}</div>
                </div>
                <a
                    className="order__code order__ATI-link" 
                    href={`https://ati.su/firms/${item.code}/info`} 
                    target="_blanck"
                >{item.code}</a>
                <button 
                        className="button__cross_delete"
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
                            className="button__cross_delete button__cross_delete_cancel"
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
                        <div className={`${this.state.editMode ? "order__card_change_unit_unactive" : "order__card_change_unit"}`}>
                            <div className="order__card_item">
                                <div className="order__card_subtitle">Carier company:</div>
                                <div className="order__card_info">
                                    {item.carierCompany}
                                </div>
                            </div>
                            <div className="order__card_item">
                                <div className="order__card_subtitle">Name:</div>
                                <div className="order__card_info">
                                    {item.carierName}
                                </div>
                            </div>
                            <div className="order__card_item">
                                <div className="order__card_subtitle">Phone:</div>
                                <div className="order__card_info">
                                    {item.phone}
                                </div>
                            </div>
                            <div className="order__card_item">
                                <div className="order__card_subtitle">Comments:</div>
                                <div className="order__card_info">
                                    {item.comments}
                                </div>
                            </div>
                            <div className="order__card_item">
                                <div className="order__card_subtitle">ATI Code:</div>
                                <a 
                                    className="order__card_info"
                                    href={`https://ati.su/firms/${item.code}/info`} 
                                    target="_blanck"
                                >{item.code}</a>
                            </div>
                            <div className="order__card_buttons_wrapper">
                                <button
                                    className="button button__edit"
                                    onClick={(e) => this.editOrderButton(item)}
                                >Edit</button>
                            </div>
                        </div>
                        {editedForm}
                        <button
                            className="button button__reset"
                            onClick={this.handleCardWatch}
                        >Back</button>
                    </div>
                </div>
            </li>
        )
    }
    refreshCardInfo = () => {
        this.props.refreshCardInfo()
    }
    closeEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    editOrderButton(i) {
        console.log(i);
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
        this.props.refreshCloseModeWindow();
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