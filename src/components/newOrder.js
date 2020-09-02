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
                                type="text"
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
                                type="text"
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
    clearForm() {
        this.setState({
            carierCompany: ""
        })
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleCreateOrder= (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/orders`, this.state)
            .then(response => {
                this.handleReset();
                this.clearForm();
            })
            .catch(error => {
                console.log(error);
            })
    }
    handleReset() {
        this.props.handleClear(false)
    }
}

export default NewOrder;