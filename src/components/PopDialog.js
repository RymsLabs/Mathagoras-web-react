import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

export default class FormDialog extends React.Component {
    state = {
        open:false,
        setOpen: false,
        courseId: null,
        textFieldText1: null,
        textFieldText2: null
  }

    handleClickOpen() {
        this.setState({open: true,setOpen: true});
  };

  handleSubscribe() {
    this.setState({open: false,setOpen: false});
    if(this.props.cond === true){
      Axios.post('https://mathagoras-backend.herokuapp.com/course/', {
        'courseName': this.state.textFieldText1,
        'description':this.state.textFieldText2
        
    }, {
        headers: {
            'Authorization': `Basic ` + window.sessionStorage.getItem('token'),
        }
    }).then(() => {
        // Error handling
        this.props.parent.updatePosts();    
    }, (err) => {
        if(err) console.log(err);
    });
    }
    else{
    Axios.post('https://mathagoras-backend.herokuapp.com/courseStudent/enroll/', {
        'courseId': this.state.textFieldText1,
    }, {
        headers: {
            'Authorization': `Basic ` + window.sessionStorage.getItem('token'),
        }
    }).then(() => {
        // Error handling
        this.props.parent.updatePosts();    
    }, (err) => {
        if(err) console.log(err);
    });
  }
  }

    handleClose() {
        this.setState({open: false,setOpen: false});
  };

  constructor(props) {
      super(props)
      this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  render() {
    if(this.props.cond === true){
      return(
        <div>
          <Button variant="outlined" color="black" onClick={this.handleClickOpen}>
    {/* Enroll in a course */}{this.props.bname}
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{backgroundColor: 'black', opacity: 0.8}} id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent >
              <DialogContentText>
    {/* Please ask for the course id from the course instructor you wish to join.*/}    {this.props.msg}    </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="enter course name"
                type="text"
                onChange={ (e) => this.setState({textFieldText1: e.target.value})}
                fullWidth
              />
          
               <TextField
               autoFocus
               margin="dense"
               id="name"
               label="enter course description"
               type="text"
               onChange={ (e) => this.setState({textFieldText2: e.target.value})}
               fullWidth
             />
            
            </DialogContent>
            <DialogActions color="black">
              <Button style={{backgroundColor: 'black', opacity: 0.5}} onClick={this.handleClose} color="black">
                Cancel
              </Button>
              <Button style={{backgroundColor: 'black', opacity: 0.5}} onClick={this.handleSubscribe} color="black">
              {this.props.submit}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    else{
      return(
        <div>
          <Button variant="outlined" color="black" onClick={this.handleClickOpen}>
    {/* Enroll in a course */}{this.props.bname}
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle style={{backgroundColor: 'black', opacity: 0.8}} id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent >
              <DialogContentText>
    {/* Please ask for the course id from the course instructor you wish to join.*/}    {this.props.msg}    </DialogContentText>
              
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="enter course id"
                type="text"
                onChange={ (e) => this.setState({textFieldText1: e.target.value})}
                fullWidth
              />
            </DialogContent>
            <DialogActions color="black">
              <Button style={{backgroundColor: 'black', opacity: 0.5}} onClick={this.handleClose} color="black">
                Cancel
              </Button>
              <Button style={{backgroundColor: 'black', opacity: 0.5}} onClick={this.handleSubscribe} color="black">
              {this.props.submit}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
      
      }
}