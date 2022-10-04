import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <div className='text-center'>
         <Spinner animation="border" variant="primary" />
    </div>
  )
}
