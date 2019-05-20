import React, { useEffect, useState, Fragment } from 'react'
import { Spin, Icon, DatePicker, Select, Form, Row, Col } from 'antd'
import moment from 'moment'
import { Chart, Global } from '@antv/g2'
import DataSet from '@antv/data-set'

import { randomString } from '@/utils/random-string'

import { services } from '@/services'
import { message } from 'antd'

interface INavTimingProps {
  appId: string
}
const { Item } = Form
const { RangePicker } = DatePicker

const slotId = randomString()
const defaultDateRangeValue = [moment().startOf('week'), moment().endOf('week')]
let resChart: Chart
const RResource = (props: INavTimingProps) => {

  const { appId } = props

  const [loading, setLoading] = useState(true)

  const [dateRange, setDateRange] = useState<moment.Moment[]>(defaultDateRangeValue)

  const updateGraph = () => {
    services.perf
      .resource({
        appId,
        startDate: dateRange[0].unix(),
        endDate: dateRange[1].unix(),
      })
      .then(res => {
        const { error, msg, content } = res.data
        if (error) {
          message.error(msg)
        } else {
          renderChart(content)
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    if (loading) {
      updateGraph()
    }
  })
 
  const genData = data => {
    var ds = new DataSet()
    var dv = ds.createView().source(data)
    dv.transform({
      type: 'fold',
      fields: ['dns', 'tcp', 'request', 'response'],
      key: 'section', // key字段
      value: 'value', // value字段
    })

    return dv
  }
  const renderChart = (data: any[]) => {
    const dv = genData(data)
    if (resChart && document.querySelector(`#${slotId} canvas`)) {
      resChart.changeData(dv)
      return
    }

    resChart = new Chart({
      container: document.getElementById(slotId) as any,
      forceFit: true,
      height: 400,
    })
    resChart.source(dv, {
      value: {
        formatter: (val: number) => val.toFixed(2),
      },
    })
    resChart.coord('rect').transpose()

    resChart.axis('name', {
      label: {
        offset: 12,
      },
    })
    resChart.scale('name', {
      alias: '',
    })
    resChart.scale('value', {
      alias: 'time used (ms)',
    })
    resChart
      .intervalStack()
      .position('name*value')
      .color('section')
    resChart.render()
  }

  return (
    <Fragment>
      <Row gutter={32}>
        <Col xs={24} xl={10}>
          <Item label="Date Range">
            <RangePicker
              defaultValue={defaultDateRangeValue as any}
              onChange={val => {
                setDateRange(val)
                setLoading(true)
              }}
              ranges={{
                Today: [moment().startOf('day'), moment().endOf('day')],
                'This Week': defaultDateRangeValue as any,
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              format="YYYY/MM/DD"
            />
          </Item>
        </Col>
      </Row>

      <Spin delay={200} spinning={loading} indicator={<Icon type="loading" />}>
        <div className="-res-timing" id={slotId} />
      </Spin>
    </Fragment>
  )
}

export const Resource = RResource
