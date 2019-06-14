import './index.less'
import React, { useState, useEffect, Fragment } from 'react'
import { Empty, Button, List, Card, PageHeader, Select, Row, Col, message } from 'antd'

import { connect } from 'dva'
import { WebsiteInfo } from './WebsiteInfo'
import { NavTrending } from './NavTrending'
import { Placeholder } from './Placeholder'
import { Resource } from './Resource'
import { IModelWebsite } from '@/models/websites'
import { RecentErrors } from '@/components'

interface IDashboardProps {
  currentWebsite: IModelWebsite
}

function RDashboard(props: IDashboardProps) {
  const { currentWebsite } = props
  const { appId } = currentWebsite || { appId: '' }

  return (
    <div className="client-dashboard client-body">
      {!currentWebsite && <Placeholder />}
      {currentWebsite && (
        <Row gutter={12}>
          <Col xs={24} md={17} order={2}>
            <Card title="Trending" className="-overview">
              <NavTrending appId={appId} />
            </Card>
            <Card title="Resource" className="-resource">
              <Resource appId={appId} />
            </Card>
          </Col>
          <Col xs={24} md={7} order={1}>
            <WebsiteInfo info={currentWebsite} />
            <RecentErrors appId={appId} />
          </Col>
        </Row>
      )}
    </div>
  )
}

export const Dashboard = connect(({ websites }) => ({ websites }))(RDashboard)
