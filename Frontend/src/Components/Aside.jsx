import React from 'react'
import calendar from '../assets/calender.png'
import dashboard from '../assets/dashboard.png'
import employee from '../assets/employee.png'
import message from '../assets/message.png'


function Aside() {
  return (
    <>
    <div className='asides'>
       <img src={dashboard} alt="" width='40' height='40'/>
       <img src={employee} alt=""  width='40' height='40' />
       <img src={calendar} alt="" width='40' height='40' />
       <img src={message} alt="" width='40' height='40' />

    </div>
    </>
  )
}

export default Aside