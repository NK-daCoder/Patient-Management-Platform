import React from 'react'

const Section = ({children, className, theme, transition}) => {
  return <section className={`${theme !== "light" ? "bg-neutral-950 border-neutral-800": "bg-neutral-100 border-neutral-200"} px-5 py-6 border-t  mt-5 ${className} rounded-xl shadow-md `}>{children}</section>
}

export default Section