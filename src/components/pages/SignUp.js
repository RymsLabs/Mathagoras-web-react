import React from 'react';
import '../../App.css';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import axios from 'axios';


class SignUp extends React.Component {

    state = {
        student_id: '',
        Username: '',
        Email: '',
        Password: ''
    }


    setvalue(property, val) {
        val = val.trim();
        if (val.length > 30) {
            return
        }
        this.setState({
            [property]: val
        })
    }

    SignUP(isStudent) {

        if (!this.state.Username || !this.state.Password || !this.state.Email || !this.state.student_id) {
            alert("Enter details properly")
            this.resetval();
        }
        else {

            let url;
            if (isStudent === true) {
                url = 'https://mathagoras-backend.herokuapp.com/student/signup'
                axios.post(url, {
                    student_id: this.state.student_id,
                    fname: this.state.Username,
                    email: this.state.Email,
                    password: this.state.Password,
                    dob: '2000-09-25'
                }).then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        this.props.history.push('/Log')
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
                    
                }
                );
            }
            else {
                url = 'https://mathagoras-backend.herokuapp.com/teacher/signup'
                axios.post(url, {
                    teacher_id: this.state.student_id,
                    fname: this.state.Username,
                    email: this.state.Email,
                    password: this.state.Password,
                    dob: '2000-09-25'
                }).then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        this.props.history.push('/Log')
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
                    
                }
                );
            }
            
            // axios.post('https://mathagoras-backend.herokuapp.com/student/signup', {
            //     student_id: this.state.student_id,
            //     fname: this.state.Username,
            //     email: this.state.Email,
            //     password: this.state.Password,
            //     dob: '2000-09-25'
            // })
            //     .then(response => {
            //         console.log(response);
            //     }, (error) => {
            //         console.log(error.response);
            //         console.log(error);
            //     }
            //     );

        }
    }
    resetval() {
        this.setState({
            student_id: "",
            Username: '',
            Email: '',
            Password: ''
        })
    }

    render() {
        return (

            <div className="sign-up" >
                <font color="grey">
                    <h1>Create Your Account</h1>
            </font>
            <br></br>
                <InputField
                    type="text"
                    placeholder='ID'
                    value={this.state.student_id ? this.state.student_id : ''}
                    onChange={(e) => this.setvalue('student_id', e)}
                />
                <InputField
                    type="text"
                    placeholder='Username'
                    value={this.state.Username ? this.state.Username : ''}
                    onChange={(e) => this.setvalue('Username', e)}
                />


                <InputField
                    type="email"
                    placeholder='Email'
                    value={this.state.Email ? this.state.Email : ''}
                    onChange={(e) => this.setvalue('Email', e)}
                />
                <InputField
                    type="password"
                    placeholder='Password'
                    value={this.state.Password ? this.state.Password : ''}
                    onChange={(e) => this.setvalue('Password', e)}
                />
                <br /> 

                <SubmitButton
                    text="Student"
                    onClick={() => this.SignUP(true)}>

                </SubmitButton>

                <SubmitButton
                    text="Teacher"
                    onClick={() => this.SignUP(false)}>

                </SubmitButton>


            </div>

        );
    }


}
export default SignUp;
