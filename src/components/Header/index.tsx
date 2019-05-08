import './index.less'
import React, { Fragment } from 'react'
import { Menu, Button, Tag, Dropdown, Icon } from 'antd'
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
    {
      path: '/guide',
      name: 'Guide',
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
    <div className="client-header-wrapper">
      <header className="client-header">
        <h1>
          <Link to='/'>
            WebPF<span> Monitor</span>
          </Link>
        </h1>
        {currentLocation !== 'account' && (
          <Fragment>
            <nav>
              <Menu theme="dark" mode="horizontal" selectedKeys={[`/${currentLocation}`]}>
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
              <Dropdown overlay={userMenu} className="-user">
                <Button icon="user">
                  {nickname} <Icon type="down" />
                </Button>
              </Dropdown>
              <Button
                className="reg-new-btn"
                type="primary"
                icon="plus"
                onClick={() => {
                  history.push('/register')
                }}
              >
                Website
              </Button>
            </div>
          </Fragment>
        )}
      </header>
    </div>
  )
}

export const Header = withRouter(connect(({ user }) => ({ user }))(RHeader))
