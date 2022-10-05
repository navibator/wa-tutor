import React from 'react'
//import { CheckSpell } from './pinyin37.js'
import { CheckSpell } from 'pinyin37'
import './kanji-show.css'

// { toneNo bpm tyong word bpm }
const SquareCharacter = props=>{
  let tone4 = ['?',' ','ˊ','ˇ','ˋ','˙']
  let head_tone = '' 
  let side_tone = tone4[props.toneNo]
  let bopomo = []
  if(props.toneNo===5) {
    head_tone = '˙'
    side_tone = ''
    bopomo = [<div className='kj-tone1' key={head_tone}>{head_tone}</div>]  
  }
  for (let len=props.bpm.length, i=0; i<len; i++) {
    let ch = props.bpm.charAt(i)
    bopomo.push(<div className='kj-bpm' key={i}>{ch}</div>)
  }
  return(
    <div className={'kj-frame'}>
      <div className='kj-tyong' >{props.tyong}{props.toneNo}</div>
      <div className='kj-word'  >{props.word}</div>
      <div className='kj-bpmf'  >{bopomo}</div>
      <div className='kj-tone'  >{side_tone}</div>
    </div>)
}

const Kanjis = (word, pyinArr)=>{
  let words = []
  for (let i=0, len=word.length; i<len; i++)
  {
    let w = word.charAt(i)  // word = 白色
    let p = pyinArr[i]      // pyinArr = [bai2,se4]
    let retAns = CheckSpell(p)
    words.push(<SquareCharacter word={w} tyong={retAns.tyong} toneNo={retAns.no} bpm={retAns.bpm} key={i}/>)
  }
  return words 
}
export { Kanjis }