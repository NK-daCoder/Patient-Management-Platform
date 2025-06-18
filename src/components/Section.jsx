import React from 'react'

const Section = ({children, className}) => {
  return <section className={`bg-neutral-950 px-5 py-6 border-t border-neutral-800 mt-5 ${className} rounded-xl`}>{children}</section>
}

export default Section