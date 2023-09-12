import React, { Component } from "react";
import axios from "axios";

class Login extends Component{
    constructor(props){
        super(props)
        this.loginMethod = this.loginMethod.bind(this)
        this.state = {
            email: '',
            password: '',
            message:'',
            user:'',
            token: '',
            submitting:false,
            errors: {
                password: [],
                email: [],
            }
        }
    }
    loginMethod (e){
        e.preventDefault()

        const email = this.state.email
        const password = this.state.password
        
        const errors = this.state.errors

        for(let i in errors) {
            if(errors.hasOwnProperty(i)) {
                errors[i] = [];
            }
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

        this.setState({submitting: true})
        const url = 'http://localhost:8023/api/users/login'

        axios.post(url, {email, password}).then((res) => {
            const data = res.data
            const message = data.message
            if(data.status){
                localStorage.setItem('token', data.data.token)
                this.setState({submitting:false, message:message, token: data.data.token, user:data.data.user})
                this.props.history.push('/todos')
            }else{
                this.setState({submitting:false, message:message})
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    render(){
        return(
            <div className="container">
                {this.state.submitting?(<div> submitting ....</div>): null}
                {this.state.message?(<div>{this.message}</div>): null}
                <form onSubmit={this.loginMethod}>
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
export default Login