import './index.less'
import React, { useState, useEffect, Fragment } from 'react'
import { Empty, Button, Card, PageHeader, Select, Row, Col, message } from 'antd'

import { connect } from 'dva'
import { Dispatch } from 'redux'

import { services } from '@/services'
import { IModelWebsite } from '@/models/websites'
import { SubHeader } from '@/components'

import { Placeholder } from './Placeholder'
import { WebsiteInfo } from './WebsiteInfo'
import { NavSharing } from './NavSharing'
import { NavTrending } from './NavTrending'

interface IDashboardProps {
  dispatch: Dispatch
  websites: IModelWebsite[]
}

function RDashboard(props: IDashboardProps) {
  const { dispatch, websites } = props
  const [currentWebsite, setCurrentWebsite] = useState<any>()

  const hasNoWebsites = websites && !websites.length

  useEffect(() => {
    !websites &&
      services.website.list().then(res => {
        const { error, msg, payload } = res.data
        if (!error) {
          dispatch({
            type: 'websites/save',
            payload,
          })
        } else {
          message.error(msg)
        }
      })
  })

  useEffect(() => {
    if (!currentWebsite && websites && websites.length) {
      setCurrentWebsite(websites[0])
    }
  })

  return (
    <Fragment>
      <SubHeader
        label="Dashboard"
        append={
          websites &&
          websites.length && (
            <Select
              defaultValue={websites[0].name}
              onChange={selectedId =>
                setCurrentWebsite(websites.filter(item => String(item.websiteId) === selectedId)[0])
              }
            >
              {websites &&
                websites.map(website => {
                  const { websiteId, name, url } = website

                  return <Select.Option key={websiteId}>{name}</Select.Option>
                })}
            </Select>
          )
        }
      />
      <div className="client-dashboard client-body">
        {hasNoWebsites && <Placeholder />}
        {!hasNoWebsites && currentWebsite && (
          <Row gutter={12} >
            <Col xs={24} xl={16} order={2}>
              <Card title="Trending" className="-overview">
                <NavTrending appId={currentWebsite.appId} />
              </Card>
            </Col>
            <Col xs={24} xl={8} order={1}>
              <WebsiteInfo info={currentWebsite} />
              <Card title="">No alerts</Card>
            </Col>
          </Row>
        )}
      </div>
    </Fragment>
  )
}

export const Dashboard = connect(({ websites }) => ({ websites }))(RDashboard)
