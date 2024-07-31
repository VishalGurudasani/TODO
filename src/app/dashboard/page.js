import Dashboard from '@/components/Dashboard'
import React from 'react'
import './Dashboard.css'
import Notestate from '@/Context/Notestate'
const page = () => {
  return (
    <>
    <Notestate>
    <div>
        <Dashboard/>
    </div>
    </Notestate>
    </>
  )
}

export default page