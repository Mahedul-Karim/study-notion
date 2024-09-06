import React, { Suspense } from 'react'
import Spinner from '../components/ui/Spinner'

const Fallback = ({children}) => {
  return (
    <Suspense
      fallback={
        <div className="h-[80vh] w-full flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default Fallback