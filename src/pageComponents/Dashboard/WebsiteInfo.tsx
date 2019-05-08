import React from 'react'
import { IModelWebsite } from '@/models/websites'
import { Card, Form } from 'antd'


interface IWebsiteProps {
  info: IModelWebsite
}

function RWebsiteInfo(props: IWebsiteProps) {
  const { name, url, description } = props.info || ({} as any)

  return (
    <Card title="About website">
      <a href={url} target="blank">
        {name}
      </a>
      <div>{description}</div>
    </Card>
  )
}

export const WebsiteInfo = RWebsiteInfo
