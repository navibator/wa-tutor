
import React, { Component, useState, useEffect } from 'react'
import DlgLogin from './framework/dialog-auth'
import Tagmenu from './framework/tagmenu'
import AboutPage from './views/about'
import BasicPage from './views/basic'
import ChallengePage from './views/challenge'
import './App.css'

class App extends Component {
  render() {
    let tmpStyle = { fontSize: '16px' }

    return (
      <div className='App'>
        <div id='navi-bar'>
            <div className='container'>
                <h4>Menu</h4>
            </div>
        </div>
        <div id='jumbotron'>
            <div className='container'>
                <h1>Tutor <ruby><rb>ㄅ</rb><rt>bo</rt><rb>ㄆ</rb><rt>po</rt><rb>ㄇ</rb><rt>mo</rt></ruby></h1>
                <div style={tmpStyle}>
                  Mandarin Made Easy 
                </div>
            </div>
        </div>
        <div id='contents'>
            <Tagmenu init='Basic'>
                <AboutPage disp='About'/>
                <BasicPage disp='Basic'/>
                <ChallengePage disp='Challenge'/>
            </Tagmenu>
        </div>
      </div>)
  }
}
export default App
