import './index.less'
import React, { Fragment } from 'react'
import { Menu, Button, Tag, Dropdown, Icon, Row, Col } from 'antd'
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

  const { email, nickname, privilegeCode } = user

  const isGuest = privilegeCode === 0

  const logOut = () => {
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    history.push('/account')
  }

  const menu = [
    {
      path: '/dashboard',
      name: 'Dashboard',
    },
    {
      path: '/errors',
      name: 'Errors',
    },
    {
      path: '/websites',
      name: 'Websites',
    },
  ]

  const currentLocation = location.pathname.split('/')[1]

  const userMenu = (
    <Menu>
      <Menu.Item key="2" onClick={logOut}>
        Switch account
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="client-header-wrapper">
      <header className="client-header">
        <Row>
          <Col xs={24} xl={8}>
            <h1>
              <Link to="/">
                WebPF
                <span>
                  {' '}
                  Monitor<sup>BETA</sup>
                </span>
              </Link>
            </h1>
          </Col>
          {currentLocation !== 'account' && (
            <Fragment>
              <Col xs={0} xl={8}>
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
              </Col>

              <Col xs={0} xl={8}>
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
                    disabled={isGuest}
                    onClick={() => {
                      history.push('/register')
                    }}
                  >
                    Website
                  </Button>
                </div>
              </Col>
            </Fragment>
          )}
        </Row>
      </header>
    </div>
  )
}

export const Header = withRouter(connect(({ user }) => ({ user }))(RHeader))
