import React, { ReactNode, Fragment } from 'react'
import './index.less'

interface ISubHeaderProps {
  label: string
  append?: ReactNode
}

export const RSubHeader = (props: ISubHeaderProps) => {
  const { label, append } = props
  return (
    <div className="client-sub-header-wrapper">
      <div className="client-sub-header">
        <h2>{label}</h2>
        {append || <Fragment />}
      </div>
    </div>
  )
}

export const SubHeader = RSubHeader
