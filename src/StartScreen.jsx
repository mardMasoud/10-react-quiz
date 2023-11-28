import React from 'react'


export default function StartScreen({questionsNumber,dispatch}) {
    
  return (
    <div className='start'>
        <h2>Welcome to hte React Quiz!</h2>
        <h3>{questionsNumber} question to test your React mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's start</button>
    </div>
  )
}
