import Taskmodal from '@/components/Taskmodal'
import Notestate from '@/Context/Notestate'
import React from 'react'

const page = () => {
  return (
    <>
    <Notestate>
    <div>
        <Taskmodal/>
    </div>
    </Notestate>
    </>
  )
}

export default page