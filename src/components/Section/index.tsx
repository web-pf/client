import './index.less'
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

interface ISectionProps extends RouteComponentProps {
  legend?: any
  description?: string
  viewMode?: 'hero' | 'card'
  children?: JSX.Element
}

function RSection(props: ISectionProps) {
  const { legend, description, viewMode, children, ...restProps } = props
  return (
    <section className='section' {...restProps}>
      <div className="-legend">{legend}</div>
      <div className="-description">{description}</div>
      <div className="-body">{children}</div>
    </section>
  )
}

export const Section = withRouter(RSection)
