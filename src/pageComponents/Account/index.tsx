import './index.less'
import React, { useState, useEffect } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { Section } from '@/components'
import { withRouter, RouteComponentProps } from 'react-router'
import { FormComponentProps } from 'antd/lib/form'
import { services } from '@/services'

interface IAccountProps extends RouteComponentProps, FormComponentProps {}

type TAccountStatus = 'UNKNOWN' | 'REGISTERED' | 'UNREGISTERED'

function RAccount(props: IAccountProps) {
  const { form } = props
  const { getFieldDecorator, validateFieldsAndScroll, getFieldsValue } = form

  const description = {
    UNKNOWN: '',
    UNREGISTERED: 'Create an account.',
    REGISTERED: '',
  }

  const [accountStatus, setAccountStatus] = useState<TAccountStatus>('UNKNOWN')
  const [currentEmail, setCurrentEmail] = useState<string>()

  const submit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, value) => {
      if (!err) {
        const { email, passwords } = value

        console.log(value)

        setCurrentEmail(email)

        if (accountStatus === 'UNKNOWN') {
          services.user
            .checkIsRegistered({
              _email: email,
            })
            .then(res => {
              const { status } = res.data
              const isRegistered = status === 'REGISTERED'

              if (isRegistered) {
                setAccountStatus('REGISTERED')
              } else {
                setAccountStatus('UNREGISTERED')
              }
            })
        } else {
          console.log(email)
        }
      }
    })
  }

  return (
    <div className="account-wrapper">
      <Section legend={'Manage your account'} description={description[accountStatus]}>
        <Form onSubmit={submit}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Input
              size="large"
              style={{ display: accountStatus === 'UNKNOWN' ? 'block' : 'none' }}
              placeholder="Your Email Address"
              type="email"
            />
          )}
          {accountStatus !== 'UNKNOWN' && (
            <div className="account-known">
              <span className="-email">{currentEmail}</span>
              <a className="-edit-email" role="button" onClick={() => setAccountStatus('UNKNOWN')}>
                Edit
              </a>
            </div>
          )}
          {accountStatus === 'UNREGISTERED' &&
            getFieldDecorator('invitationCode', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" placeholder="Invitation code" />)}
          {accountStatus !== 'UNKNOWN' &&
            getFieldDecorator('passwords', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input.Password size="large" placeholder="Passwords" />)}
          {accountStatus === 'UNREGISTERED' &&
            getFieldDecorator('confirmPasswords', {
              rules: [
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    const { passwords } = getFieldsValue()
                    if (passwords === value) {
                      callback()
                    } else {
                      callback('Entered passwords differ!')
                    }
                  },
                },
              ],
            })(<Input.Password size="large" placeholder="Confirm your passwords" />)}
        </Form>
      </Section>
    </div>
  )
}

export const Account = Form.create()(withRouter(RAccount))
