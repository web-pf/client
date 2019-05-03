import './index.less'
import React from 'react'
import { Menu, Button, Dropdown, Icon } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'dva'
import { IModelUser } from '@/models/user'

const { Item: MenuItem } = Menu

interface IHeaderProps extends RouteComponentProps {
  title?: string
  user?: IModelUser
}

function RHeader(props: IHeaderProps) {
  const { title, location, history, user } = props

  const { email, nickname } = user

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

  const currentLocation = location.pathname.split('/')[1]

  const userMenu = (
    <Menu>
      <Menu.Item key="1">用户中心</Menu.Item>
      <Menu.Item key="2">注销</Menu.Item>
    </Menu>
  )

  return (
    <header className="client-header-wrapper">
      <div className="client-header">
        <h1>
          WebPF<span> Platform</span>
        </h1>
        <nav>
          <Menu mode="horizontal" selectedKeys={[`/${currentLocation}`]}>
            {menu.map(menuItem => {
              const { path, name } = menuItem
              return (
                <MenuItem key={path}>
                  <Link to={path}>{name}</Link>
                </MenuItem>
              )
            })}
          </Menu>
        </nav>
        <div className="operations">
          <Dropdown overlay={userMenu}>
            <Button icon="user">
              {nickname} <Icon type="down" />
            </Button>
          </Dropdown>
          <Button
            disabled={currentLocation === 'register'}
            className="reg-new-btn"
            type="primary"
            icon="plus"
            onClick={() => {
              history.push('/register')
            }}
          >
            New website
          </Button>
        </div>
      </div>
    </header>
  )
}

export const Header = withRouter(connect(({ user }) => ({ user }))(RHeader))
