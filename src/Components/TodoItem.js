import React, { Component } from 'react';
import classNames from 'classnames';
import check from '../Images/check.svg';
import uncheck from '../Images/uncheck.svg';
import close from '../Images/close.svg';

class TodoItem extends Component {
    render() {
        var url = uncheck;
        var {title, onClick, remove} = this.props;
        if(title.isComplete === true) {
            url = check;
        }
        return(
            <div className={classNames('todoItem', {
                'completed': title.isComplete === true
            })}>
                <img onClick={onClick} src={url} alt="check box" width={48}/>
                <p>{title.title}</p>
                <img onClick={remove} className="deleteItem" src={close} alt="delete item" width={20}/>
            </div>
        );
    }
}

export default TodoItem;