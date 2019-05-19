import React, { ReactNode, Fragment } from 'react'
import './index.less'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface ISubHeaderProps extends RouteComponentProps {
  label: string
  append?: ReactNode
  hideAppendRoutes?: string[]
}

export const RSubHeader = (props: ISubHeaderProps) => {
  const { label, append, location, hideAppendRoutes } = props
  const heroLocation = location.pathname.split('/')[1]
  let showAppend = true
  if (hideAppendRoutes && hideAppendRoutes.includes(heroLocation)) {
    showAppend = false
  }
  return (
    <div className="client-sub-header-wrapper">
      <div className="client-sub-header">
        <h2>{label}</h2>
        {showAppend && (append || <Fragment />)}
      </div>
    </div>
  )
}

export const SubHeader = withRouter(RSubHeader)
