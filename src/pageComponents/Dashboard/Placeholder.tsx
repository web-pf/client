import React from 'react'
import { Empty, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'

interface IPlaceholderProps extends RouteComponentProps {}

function RPlaceholder(props: IPlaceholderProps) {
  const { history } = props

  return (
    <div className="-placeholder">
      <Empty description="You have not registered any website yet.">
        <Button
          icon="plus"
          size="large"
          className="-create-btn"
          type="primary"
          onClick={() => {
            history.push('/register')
          }}
        >
          Register Now
        </Button>
      </Empty>
    </div>
  )
}

export const Placeholder = withRouter(RPlaceholder)
