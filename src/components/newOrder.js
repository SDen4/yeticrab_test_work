import React, {Component} from 'react';

class NewOrder extends Component {
    // constructor(props){
    //     super(props);
    //     this.handleReset = this.handleReset.bind(this);
    // }
    render() {
        const {handleClickNewOrder} = this.props;
        return (
            <div className={`${handleClickNewOrder && "newOrder_active"} ${"newOrder"}`}>
                <div className="newOrder__wrapper">
                    <h2 className="newOrder__title">Create new order</h2>
                    <form className="newOrder__form" encType="multipart/form-data">
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Carier company</div>
                            <input 
                                className="newOrder__input"
                                type="text"
                                placeholder="Enter the Carier company"
                                name="carierCompany"
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Name</div>
                            <input 
                                className="newOrder__input"
                                type="text"
                                placeholder="Enter the Name"
                                name="name"
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Phone</div>
                            <input 
                                className="newOrder__input"
                                type="text"
                                placeholder="Enter the Phone number"
                                name="phone"
                            ></input>
                        </label>
                        <label className="newOrder__label">
                            <div className="newOrder__subtitle">Comment</div>
                            <textarea 
                                className="newOrder__input"
                                placeholder="Enter your comment"
                                name="comment"
                            ></textarea>
                        </label>
                        <div className="newOrder__buttons">
                            <button 
                                type="submit" 
                                className="button button__submit"
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
    handleReset() {
        this.props.handleClear(false)
    }
}

export default NewOrder;