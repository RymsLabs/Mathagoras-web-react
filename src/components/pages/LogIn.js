import React from 'react';
import '../../App.css';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import axios from 'axios';
class Log extends React.Component {

    state = {
        Username: '',
        Password: '',
    }

    login(isStudent) {

        if (!this.state.Username || !this.state.Password) {
            alert("Enter details properly")
            this.resetval();
        }
        else {
            //alert("Logged in")
            const token = Buffer.from(`${this.state.Username}:${this.state.Password}`, 'utf8').toString('base64')

            let url;
            if (isStudent === true) {
                url = 'https://mathagoras-backend.herokuapp.com/student/login'
                axios.get(url, {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                }).then(response => {
                    if (response.status === 200) {
                        window.sessionStorage.setItem("token",token)
                        window.open("/studentcards", "_blank")
                    

                        
                    }
                    else {
                        alert(response.data.message)
                    }
    
                },(err) => {
                    if (err.response.status === 401) {
                        alert("Invalid Username Or Password")
                        console.log(err);
                    }
                    else {
                        alert(err.response.message)
                    }
                    
                })
            }
            else {
                url = 'https://mathagoras-backend.herokuapp.com/teacher/login'
                axios.get(url, {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                }).then(response => {
                    if (response.status === 200) {
                        window.sessionStorage.setItem("token",token)
                        window.open('/TeacherCourse', "_blank")
                        
                    }
                    else {
                        alert(response.data.message)
                    }
    
                },(err) => {
                    if (err.response.status === 401) {
                        alert("Invalid Username Or Password")
                        console.log(err);
                    }
                    else {
                        alert(err.response.message)
                    }
                    
                })
            }

            

        }
    }

    setvalue(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return
        }
        this.setState({
            [property]: val
        })
    }

    resetval() {
        this.setState({
            Username: '',
            Password: ''
        })
    }

    render() {
        return (

            <div className="Log" >
                <font color="white">
                    <h1>Login</h1>
                </font>


                <InputField
                    type="text"
                    placeholder='Username'
                    value={this.state.Username ? this.state.Username : ''}
                    onChange={(val) => this.setvalue('Username', val)}
                />



                <InputField
                    type="password"
                    placeholder='Password'
                    value={this.state.Password ? this.state.Password : ''}
                    onChange={(val) => this.setvalue('Password', val)}
                />
                <SubmitButton
                    text="Student"
                    onClick={() => {
                        this.login(true)
                    }}>
                </SubmitButton>
                
                <SubmitButton
                    text="Teacher"
                    onClick={() => {
                        this.login(false)
                    }}>
                </SubmitButton>



            </div>

        );
    }
}

export default Log;
