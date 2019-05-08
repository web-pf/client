import './index.less'
import React, { useState } from 'react'
import clipboard from 'clipboard'

import {
  Button,
  Alert,
  PageHeader,
  Steps,
  Form,
  Input,
  Statistic,
  message,
  Spin,
  Icon,
  Checkbox,
  Tag,
  Tooltip,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { services } from '@/services'

const { Step } = Steps
interface IRegisterWebsiteProps extends FormComponentProps {}
function RRegisterWebsite(props: IRegisterWebsiteProps) {
  const { form } = props
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const [currentStep, setCurrentStep] = useState(0)
  const [currentWebsiteId, setCurrentWebsiteId] = useState<number>()
  const [currentAppId, setAppId] = useState<number>()
  const [loading, setLoading] = useState(false)

  new clipboard('#copy-app-id')

  const showExpectedCopyBehavior = () => {
    message.success('Current app ID has been successfully copied to system clipboard!')
  }

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
                const { error, websiteId } = res.data
                if (!error) {
                  setCurrentStep(1)
                  setCurrentWebsiteId(websiteId)
                } else {
                  message.error(res.data.msg)
                }
              })
              .finally(() => {
                setLoading(false)
              })
          }
        })
        break
      }
      case 1: {
        setLoading(true)
        services.website
          .registerDone({
            websiteId: currentWebsiteId,
          })
          .then(res => {
            setLoading(false)
            const { error, msg, appId } = res.data
            if (!error) {
              setAppId(appId)
              setCurrentStep(2)
            } else {
              message.error(msg)
            }
          })
        break
      }
      default: {
        return
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
              </React.Fragment>
            )}
            {currentStep === 1 && (
              <React.Fragment>
                <Alert
                  message="Tips"
                  description="Heavy monitoring workload will not lead to a web performance loss."
                  type="info"
                  showIcon
                />
                <Form.Item label="Basic performance indicators">
                  <Checkbox checked disabled>
                    resource loading performance and api performance
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Unexpected behaviors.">
                  <Checkbox checked disabled>
                    Alarm of exceptions and asynchronous errors.
                  </Checkbox>
                </Form.Item>
                <Form.Item label="React">
                  <Checkbox checked disabled>
                    React components rendering performance
                  </Checkbox>
                </Form.Item>
              </React.Fragment>
            )}
            {currentStep === 2 && (
              <React.Fragment>
                <Alert
                  message="Website registered."
                  description="Please read developers' guide to connect your website to WebPF platform."
                  type="success"
                  showIcon
                />
                <Statistic
                  title="App ID"
                  value={currentAppId}
                  suffix={
                    <Tooltip title='Copy to clipboard'>
                      <Button onClick={showExpectedCopyBehavior} id="copy-app-id" icon="copy" data-clipboard-text={currentAppId} />
                    </Tooltip>
                  }
                />
              </React.Fragment>
            )}
            <Button type="primary" htmlType="submit" className="-submit-btn">
              {currentStep === 2 ? 'Go to dashboard' : 'Next'}
            </Button>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export const RegisterWebsite = Form.create()(RRegisterWebsite as any)
