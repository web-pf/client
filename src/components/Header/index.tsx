import './index.less'
import React from 'react'
import { Menu, Button, Divider, Icon } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

interface IHeaderProps extends RouteComponentProps {
  title?: string
}

function RHeader(props: IHeaderProps) {
  const { title, location } = props

  const menu = [
    {
      path: '/dashboard',
      name: 'Dashboard',
    },
    {
      path: '/manage',
      name: 'Manage',
    },
    {
      path: '/system',
      name: 'System',
    },
  ]

  const currentLocation = location.pathname.match(/\/(location)\/?/)

  console.log(location.pathname)

  return (
    <header className="client-header-wrapper">
      <div className="client-header">
        <h1>{title || 'WebPF'}</h1>
        <nav>
          <ul>
            {menu.map(menuItem => {
              const { path, name } = menuItem
              return (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <Divider className="-divider" type="vertical" />
        <div className="-user-control">
          <Icon type="user" /> <span>张智翔</span>
        </div>
      </div>
    </header>
  )
}

export const Header = withRouter(RHeader)
