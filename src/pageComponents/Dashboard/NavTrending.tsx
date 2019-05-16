import React, { useEffect, useState, Fragment } from 'react'
import { Spin, Icon, DatePicker, Select, Form, Row, Col } from 'antd'
import moment from 'moment'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

import { randomString } from '@/utils/random-string'

import { services } from '@/services'
import { message } from 'antd'

interface INavTimingProps {
  appId: string
}
const { Item } = Form
const { RangePicker } = DatePicker
const { Option } = Select
const options = [
  {
    key: 'dns',
    name: 'DNS Lookup',
  },
  {
    key: 'tcp',
    name: 'TCP connection',
  },
  {
    key: 'response',
    name: 'Response duration',
  },
  {
    key: 'dom',
    name: 'DOM rendering',
  },
  {
    key: 'total',
    name: 'Total timing',
  },
]
const defaultDateRangeValue = [moment().startOf('week'), moment().endOf('week')]
const RNavTrending = (props: INavTimingProps) => {
  const slotId = randomString()

  const { appId } = props

  const [hasData, setHasData] = useState(false)
  const [isInitialMount, setIsInitialMount] = useState(true)

  const [dateRange, setDateRange] = useState<moment.Moment[]>(defaultDateRangeValue)
  const [indicators, setIndicators] = useState<string[]>(['total'])

  const updateGraph = () => {
    services.perf.trending({
      appId,
      startDate: dateRange[0].unix(),
      endDate: dateRange[1].unix(),
      indicators: indicators.join(','),
    })
  }
  useEffect(() => {
    updateGraph()
  })
  // useEffect(() => {
  //   if (isInitialMount) {
  //     services.perf.navTimingTrending({ appId }).then(res => {
  //       const { content, error, msg } = res.data
  //       if (!error) {
  //         renderChart(content)
  //       } else {
  //         message.error(msg)
  //       }
  //     })
  //   }
  // })

  const renderChart = (data: any[]) => {
    const ticks = []
    // Array.from(new Array(Math.floor(data.length / 10)).keys()).forEach(key => {
    //   ticks.push(data[key * 10]['date'])
    // })

    var chart = new Chart({
      container: slotId,
      forceFit: true,
      height: 400,
    })
    chart.source(data)
    chart.scale('value', {
      min: 0,
    })
    chart.scale('date', {
      min: 0,
      range: [0, 1],
      ticks,
      alias: 'Date',
    })

    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    })
    chart.line().position('date*time used')
    chart
      .point()
      .position('date*time used')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      })
    chart.render()
  }

  return (
    <Fragment>
      <Row>
        <Col xs={24} xl={12}>
          <Item label="Date Range">
            <RangePicker
              defaultValue={defaultDateRangeValue as any}
              onChange={val => setDateRange(val)}
              ranges={{
                Today: [moment().startOf('day'), moment().endOf('day')],
                'This Week': defaultDateRangeValue as any,
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              format="YYYY/MM/DD"
            />
          </Item>
        </Col>
        <Col xs={24} xl={12}>
          <Item label="Indicators">
            <Select
              mode="tags"
              defaultValue={['total']}
              onChange={val => setIndicators(val as any)}
            >
              {options.map(item => {
                const { name, key } = item
                return <Option key={key}>{name}</Option>
              })}
            </Select>
          </Item>
        </Col>
      </Row>

      <Spin spinning={!hasData} indicator={<Icon type="loading" />}>
        <div className="-nav-timing" id={slotId} />
      </Spin>
    </Fragment>
  )
}

export const NavTrending = RNavTrending
