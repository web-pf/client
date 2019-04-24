import './index.less'
import React, {useState, useEffect} from 'react'
import { Form, Input, Icon } from 'antd'
import { Section } from '@/components'
import { withRouter, RouteComponentProps } from 'react-router'
import { FormComponentProps } from 'antd/lib/form'

interface IAccountProps extends RouteComponentProps, FormComponentProps {}

function RAccount(props: IAccountProps) {

  const [isRegisteredUser, setIsRegisteredUser] = useState(false)


  const { form } = props
  const { getFieldDecorator } = form

  return (
    <div className="account-wrapper">
      <Section legend={<div><Icon type="login" /> Account Portal</div>}>
        <Form>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size='large' placeholder="Your Email Address" type="email" />)}
          {isRegisteredUser && getFieldDecorator('passwords', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input.Password placeholder="密码" />)}
        </Form>
      </Section>
    </div>
  )
}

export const Account = Form.create()(withRouter(RAccount))
