import React, { useState } from 'react'
import './dragger.css'

class DragObj extends React.Component {
  state = {style:'box', msg:'----'}

  onDragStart = e=>{
    let {id, fromZone} = this.props;
    let tmp = JSON.stringify({obj:id, zid:fromZone })
    e.dataTransfer.setData('text/plain', tmp)
    this.setState({style:'boxInDragging'})
  }
  onDragEnd = e=>{
    this.setState({style:'box'})
  }
  render() {
    return (<div  draggable   ='true'
                  className   = {this.state.style}
                  onDragStart = {this.onDragStart}
                  onDragEnd   = {this.onDragEnd}>
                {this.props.id}
            </div>)
  }
}
class DropZone extends React.Component {
    state = {
      pool: this.props.has,
      edgeClass: '',
      tipsStyle: {display:'none'}
    }
  counter = 0
  showTips = flag=>{
      this.setState({
        edgeClass:  (flag)? 'drag-over': '',
        tipsStyle:  {
          display:  (flag)? 'block':'none',
          left:     this.props.zone.tx,
          top:      this.props.zone.ty
      }})
  }
  onHover = e=>{ this.showTips(e.type==='mousemove') }
  onDragEnter = e=>{ this.counter ++; }
  onDragOver = e=>{ 
    e.preventDefault()
    this.showTips(true)
  }
  onDragLeave = e=>{ 
    this.counter --
    if( this.counter===0 ) {
        this.showTips(false)
    }
  }
  onDrop = e=>{
    e.preventDefault()
    this.counter = 0;
    let {obj, zid}  = JSON.parse( e.dataTransfer.getData("text/plain") )
    if( this.state.pool.includes(obj) ) {
        this.setState({style:''})
        return;
    }
    let {pool} = this.state
    let idx = pool.indexOf(obj)
    if( idx === -1 )
      pool.push(obj)
    this.props.rm(obj, zid)
    e.dataTransfer.clearData()
    this.setState({pool: pool, style:''})
  }
  render() {
    let {pool,edgeClass,tipsStyle}= this.state
    let dObjs = pool.map((v,i)=>{ return <DragObj id={v} key={i} fromZone={this.props.id}/> })
    return( <div  drop-zone='true'
                  className   = {edgeClass}
                  onMouseMove = {this.onHover}
                  onMouseOut  = {this.onHover}
                  onDragEnter = {this.onDragEnter}
                  onDragOver  = {this.onDragOver}              
                  onDragLeave = {this.onDragLeave}
                  onDrop      = {this.onDrop}>
              {dObjs}
              <div id='zone-tip' style= {tipsStyle}>{this.props.zone.tmsg}</div>
            </div>)
  }
}
class DnDFrame extends React.Component {
  state = {
      pool: [ { id:'z0', has:[0,1,2,3,4,5,6],  tx: '20px',ty:'120px', tmsg:'this is zone 0' },
              { id:'z1', has:[7,8],            tx:'200px',ty:'120px', tmsg:'this is zone 1' },
              { id:'z2', has:[9],              tx:'400px',ty:'120px', tmsg:'this is zone 2' }
            ],
      x:0, y:0, x2:0, y2:0, clsXY:'dnd-pos'
  }
  zone = {}
  onShowPos = e=>{
    let classXY = (e.type==='mousemove')? 'dnd-pos ta-init':'dnd-pos ta'
    this.setState({x:e.clientX, y:e.clientY, x2:e.clientX-e.target.offsetLeft, y2:e.clientY-e.target.offsetTop, clsXY:classXY})
  }
  remove = (obj, fromZone)=>{  
    let {pool} = this.state
    let zone   = pool.find(elem=>elem.id===fromZone)
    //let idx = pool[fromZone].indexOf(obj);
    let idx    = zone.has.indexOf(obj)
    if( idx > -1 ) 	{
      zone.has.splice(idx,1)
      this.setState({pool: pool})
    }
  }
  render() {
    let {pool,x,y,x2,y2,clsXY}  = this.state;
    let zones   = pool.map((z,i)=><DropZone
                      id  = {z.id} has={z.has}
                      key = {i}
                      ref = {elem=>{ this.zone[z.id]=elem }}
                      zone= {z}
                      rm  = {this.remove} />)
    
    return (<div  id = 'dnd-frame'
                  onMouseMove = {this.onShowPos}
                  onMouseOut  = {this.onShowPos}>
              <div className  = {clsXY}>[{x},{y},{x2},{y2}]</div>
              {zones}
            </div>);
  }
}


const DragPage=(props)=>{
  return  (
    <div id='page-dragger'>
        <DnDFrame/>
    </div>
  )
}
export default DragPage