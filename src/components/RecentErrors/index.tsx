import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, List, Icon } from 'antd'

import { services } from '@/services'

import './index.less'

export type TError = {
  message: string
  filename: string
  type: string
  lineno?: number
  timestamp?: number[]
  colno?: number
  stack?: string
}

interface IRecentErrorsProps {
  appId: string
}
export const errorIcons = {
  window_error: <Icon type="warning" theme="twoTone" twoToneColor="#f5222d" />,
  promise_error: <Icon type="alert" theme="twoTone" twoToneColor="#fa8c16" />,
  console_error: <Icon type="code" />,
}
export const errorTypes = {
  window_error: "Error",
  promise_error: "Unhandled Promise Rejection",
  console_error: "Console error output",
}
const RRecentErrors = (props: IRecentErrorsProps) => {
  const { appId } = props

  const [errors, setErrors] = useState<TError[]>()

  useEffect(() => {
    if (!errors) {
      services.error
        .recent({
          appId,
        })
        .then(res => {
          const { error, msg, content } = res.data
          if (!error) {
            setErrors(content)
          }
        })
    }
  })
  return (
    <Card className="recent-errors" title="Recent errors" extra={<Link to="/errors">More</Link>}>
      {errors && (
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={errors}
          renderItem={item => {
            const record = JSON.parse(item['record']) as TError
            const { message, stack, type, filename } = record
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={errorIcons[type]}
                  title={<a href="https://ant.design">{errorTypes[type]}</a>}
                  description={message}
                />
              </List.Item>
            )
          }}
        />
      )}
    </Card>
  )
}

export const RecentErrors = RRecentErrors
