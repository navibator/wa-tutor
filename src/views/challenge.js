import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Kanjis } from '../framework/kanji-show.js'
import './challenge.css'

const ChallengePage = props=>{
  const GET_POEM = gql`{
    read {
      _id title title_py author author_py content content_py brief biography
    } }`
  const { loading, error, data, refetch } = useQuery(GET_POEM, {
    fetchPolicy: 'network-only'
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  let fmtPoem = []
  let lines = data.read.content.trim('.').split(',')
  let pyins = data.read.content_py.trim().split(',')

  for (let i=0, len=lines.length; i<len; i++) {
    let wordArr = lines[i].trim()
    let pyinArr = pyins[i].trim().split('.')
    fmtPoem.push(<div className='poem-column' key={i}>{Kanjis(wordArr, pyinArr)}</div>) 
  }
  return (
    <div id='page-challenge'>
      <div id='poem-bar'>
        <input type='button' value='Read' onClick={e=> refetch()}/>
      </div>
      <div id='poem-content'>
        {fmtPoem}
      </div>
    </div>
  )
}
export default ChallengePage