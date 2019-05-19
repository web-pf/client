import React, { useState, useEffect } from 'react'
import { List, Card, Icon, Badge } from 'antd'

import { services } from '@/services'
import { TError, errorIcons, errorTypes } from '@/components/RecentErrors'

import './index.less'

interface IErrorProps {
  appId: string
}

const RErrors = (props: IErrorProps) => {
  const { appId } = props

  const [errors, setErrors] = useState<TError[]>()

  useEffect(() => {
    if (!errors) {
      services.error
        .list({
          appId,
        })
        .then(res => {
          const { content, error, msg } = res.data
          if (!error) {
            const contentRecords = (content as any[]).map(item => {
              return {
                timestamp: item.timestamp,
                ...JSON.parse(item['record']),
              }
            })
            setErrors(contentRecords)
          }
        })
    }
  })

  return (
    <div className="client-errors client-body">
      {errors && (
        <List
          grid={{ gutter: 12, xs: 1, sm: 2, md: 3, xxl:4 }}
          dataSource={errors}
          renderItem={item => {
            const { message, type, stack, timestamp } = item
            return (
              <List.Item>
                <Badge count={timestamp.length === 1 ? 0 : timestamp.length}>
                  <Card
                    size="small"
                    title={errorTypes[type]}
                    extra={errorIcons[type]}
                    actions={[<Icon type="profile" />]}
                  >
                    <div>{message}</div>
                  </Card>
                </Badge>
              </List.Item>
            )
          }}
        />
      )}
    </div>
  )
}

export const Errors = RErrors
