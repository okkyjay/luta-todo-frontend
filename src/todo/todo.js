import { Component } from "react";
import axios from "axios";
import Api from "../Util";

class Todo extends Component{

    constructor(props){
        super(props)
        this.addNewTodo = this.addNewTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)

        this.state = {
            message:'',
            tab: 'new',
            user:'',
            token: '',
            submitting:false,
            title: '',
            description:'',
            progress: 0,
            completed: false,
            todoId:'',
            todos: [],
            erorrs: {
                title: []
            }
        }
    }
    componentDidMount(){
        this.listTodo()
    }
    // add new todo
    addNewTodo (e){
        e.preventDefault()

        const errors = this.state.erorrs
        const title = this.state.title
        const description = this.state.description
        const progress = this.state.progress
        const completed = this.state.completed

        if(typeof title === 'string' && title === null || title === ''){
            errors.title.push("Please fill the title feild")
        }

        if(typeof description === 'string' && description === null || description === ''){
            errors.description.push("Please fill the description feild")
        }

        const token = localStorage.getItem('token')

        const headers = {
            'Content-Type': 'application/json', // Example content type
            'Authorization': `Bearer ${token}`, // Example authorization token
          };

          const instance = axios.create({
            headers: headers,
          })
          const url = 'http://localhost:8023/api/todos'
          
          instance.post(url, {
            title,
            description,
            progress,
            completed
          }).then((res) => {
            const data = res.data.data
          })
    }
    // update todo
    async updateTodo (e) {
        e.preventDefault()

        const errors = this.state.erorrs
        const title = this.state.title
        const description = this.state.description
        const progress = this.state.progress
        const completed = this.state.completed

        if(typeof title === 'string' && title === null || title === ''){
            errors.title.push("Please fill the title feild")
        }

        if(typeof description === 'string' && description === null || description === ''){
            errors.description.push("Please fill the description feild")
        }

        const url = `http://localhost:8023/api/todos/${this.state.todoId}`

        const data = {
            title,
            description,
            progress,
            completed
          }
        const res = await Api.apiCall(url, data, 'put', true)
        console.log(res)
    }
    // fetch all todos created
    async listTodo (){
        const url = 'http://localhost:8023/api/todos'
        const token = localStorage.getItem('token')

        const headers = {
            'Content-Type': 'application/json', // Example content type
            'Authorization': `Bearer ${token}`, // Example authorization token
          };

          const instance = axios.create({
            headers: headers,
          })
          const res = await instance.get(url)
          this.setState({todos:res.data.todos})
    }
    // deletes todo
    async deleteTodo(id){
        const url = `http://localhost:8023/api/todos/${id}`
        const token = localStorage.getItem('token')

        const headers = {
            'Content-Type': 'application/json', // Example content type
            'Authorization': `Bearer ${token}`, // Example authorization token
          };

          const instance = axios.create({
            headers: headers,
          })
          const res = await instance.delete(url) 
          this.listTodo()  
    }

    render(){
        return(
            <div className="container">
                {this.state.tab === 'new'?(
                    <form onSubmit={this.addNewTodo}>
                    <div className="field">
                        <input onChange={(e) => this.setState({title:e.target.value})} value={this.state.title} type="text" placeholder="Todo title" />
                    </div>
                    <div className="field">
                        <textarea onChange={(e) => this.setState({description:e.target.value})} value={this.state.description} placeholder="Todo Description" />
                    </div>
                    <div className="field">
                        <input onChange={(e) => this.setState({progress:e.target.value})} value={this.state.progress} type="text" min={0} max={100} />
                    </div>
                    <div className="field">
                        <input checked={this.state.completed} onChange={(e) => this.setState({completed:!this.state.completed})} value={this.state.completed} type="checkbox" placeholder="" />
                    </div>
                    <button>Submit</button>
                </form>
                ):(
                    <form className="update todo" onSubmit={this.updateTodo}>
                        <input type="hidden" value={this.state.todoId} />
                    <div className="field">
                        <input onChange={(e) => this.setState({title:e.target.value})} value={this.state.title} type="text" placeholder="Todo title" />
                    </div>
                    <div className="field">
                        <textarea onChange={(e) => this.setState({description:e.target.value})} value={this.state.description} placeholder="Todo Description" />
                    </div>
                    <div className="field">
                        <input onChange={(e) => this.setState({progress:e.target.value})} value={this.state.progress} type="text" min={0} max={100} />
                    </div>
                    <div className="field">
                        <input checked={this.state.completed} onChange={(e) => this.setState({completed:!this.state.completed})} value={this.state.completed} type="checkbox" placeholder="" />
                    </div>
                    <button>Submit</button>
                </form>
                )}
                <div className="table-responsive">
                    <table className="table table-bordered table-stripped">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Title</th>
                                <th>Progress</th>
                                <th>completed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map((todo, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.progress}</td>
                                    <td>{todo.completed?'Done':'Not Done'}</td>
                                    <td> <button onClick={() => {
                                        this.deleteTodo(todo._id)
                                    }} className="btn btn-danger">Delete</button>
                                    <button onClick={() => {
                                        this.setState({
                                            title: todo.title,
                                            progress: todo.progress,
                                            completed: todo.completed,
                                            description: todo.description,
                                            tab:'update',
                                            todoId: todo._id
                                        })
                                    }}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Todo