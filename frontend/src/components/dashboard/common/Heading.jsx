import React from 'react'

const Heading = ({children,extraClass=""}) => {
  return (
    <h2 className={`text-2xl font-[500] text-secondary ${extraClass}`}>{children}</h2>
  )
}

export default Heading