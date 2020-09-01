import React, {Component} from 'react';

class Panel extends Component {
    render() {
        return (
            <div className="panel">
                <div className="panel__wrapper">
                    <button className="panel__add-order">Add new order</button>
                </div>
            </div>
        )
    }
}

export default Panel;