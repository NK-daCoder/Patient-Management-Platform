import React from 'react'

const Section = ({children, className}) => {
  return <section className={`bg-neutral-950 p-3 border-t border-neutral-500 mt-5 ${className} rounded-xl`}>{children}</section>
}

export default Section