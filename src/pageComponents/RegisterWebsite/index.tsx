import './index.less'
import React, { useState } from 'react'
import { Empty, Button, Card, PageHeader, Steps, Form, Input, message, Spin, Icon } from 'antd'
import { Route } from 'react-router-dom'
import { FormComponentProps } from 'antd/lib/form'
import { services } from '@/services'

const { Step } = Steps
interface IRegisterWebsiteProps extends FormComponentProps {}
function RRegisterWebsite(props: IRegisterWebsiteProps) {
  const { form } = props
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    switch (currentStep) {
      case 0: {
        validateFieldsAndScroll((error, value) => {
          if (!error) {
            setLoading(true)

            services.website
              .register(value)
              .then(res => {
                if (!res.data.error) {
                  setCurrentStep(2)
                } else {
                  message.error(res.data.msg)
                }
              })
              .finally(() => {
                setLoading(false)
              })
          }
        })
      }
    }
  }

  return (
    <div className="client-register-website client-body">
      <PageHeader title="Register new website" />
      <Steps current={currentStep}>
        <Step title="Website information" />
        <Step title="Monitoring options" />
        <Step title="Register" />
      </Steps>
      <div className="-inputs">
        <Spin spinning={loading} indicator={<Icon type="loading" />} delay={800}>
          <Form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <React.Fragment>
                <Form.Item label="URL (or domain name)">
                  {getFieldDecorator('websiteUrl', {
                    rules: [
                      {
                        required: true,
                      },
                      {
                        max: 256,
                      },
                      {
                        whitespace: false,
                      },
                    ],
                  })(<Input autoComplete="off" placeholder="Your website url or domain name." />)}
                </Form.Item>
                <Form.Item label="website name">
                  {getFieldDecorator('websiteName', {
                    rules: [
                      {
                        required: true,
                      },
                      {
                        max: 256,
                      },
                      {
                        whitespace: false,
                      },
                    ],
                  })(<Input autoComplete="off" placeholder="A display name for this website." />)}
                </Form.Item>
                <Form.Item label="website name">
                  {getFieldDecorator('websiteDescription', {
                    rules: [
                      {
                        required: true,
                      },
                      {
                        max: 512,
                      },
                      {
                        whitespace: false,
                      },
                    ],
                  })(
                    <Input
                      autoComplete="off"
                      placeholder="If you want, you can also descripte your website."
                    />
                  )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="-submit-btn">
                  Next
                </Button>
              </React.Fragment>
            )}
          </Form>
        </Spin>
      </div>

    </div>
  )
}

export const RegisterWebsite = Form.create()(RRegisterWebsite as any)
