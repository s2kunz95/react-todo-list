import React, { Component } from 'react';
import './App.css';

import check from './Images/check.svg';
import tick from './Images/tick.svg';

import TodoItem from './Components/TodoItem';
import RenderOption from './Components/RenderOption';

class App extends Component {
  constructor() {
    super();
    this.state = {
      itemsLeft: 0,
      checkAll: false,
      newItem: '',
      todoItems: [],
      renderList: [
        {title: 'All', actived: true},
        {title: 'Active', actived: false},
        {title: 'Completed', actived: false}
      ],
      filterStatus: 'All'
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  isClicked(item) {
    return (event) => {
      var { todoItems, checkAll, itemsLeft } = this.state;
      var index = todoItems.indexOf(item);
      if(!item.isComplete === true) {
        itemsLeft--;
      }
      else {
        itemsLeft++;
      }
      if(itemsLeft === 0) {
        checkAll = true;
      }
      else {
        checkAll = false;
      }
      this.setState({
        itemsLeft: itemsLeft,
        checkAll: checkAll,
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !item.isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    }
  }

  onKeyUp(event) {
    var { todoItems , itemsLeft, checkAll} = this.state;
    if (event.keyCode === 13) {
      if(itemsLeft > 0) {
        checkAll = false;
      }
      this.setState({
        itemsLeft: ++itemsLeft,
        newItem: '',
        checkAll: checkAll,
        todoItems: [
          {
            title: event.target.value,
            isComplete: false
          },
          ...todoItems
        ]
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  checkAll(event) {
    var { todoItems, checkAll } = this.state;
    this.setState({
      checkAll: !checkAll,
      todoItems: todoItems.map(function (item) {
        var updateItem = {
          title: item.title,
          isComplete: !checkAll
        }
        return updateItem;
      })
    });
  }

  changeRenderOption(item) {
    return((event) => {
      var {renderList} = this.state;
      let index = renderList.indexOf(item);
      var newArr = renderList.map((item) => {
        var newItem = {
          title: item.title,
          actived: false
        }
        return newItem;
      });
      this.setState({
        renderList: [
          ...newArr.slice(0, index),
          {
            ...item,
            actived: true
          },
          ...newArr.slice(index + 1)
        ],
        filterStatus: item.title
      })
    });
  }

  deleteItem(item) {
    return((event) => {
      var {todoItems, itemsLeft, checkAll} = this.state;
      todoItems.splice(todoItems.indexOf(item), 1);
      if(item.isComplete === false) {
        itemsLeft--;
      }
      if(itemsLeft === 0) {
        checkAll = true;
      }
      this.setState({
        itemsLeft: itemsLeft,
        checkAll: checkAll,
        todoItems: todoItems
      });
    });
  }

  clearCompleted() {
    var {todoItems} = this.state;
    for(let i = 0; i < todoItems.length; i++) {
      if(todoItems[i].isComplete === true) {
        todoItems.splice(todoItems.indexOf(todoItems[i]), 1);
        i--;
      }
    }
    this.setState({
      todoItems: todoItems
    });
  }

  render() {
    var { todoItems, newItem, itemsLeft, renderList, filterStatus } = this.state;
    var url = (this.state.checkAll === true) ? check : tick;
    if(filterStatus === 'Active') {
      todoItems = todoItems.filter((item) => item.isComplete === false);
    }
    else if(filterStatus === 'Completed') {
      todoItems = todoItems.filter((item) => item.isComplete === true);
    }
    if (todoItems) {
      return (
        <div className="container">
          <div className="header">
            <img src={url} alt="check all" width={32} height={100} onClick={this.checkAll} />
            <input
              type="text"
              value={newItem}
              placeholder="What needs to be done?"
              onKeyUp={this.onKeyUp}
              onChange={this.onChange} />
          </div>
          {
            todoItems.map((item, index) => <TodoItem key={index}
                                                     title={item}
                                                     onClick={this.isClicked(item)} 
                                                     remove={this.deleteItem(item)}/>)
          }
          <div className="footer">
            <div className="itemsLeft">{itemsLeft} items left</div>
            <div className="renderOption">
              {
                renderList.map((item, index) => <RenderOption key={index} item={item} onClick={this.changeRenderOption(item)}/>)
              }
            </div>
            <div onClick={this.clearCompleted} className="clear">Clear completed</div>
          </div>
        </div>
      );
    }
  }
}

export default App;
