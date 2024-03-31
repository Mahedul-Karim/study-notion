import React from 'react'

const Heading = ({children,extraClass=""}) => {
  return (
    <h2 className={`text-2xl 400px:text-3xl font-[500] ${extraClass}`}>{children}</h2>
  )
}

export default Heading