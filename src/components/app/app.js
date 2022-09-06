import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ToDoList from "../todo-list";
import ItemStatusFilter from '../item-status-filter';
import Additem from "../additem";

import './app.css';

export default class App extends Component {

    maxId = 100;

    createTodoData = (label) =>{
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    state = {
        todoData:  [
            this.createTodoData('Drink coffee'),
            this.createTodoData('Make an Awesome app'),
            this.createTodoData('Have a lunch')
         ],
        text: '',
        filter: 'all'
    };

    deleteItem = (id) => {
        this.setState(({todoData})=> {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.splice(idx, 1);

            const newData = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

            return {
                todoData: newData
            }
        });
    };

    addItem = (text) =>{
        const newItem = this.createTodoData(text)

        this.setState(({todoData}) => {
            const newData = [...todoData, newItem]

            return {
                todoData:newData
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};
           return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];

    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) =>{
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) =>{
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onSearchPanel = (text) => {
        this.setState({
            text
        });
    };

    onFilter = (filter) => {
        this.setState({
            filter
        });
    };

    searchItem = (items, text) => {
        if (text.length === 0) {
            return items
        }
        return items.filter((el) => {
            return el.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        });
    }

    filterItems(items, filter) {
        if (filter === 'all'){
            return items;
        }
        else if (filter === 'active'){
            return items.filter((el) => !el.done);
        }
        else if (filter === 'done'){
            return items.filter((el) => el.done);
        }
        else {
            return items
        }
    }

    render() {

        const { todoData, text, filter } = this.state;
        const items = this.filterItems(this.searchItem(todoData, text), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
         return (
            <div className="todo-app">
              <AppHeader toDo={todoCount} done={doneCount} />
              <div className="top-panel d-flex">
                <SearchPanel onSearchPanel={this.onSearchPanel}/>
                <ItemStatusFilter filter={filter} onFilter={this.onFilter}/>
              </div>

              <ToDoList
                  todos={items}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone}/>
                <Additem onAdded={this.addItem}/>
            </div>

          );
    }
}