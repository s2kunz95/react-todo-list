import React, { Component } from 'react';
import classNames from 'classnames'

class RenderOption extends Component {
    render() {
        var {item, onClick} = this.props;
        return(
        <div onClick={onClick} className={classNames('filter',{'actived': item.actived === true})}>{item.title}</div>
        );
    }
}

export default RenderOption;