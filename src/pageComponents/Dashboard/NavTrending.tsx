import React, { useEffect, useState } from 'react'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

import { randomString } from '@/utils/random-string'

import { services } from '@/services'
import { message } from 'antd'

interface INavTimingProps {
  appId: string
}

const RNavTrending = (props: INavTimingProps) => {
  const slotId = randomString()

  const { appId } = props

  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    if (!hasData) {
      services.perf.navTimingTrending({ appId }).then(res => {
        const { content, error, msg } = res.data
        if (!error) {
          renderChart(content)
        } else {
          message.error(msg)
        }
      })
    }
  })

  const renderChart = (data: any[]) => {
    const ticks = []
    Array.from(new Array(Math.floor(data.length / 10)).keys()).forEach(key => {
      ticks.push(data[key * 10]['date'])
    })
    
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

  return <div className="-nav-timing" id={slotId} />
}

export const NavTrending = RNavTrending
