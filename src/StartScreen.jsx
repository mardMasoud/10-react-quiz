import React from 'react'


export default function StartScreen({questionsNumber,handleBtn}) {
    
  return (
    <div className='start'>
        <h2>Welcome to hte React Quiz!</h2>
        <h3>{questionsNumber} question to test your React mastery</h3>
        <button className='btn btn-ui' onClick={handleBtn}>Let's start</button>
    </div>
  )
}
