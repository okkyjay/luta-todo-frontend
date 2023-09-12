import { Component } from "react";
import axios from "axios";

class Register extends Component{
    constructor(props){
        super(props)
        this.registrationSubmit = this.registrationSubmit.bind(this)
        this.state = {
            name:'',
            email: '',
            password:'',
            message:'',
            user:'',
            submitting:false,
            errors: {
                name: [],
                password: [],
                email: [],
            }
        }
    }
    registrationSubmit (e){
        e.preventDefault()
        const name = this.state.name
        const email = this.state.email
        const password = this.state.password
        
        const errors = this.state.errors

        for(let i in errors) {
            if(errors.hasOwnProperty(i)) {
                errors[i] = [];
            }
        }

        if(typeof name === 'string' && name === null || name === ''){
            errors.name.push("Please fill the name feild")
        }
        if(typeof email === 'string' && email === null || email === ''){
            errors.email.push("Please fill the email feild")
        }
        if(typeof password === 'string' && password === null || password === ''){
            errors.password.push("Please fill the password feild")
        }
        
        this.setState({errors: errors});

        for(let i in errors) {
            if(errors.hasOwnProperty(i)) {
                if(errors[i].length) {
                    return false;
                }
            }
        }
        this.setState({submitting:true})
        const url = 'http://localhost:8023/api/users/register'
        axios.post(url, {
            name,
            password,
            email,
        }).then((res) => {
            const data = res.data
            const message = data.message
            const user = data.data
            this.setState({message:message, user:user, submitting:false})
        }).catch((e) => {
            this.setState({submitting:false})
        })
        return false
    }
    render(){
        return(
            <div>
                {this.state.submitting?(<div> submitting ....</div>): null}
                {this.state.message?(<div>{this.message}</div>): null}
                <form onSubmit={this.registrationSubmit}>
                    <div className="filed">
                        <input onChange={(e)=> {this.setState({name:e.target.value})}} value={this.state.name} type="text" placeholder="Full name"/>
                        <div className="error">{this.state.errors.name.join(', ')}</div>
                    </div>
                    <div className="filed">
                        <input onChange={(e)=> {this.setState({email:e.target.value})}} value={this.state.email} type="email" placeholder="Email"/>
                        <div className="error">{this.state.errors.email.join(', ')}</div>

                    </div>
                    <div className="filed">
                        <input onChange={(e)=> {this.setState({password:e.target.value})}} value={this.password} type="password" placeholder="Password"/>
                        <div className="error">{this.state.errors.password.join(', ')}</div>
                    </div>
                    <div className="filed">
                        <button disabled={this.state.submitting}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Register