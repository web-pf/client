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
  const { getFieldDecorator, validateFieldsAndScroll, getFieldsValue, getFieldsError } = form

  const { email, passwords, confirmPasswords, invitationCode } = getFieldsValue()

  let hasNoError = true
  const errors = getFieldsError()
  Object.keys(errors).every(itemKey => {
    if (errors[itemKey]) {
      hasNoError = false
      return false
    }
    return true
  })

  const allowSubmit = {
    UNKNOWN: email && !!email.includes('@'),
    UNREGISTERED: email && passwords && confirmPasswords && invitationCode,
    REGISTERED: email && passwords,
  }

  const description = {
    UNKNOWN: '',
    UNREGISTERED: 'Create an account.',
    REGISTERED: '',
  }
  const submitButtonText = {
    UNKNOWN: 'Done',
    UNREGISTERED: 'Create account',
    REGISTERED: 'Login',
  }

  const [accountStatus, setAccountStatus] = useState<TAccountStatus>('UNKNOWN')
  const [currentEmail, setCurrentEmail] = useState<string>()

  const submit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, value) => {
      if (!err) {
        const { email, passwords, invitationCode } = value

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
          const { email, passwords, invitationCode } = value
          if (accountStatus === 'UNREGISTERED') {
            services.user.register({
              email,
              passwords,
              invitationCode,
            })
          } else {
            const { email, passwords } = value
            services.user.login({
              email,
              passwords,
            })
          }
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
          {accountStatus === 'UNREGISTERED' && (
            <Form.Item>
              {getFieldDecorator('invitationCode', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input size="large" placeholder="Invitation code" />)}
            </Form.Item>
          )}
          {accountStatus !== 'UNKNOWN' && (
            <Form.Item>
              {getFieldDecorator('passwords', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input.Password size="large" placeholder="Passwords" />)}
            </Form.Item>
          )}
          {accountStatus === 'UNREGISTERED' && (
            <Form.Item>
              {getFieldDecorator('confirmPasswords', {
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
            </Form.Item>
          )}
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            disabled={!hasNoError || !allowSubmit[accountStatus]}
          >
            {submitButtonText[accountStatus]}
          </Button>
        </Form>
      </Section>
    </div>
  )
}

export const Account = Form.create()(withRouter(RAccount))
