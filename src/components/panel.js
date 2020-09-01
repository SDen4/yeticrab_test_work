import React, {Component} from 'react';

class Panel extends Component {
    render() {
        return (
            <div className="panel">
                <div className="panel__wrapper">
                    <button className="button button__submit">Add new order</button>
                </div>
            </div>
        )
    }
}

export default Panel;