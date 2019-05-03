import './index.less'
import React, { useState } from 'react'
import { Empty, Button, Card, PageHeader } from 'antd'
import { Placeholder } from './Placeholder'
import { Route } from 'react-router-dom'
import { BreadcrumbProps } from 'antd/lib/breadcrumb'

function RDashboard() {
  const initialRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
  ]
  const [breadcrumb, setBreadcrumb] = useState<any>(initialRoutes)
  return (
    <div className="client-dashboard client-body">
      <PageHeader title="Dashboard" breadcrumb={breadcrumb} />
      <Placeholder />
      <Route path="/dashboard/register" render={() => 123} />
    </div>
  )
}

export const Dashboard = RDashboard
