import React from 'react'

export default function FinishScreen({points,maxPoint}) {
    const per = (points/maxPoint)*100
  return (
    <p className='highscore'>
        
        You scored <strong>{points}</strong>
         out of {maxPoint} {Math.ceil(per)}</p>
  )
}
