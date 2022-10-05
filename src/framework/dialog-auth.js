import React, { Component } from 'react'
import './dialog-auth.css'
import { uac_login, uac_logout, uac_create } from './net'


class DlgLogin extends Component {
  state = {
      isOn:     false,  // is this dialog open?
      isREG:    false,  // login or register     
      name:     'Anne',
      email:    'anne@v.gg',
      password: 'p@ssword',
      confirm:  'p@ssword',
      message:  '....'
  }
  show    = isOn=>  { this.setState({isOn, message:''}) }
  reset   = ()  =>  { uac_logout()
                      this.setState({email:'', password:'', confirm:''}) }
  onFastpass = e=> {
    let auth = e.currentTarget.id
    console.log('Fastpass by '+auth)
  }
  onName      = e=> { this.setState({name:    e.currentTarget.value}) }
  onEmail     = e=> { this.setState({email:   e.currentTarget.value}) }
  onPassword  = e=> { this.setState({password:e.currentTarget.value}) }
  onConfirm   = e=> { this.setState({confirm: e.currentTarget.value}) }
  onBtnSend   = e=> {
    let { isREG, name, email, password } = this.state
    if(isREG) {
      uac_create(name, email, password, (ok, message)=>{
          if(ok) { 
            window.setTimeout( ()=>{ this.show(false) }, 2000) 
          }
          this.setState({ message, isREG:false })
      })
    } else {
      uac_login(email, password, (ok, message)=>{
          if(ok) { 
            window.setTimeout( ()=>{ this.show(false) }, 1000)
            this.props.fOk(email)
          }
          this.setState({ message })
      })
    }
  }
  onBtnCancel = e=> { this.show(false) }
  onBtnToggle = e=> {
    this.setState( (prev, props)=>({ isREG: !prev.isREG }) )
  }
  render() {
    let { isOn, isREG, name, email, password, confirm, message } = this.state
    let tmpStyle= { display: isOn?  'block' : 'none' }
    let tmpField= { display: isREG? 'block' : 'none' } 
    let btnFunc = isREG?  'Register': 'Login'
    let txtTurn = isREG?  'Already have an account' : 'Register a new account'

    return (<div className='cb-dialog-background' style={tmpStyle}>
              <div className='cb-dialog-modal'>
                <div id='dlg-login'>
                  <h2>DIALOG</h2>
                  <hr/>
                  <div>Email*     <br/><input onChange={this.onEmail}    value={email} /></div>
                  <div>Password*  <br/><input onChange={this.onPassword} value={password} type='password'/></div>
                  <div style={tmpField}>
                    <div>Confirm* <br/><input onChange={this.onConfirm}  value={confirm}  type='password'/></div>
                    <div>Name     <br/><input onChange={this.onName}     value={name} /></div>
                  </div>
                  <div id='ret-error'>{message}</div>
                  <input type='button' onClick={this.onBtnSend}   value={btnFunc}/>
                  <input type='button' onClick={this.onBtnCancel} value='Cancel'/>
                  <div id='btn-toggle' onClick={this.onBtnToggle }>{txtTurn}</div>
                </div>
              </div>
            </div>
    )}
}
export default DlgLogin