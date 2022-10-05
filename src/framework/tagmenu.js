import React, { useState } from 'react'
import './tagmenu.css'

function Tagmenu(props) {
  const [currid, setCurrid] = useState(props.init)
  const onSwitchTag = (e)=>{
    setCurrid(e.currentTarget.id.split('-')[1])
  }
  const theTags = props.children.map( (x,i)=>{
    let {disp} = x.props 
    let clss = (disp===currid)? 'tag-focus':''
    return <div id={'tag-'+disp} key={i} onClick={onSwitchTag} className={clss}>{disp}</div>
  })
  const thePanes = props.children.map( (x,i)=>{
    let {disp} = x.props
    let tmpDisp = (currid===disp)? 'block': 'none'
    return <div id={'pane-'+disp} key={i} style={{display:tmpDisp}}>{x}</div>
  })
  return(
    <div id='tagmenu'>
      <div id='tm-tags'>
        {theTags}
      </div>
      <div id='tm-panes'>
        {thePanes}
      </div>
    </div>)
}
export default Tagmenu