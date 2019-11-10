import React, { Component } from 'react';
import "./index.scss"
import PropTypes from 'prop-types';
import { Card, Grid, OutlinedInput, Button, InputLabel } from '@material-ui/core'
import { Field, reduxForm, reset } from 'redux-form'
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { userLogin } from 'Reducer/User/UserActions'


const overrideStyles = theme => ({
  gridRoot: {
    margin: '16px 0px',
  },
  buttonRoot:{
    textTransform: 'none',
    background: '#007bff',
    color: '#fff',
    width: '100%'
  },
  cardRoot:{
    padding: '16px',
    width: '100%'
  },
  outlinedInputRoot:{
    height: '28px',
    width: '100%',
  },
  outlinedInputInput: {
    padding: '0px 16px'
  },
  inputLabelRoot: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: '5px',
    color: '#000'
  }
});

const onFormSubmit = (values, dispatch, props) => {

  const{
    email, password
  } = values
  if(email === 'a@a.com' && password === 'aaaaaaaa'){
    dispatch(userLogin())
    dispatch(reset('loginForm'))
  }

}

class LoginForm extends React.Component{

  renderOutlinedInput = ({input, meta, type}) => {
    const {
      classes
    } = this.props

    console.log(input)

    return (
      <>
        <InputLabel classes={{ root: classes.inputLabelRoot }}>
          {input.name === 'email' ? 'Email Address' : 'Password'}
        </InputLabel>
        <OutlinedInput
          classes={{
            root: classes.outlinedInputRoot,
            input: classes.outlinedInputInput
          }}
          type={type}
          {...input}
        />
      </>
    )
  }

  render(){
    const {
      handleSubmit, classes
    } = this.props

    return(
      <div className="div-loginForm-wrapper">
        <form className="form-loginForm" onSubmit={handleSubmit}>
          <Grid container>
            <Card classes={{ root: classes.cardRoot }}>
              <Grid classes={{ root: classes.gridRoot }} item xs={12} md={12} lg={12}>
                <Field
                  name="email"
                  type="email"
                  component={this.renderOutlinedInput}
                />
              </Grid>

              <Grid classes={{ root: classes.gridRoot }} item xs={12} md={12} lg={12}>
                <Field
                  name="password"
                  type="password"
                  component={this.renderOutlinedInput}
                />
              </Grid>

              <Grid classes={{ root: classes.gridRoot }} item xs={12} md={12} lg={12}>
                <Button classes={{ root: classes.buttonRoot }} type="submit">
                  Login
                </Button>
              </Grid>
            </Card>
          </Grid>
        </form>
      </div>
    )
  }
}


export default compose(
  withStyles(overrideStyles),
  reduxForm({
    form: 'loginForm',
    initialValues: {
      'email': '', 'password': ''
    },
    onSubmit: onFormSubmit
  })
)(LoginForm);

LoginForm.protoTypes = {
}
