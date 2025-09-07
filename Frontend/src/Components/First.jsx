import React,{useState,useEffect, useContext, useRef,useMemo} from 'react'
import {themecontext} from '../App.jsx'

function First({onclick}) {
  const theme=useContext(themecontext)
  const renders=useRef(0)
  renders.current=renders.current+1

  const[num,setnum]=useState(0)
  const style={
    background:theme ==='light'?'white':'black',
    color:theme ==='light'? 'black':'white'

  }

  const hello=(n)=>{
    for (let i=0; i<1000000000; i++) {} // just wasting CPU
    return n*2
  }
  const result=useMemo(()=>{
    hello(num)
  },[num])

  useEffect(()=>{
    console.log('useEffect called')
  },[])

  console.log('child component rendered')
  return (
    <>
    <div style={style}>

    <h1>first</h1>
    <h2>{renders.current}</h2>
    <h2>{result}</h2>
        <button onClick={()=>setnum(cur=>cur+1)}>click</button>
        <button onClick={onclick}>PARENT CLICK</button>
        <h1>{num}</h1>

        </div>
        
    </>
  )
}

export default First