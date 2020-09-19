import React, {Component} from 'react';
import axios from 'axios';

class EditedForm extends Component {
    state = {
        orderNumber: null,
        orderDate: '',
        orderTime: '',
        carierCompany: '',
        carierName: '',
        phone: '',
        comments: '',
        code: '',
        id: null
    }
    componentDidMount() {
        this.tempOrder()
    }
    render() {
        const { editedOrder,  editId } = this.props;
        return (
            <form
                className='editedForm__form'
                encType='multipart/form-data'
                method='POST'
                onSubmit={this.editOrder}
            >
                <label className='order__card_item newOrder__label editedForm_card_edit'>
                    <div className='order__card_subtitle'>Carier company:</div>
                    <input 
                        className='newOrder__input'
                        type='text'
                        placeholder='Enter the Carier company'
                        name='carierCompany'
                        value={this.state.carierCompany}
                        onChange={this.handleChangeNew}
                    ></input>
                </label>
                <label className='order__card_item newOrder__label editedForm_card_edit'>
                    <div className='order__card_subtitle'>Name:</div>
                    <input 
                        className='newOrder__input'
                        type='text'
                        placeholder='Enter the Name'
                        name='carierName'
                        value={this.state.carierName}
                        onChange={this.handleChangeNew}
                    ></input>
                </label>
                <label className='order__card_item newOrder__label editedForm_card_edit'>
                    <div className='order__card_subtitle'>Phone:</div>
                    <input 
                        className='newOrder__input'
                        type='number'
                        placeholder='Enter the Phone number'
                        name='phone'
                        value={this.state.phone}
                        onChange={this.handleChangeNew}
                    ></input>
                </label>
                <label className='order__card_item newOrder__label editedForm_card_edit'>
                    <div className='order__card_subtitle'>Comments:</div>
                    <textarea 
                        className='newOrder__input'
                        type='text'
                        placeholder='Enter your comment'
                        name='comments'
                        value={this.state.comments}
                        onChange={this.handleChangeNew}
                    ></textarea>
                </label>
                <label className='order__card_item newOrder__label editedForm_card_edit'>
                    <div className='order__card_subtitle'>ATI Code:</div>
                    <input 
                        className='newOrder__input'
                        type='number'
                        placeholder='Enter the ATI Code'
                        name='code'
                        value={this.state.code}
                        onChange={this.handleChangeNew}
                    ></input>
                </label>
                <button
                    className='button button__submit'
                    type='submit'
                >Save</button>
            </form>
        )
    }
    tempOrder = () => {
        this.setState({
            orderNumber: this.props.editedOrder.orderNumber,
            orderDate: this.props.editedOrder.orderDate,
            orderTime: this.props.editedOrder.orderTime,
            carierCompany: this.props.editedOrder.carierCompany,
            carierName: this.props.editedOrder.carierName,
            phone: this.props.editedOrder.phone,
            comments: this.props.editedOrder.comments,
            code: this.props.editedOrder.code,
            id: this.props.editedOrder.id
        });
    }
    handleChangeNew = (event) => {

        if(event.target.name === 'code') {
            this.setState({
                //max length of code: 5 figures
                [event.target.name]: event.target.value.slice(0, 5)
            })
        } else if (event.target.name === 'phone') {
            this.setState({
                //max length of code: 11 figures
                [event.target.name]: event.target.value.slice(0, 11)
            })
        } else if (event.target.name === 'carierName' || event.target.name === 'carierCompany') {
            this.setState({
                //max length of code: 25 symbols
                [event.target.name]: event.target.value.slice(0, 25)
            })
        } else (
            this.setState({
                [event.target.name]: event.target.value,
                orderNumber: this.props.editedOrder.orderNumber,
                orderDate: this.props.editedOrder.orderDate,
                orderTime: this.props.editedOrder.orderTime
            })
        )
    }
    editOrder = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:3000/orders/` + this.props.editId, this.state)
            .then(() => {
                this.props.closeEditMode();
                this.props.refreshCardInfo();
            })
    }
};

export default EditedForm;