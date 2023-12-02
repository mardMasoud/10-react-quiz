import React from 'react'

export default function ({dispatch}) {
  return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:'nextQuestion'})}>Next</button>
  )
}
