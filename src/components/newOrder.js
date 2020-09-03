import React, {Component} from 'react';
import axios from 'axios';

class NewOrder extends Component {
    state = {
        orderNumber: null,
        orderDate: "",
        orderTime: "",
        carierCompany: "",
        carierName: "",
        phone: "",
        comments: "",
        code: ""
    }
    componentDidMount() {
        this.handleDateAndTime(); //generator current date & time for new order
        this.handleOrderNumber(); //generator new order number
    }
    render() {
        const {handleClickNewOrder} = this.props;
        const {orderNumber, orderDate, orderTime, carierCompany, carierName, phone, code, comments} = this.state;
        return (
            <div className={`${handleClickNewOrder && "newOrder_active"} ${"newOrder"}`}>
                <div className="newOrder__wrapper">
                    <h2 className="newOrder__title">Create new order</h2>
                    <form 
                        className="newOrder__form"  
                        encType="multipart/form-data" 
                        method="POST"
                        onSubmit={this.handleCreateOrder}
                    >
                        <div className="newOrder__label newOrder__label_auto-info">
                            <div className="newOrder__subtitle_auto-info">Order number:</div>
                            <div>{this.state.orderNumber}</div>
                        </div>
                        <div className="newOrder__label newOrder__label_auto-info">
                            <div className="newOrder__subtitle_auto-info">Order date:</div>
                            <div>{this.state.orderDate}</div>
                        </div>
                        <div className="newOrder__label newOrder__label_auto-info">
                            <div className="newOrder__subtitle_auto-info">Order time:</div>
                            <div>{this.state.orderTime}</div>
                        </div>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Carier company</div>
                            <input 
                                className="newOrder__input"
                                type="text"
                                placeholder="Enter the Carier company"
                                name="carierCompany"
                                value={carierCompany}
                                onChange={this.handleChange} 
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Name</div>
                            <input 
                                className="newOrder__input"
                                type="text"
                                placeholder="Enter the Name"
                                name="carierName"
                                value={carierName}
                                onChange={this.handleChange} 
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Phone</div>
                            <input 
                                className="newOrder__input"
                                type="number"
                                placeholder="Enter the Phone number"
                                name="phone"
                                value={phone}
                                onChange={this.handleChange} 
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">ATI Code</div>
                            <input 
                                className="newOrder__input"
                                type="number"
                                placeholder="Enter the ATI Code"
                                name="code"
                                value={code}
                                onChange={this.handleChange} 
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Comment</div>
                            <textarea 
                                className="newOrder__input"
                                placeholder="Enter your comment"
                                name="comments"
                                value={comments}
                                onChange={this.handleChange} 
                            ></textarea>
                        </label>
                        <div className="newOrder__buttons">
                            <button 
                                type="submit" 
                                className="button button__submit"
                                onClick={this.handleCreateOrder}
                            >Save</button>
                            <button 
                                type="reset" 
                                className="button button__reset"
                                onClick={() => {this.handleReset()}}
                            >Reset</button>
                        </div>
                    </form>
               </div>
            </div>
        )
    }
    handleOrderNumber() {
        axios.get(`http://localhost:3000/orders`)
            .then( response => {
                let newOrderNum = response.data[response.data.length - 1].orderNumber + 1;
                this.setState({
                    orderNumber: newOrderNum
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleDateAndTime() {
        let current = new Date();

        let year = current.getFullYear();
        let month = current.getMonth() + 1;
        let day = current.getDate();
        let hours = current.getHours();
        let min = current.getMinutes();

        //add '0' if digit is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        min = min < 10 ? '0' + min : min;

        let totalDate = day + '.' + month + '.' + year;
        let totalTime = hours + ':' + min;
        
        this.setState({
            orderDate: totalDate,
            orderTime: totalTime
        })
    }
    clearForm() {
        this.setState({
            orderNumber: null,
            orderDate: "",
            orderTime: "",
            carierCompany: "",
            carierName: "",
            phone: "",
            comments: "",
            code: ""
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        //recording current time & data
        this.handleDateAndTime();
        //recording new order number
        this.handleOrderNumber();
    }
    handleCreateOrder= (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/orders`, this.state)
            .then( () => {
                this.handleReset();
                this.clearForm();
            })
            .catch(error => {
                console.log(error);
            })
    }
    handleReset() {
        this.props.handleClear(false);
        this.clearForm();
    }
}

export default NewOrder;