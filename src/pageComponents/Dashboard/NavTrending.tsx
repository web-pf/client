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
const { Option } = Select
const options = [
  {
    key: 'dns',
    name: 'DNS',
  },
  {
    key: 'tcp',
    name: 'TCP',
  },
  {
    key: 'response',
    name: 'Response',
  },
  {
    key: 'dom',
    name: 'DOM',
  },
  {
    key: 'total',
    name: 'Total',
  },
]
const defaultDateRangeValue = [moment().startOf('week'), moment().endOf('week')]
const defaultIndicators = ['total', 'dns', 'dom', 'response', 'tcp']
let trendingChart: Chart
const slotId = randomString()
const RNavTrending = (props: INavTimingProps) => {
  const { appId } = props

  const [loading, setLoading] = useState(true)

  const [dateRange, setDateRange] = useState<moment.Moment[]>(defaultDateRangeValue)
  const [indicators, setIndicators] = useState<string[]>(defaultIndicators)

  const updateGraph = () => {
    services.perf
      .trending({
        appId,
        startDate: dateRange[0].unix(),
        endDate: dateRange[1].unix(),
        indicators: indicators.join(','),
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

  const renderChart = (data: any[]) => {
    if (trendingChart) {
      trendingChart.changeData(data)
      return
    }
    trendingChart = new Chart({
      container: document.getElementById(slotId) as any,
      forceFit: true,
      height: 300,
    })
    trendingChart.axis('date', {
      label: null,
      title: {
        textStyle: {
          fontSize: 12, // 文本大小
          textAlign: 'center', // 文本对齐方式
          fill: '#999', // 文本颜色
        },
      },
    })

    trendingChart.axis('value', {
      title: {
        textStyle: {
          fontSize: 12, // 文本大小
          textAlign: 'center', // 文本对齐方式
          fill: '#999', // 文本颜色
        },
      },
    })
    trendingChart.scale('value', {
      alias: 'time used (ms)',
    })
    trendingChart.source(data, {
      value: {
        formatter: (val: number) => val.toFixed(2),
      },
    })
    trendingChart
      .line()
      .position('date*value')
      .color('type', [
        '#ff4d4f',
        '#ff7a45',
        '#ffa940',
        '#facc14',
        '#bae637',
        '#73d13d',
        '#36cfc9',
        '#40a9ff',
      ])
    trendingChart.render()
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
        <Col xs={24} xl={14}>
          <Item label="Indicators">
            <Select
              mode="tags"
              defaultValue={defaultIndicators}
              onChange={val => {
                setIndicators(val as any)
                setLoading(true)
              }}
            >
              {options.map(item => {
                const { name, key } = item
                return <Option key={key}>{name}</Option>
              })}
            </Select>
          </Item>
        </Col>
      </Row>

      <Spin delay={200} spinning={loading} indicator={<Icon type="loading" />}>
        <div className="-nav-timing" id={slotId} />
      </Spin>
    </Fragment>
  )
}

export const NavTrending = RNavTrending
