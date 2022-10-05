
import React, { useState, useEffect } from 'react'
import './about.css'
//import { GroupOf, ConvertBPM } from '../framework/-pinyin37.js'
import { GroupOf, ConvertBPM } from 'pinyin37'
const BpmHistory =(props)=>{
  return <div id='bopomo-history'>
      <p><span style={{fontWeight:'bold'}}>Zhuyin (注音) or Mandarin Phonetic Symbols</span>, also nicknamed Bopomofo, is a Chinese transliteration system 
        for Mandarin Chinese and other related languages and dialects which is nowadays most commonly used in Taiwanese Mandarin. 
        It is also used to transcribe other varieties of Chinese, particularly other varieties of Standard Chinese and related Mandarin dialects,
        as well as Taiwanese Hokkien.
      </p>
      <br/>
      <p><span style={{fontWeight:'bold'}}>Tongyong Pinyin (通用拼音)</span> was the official romanization of Mandarin in Taiwan between 2002 and 2008.
        The system was unofficially used between 2000 and 2002, when a new romanization system for Taiwan was being evaluated for adoption.
        Taiwan's Ministry of Education approved the system in 2002, but its use was optional.
        Since 1 January 2009, the Ministry of Education has officially promoted Hanyu Pinyin (per decision on 16 September 2008);
        local governments would "not be able to get financial aid from the central government" if they used Tongyong Pinyin-derived romanizations.
        After this policy change, Tongyong Pinyin has been used for the transliteration of some place names and personal names in Taiwan (ROC).
        Some of the romanized names of the districts, subway stations and streets in Kaohsiung, Tainan, Taichung,
        Yunlin County and other places are derived from Tongyong Pinyin – for example, Cijin District (旗津區).</p>
  </div>
}
const Memo1 = props=>{
  let tmpInfo = ConvertBPM(props.note)
  const [posXY, setPos] = useState({x:400, y:0})
  const [relXY, setRel] = useState({x:0, y:0})
  const [isDragging, setDragging] = useState(false)

  let onMouseDown = e=>{ setDragging(true); setRel({x: e.clientX-posXY.x, y: e.clientY-posXY.y}) }
  let onMouseMove = e=>{ if(!isDragging) return; setPos({x:e.clientX-relXY.x, y:e.clientY-relXY.y}) }
  let onMouseUp = e=>{ setDragging(false) } 

  return  <div  id = 'memo1'
                style = {{left:posXY.x, top:posXY.y}}
                onMouseDown = {onMouseDown}
                onMouseMove = {onMouseMove}
                onMouseUp   = {onMouseUp} >
              <div>Sticky Note</div><br/>
              <div>{tmpInfo.bpm}: {tmpInfo.tyong}</div>
          </div>}

const Memo2 = (props)=>{
  let tmpList = GroupOf(props.prefix).map((x,i)=>{
        return <div key={i}>{x.bpm} &#8594; {x.tyong}</div>
  })
  return  <div id='memo2'>{tmpList}</div>
}

const Memo3 = props=>{
  return  <div id='memo3'>
              <div>Memo 3</div><br/>
              {GroupOf(props.hint).map( (x,i)=> {
                  return <div key={i}>{x.bpm} &#8594; {x.tyong}</div>
              })}
          </div>}

const BpmTable = props=>{
  const [sym, setSym] = useState()
  const [note, setNote] = useState('ㄅ')
  const [prefix, setPrefix] = useState('...')

  let Mandarin_Phonetic_Symbols = [
      {x:-200, y:-100, w: 40, h: 40, r: 50, sym:'ㄅ'},
      {x:-150, y:-100, w: 40, h: 40, r: 50, sym:'ㄆ'},
      {x:-100, y:-100, w: 40, h: 40, r: 50, sym:'ㄇ'},
      {x: -50, y:-100, w: 40, h: 40, r: 50, sym:'ㄈ'},
      {x:  50, y:-100, w: 40, h: 40, r: 50, sym:'ㄉ'},
      {x: 100, y:-100, w: 40, h: 40, r: 50, sym:'ㄊ'},
      {x: 150, y:-100, w: 40, h: 40, r: 50, sym:'ㄋ'},
      {x: 200, y:-100, w: 40, h: 40, r: 50, sym:'ㄌ'},
      {x:-175, y: -50, w: 40, h: 40, r: 50, sym:'ㄍ'},
      {x:-125, y: -50, w: 40, h: 40, r: 50, sym:'ㄎ'},
      {x: -75, y: -50, w: 40, h: 40, r: 50, sym:'ㄏ'},
      {x:  75, y: -50, w: 40, h: 40, r: 50, sym:'ㄐ'},
      {x: 125, y: -50, w: 40, h: 40, r: 50, sym:'ㄑ'},
      {x: 175, y: -50, w: 40, h: 40, r: 50, sym:'ㄒ'},
      {x:-150, y:   0, w: 40, h: 40, r: 50, sym:'ㄓ'},
      {x:-100, y:   0, w: 40, h: 40, r: 50, sym:'ㄔ'},
      {x: -50, y:   0, w: 40, h: 40, r: 50, sym:'ㄕ'},
      {x:   0, y:   0, w: 40, h: 40, r: 50, sym:'ㄖ'},
      {x:  50, y:   0, w: 40, h: 40, r: 50, sym:'ㄗ'},
      {x: 100, y:   0, w: 40, h: 40, r: 50, sym:'ㄘ'},
      {x: 150, y:   0, w: 40, h: 40, r: 50, sym:'ㄙ'},

      {x:-125, y:   50, w: 60, h: 40, r: 40, sym:'ㄧ'}, 
      {x:   0, y:   50, w: 60, h: 40, r: 40, sym:'ㄨ'},
      {x: 125, y:   50, w: 60, h: 40, r: 40, sym:'ㄩ'},

      {x:-275, y: 100, w: 40, h: 40, r: 50, sym:'ㄚ'},
      {x:-225, y: 100, w: 40, h: 40, r: 50, sym:'ㄛ'},
      {x:-175, y: 100, w: 40, h: 40, r: 50, sym:'ㄜ'},
      {x:-125, y: 100, w: 40, h: 40, r: 50, sym:'ㄝ'},
      {x: -75, y: 100, w: 40, h: 40, r: 50, sym:'ㄞ'},
      {x: -25, y: 100, w: 40, h: 40, r: 50, sym:'ㄟ'},
      {x:  25, y: 100, w: 40, h: 40, r: 50, sym:'ㄠ'},
      {x:  75, y: 100, w: 40, h: 40, r: 50, sym:'ㄡ'},
      {x: 125, y: 100, w: 40, h: 40, r: 50, sym:'ㄢ'},
      {x: 175, y: 100, w: 40, h: 40, r: 50, sym:'ㄣ'},
      {x: 225, y: 100, w: 40, h: 40, r: 50, sym:'ㄤ'},
      {x: 275, y: 100, w: 40, h: 40, r: 50, sym:'ㄥ'},
      {x: 325, y: 100, w: 40, h: 40, r: 50, sym:'ㄦ'}
  ]
  let tmpButtons = Mandarin_Phonetic_Symbols.map((btn,i)=>{
      let width = btn.w + 'px'
      let height = btn.h + 'px'
      let left = props.w/2 + (btn.x - btn.w/2) + 'px'
      let top = props.h/2 + (btn.y - btn.h/2) + 'px'
      let borderRadius = btn.r + '%'
      let css = (sym===btn.sym)? 'btn-bpm-clicked': 'btn-bpm-normal'
      return  <div  key={i} className={css}
                    style={{width, height, left, top, borderRadius}}
                    onMouseEnter={e=>{ setNote(btn.sym) }}
                    onClick={e=>{ 
                        setSym(btn.sym)
                        setPrefix(btn.sym)
                        setTimeout(()=>{setSym('')}, 500)
                    }}>
                    {btn.sym}
              </div>
  })
  return (
    <div id='bopomo-table'>
        {tmpButtons}
        <Memo1 note={note}/>
        <Memo2 prefix={prefix}/>
        <Memo3 hint={'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥ'}/>
    </div>
  )
}
const AboutPage=(props)=>{
  return (
    <div id='page-about'>
        <h2>Boㄅ Poㄆ Moㄇ</h2>
        <BpmTable w='640' h='460'/>
        <BpmHistory />
        <div id='info'>Please reference <a href='https://crptransfer.moe.gov.tw' rel="noopener noreferrer"
            target="_blank">official website</a> for more detail.
        </div>
    </div>
  )
}   
export default AboutPage