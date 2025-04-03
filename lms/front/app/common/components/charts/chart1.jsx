"use client";

import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function LineChart({ data }) {
  const cityData = [];
  const ageData = [];
  for (const d of data) {
    cityData.push(d.X);
    ageData.push(d.Y);
  }
  // console.log("print", ageData);
  const options = {
    title: {
      text: "My stock chart",
    },

    chart: {
      type: "column",
      backgroundColor: "white",
      plotBorderWidth: null,
      plotShadow: false,
      borderWidth: 0,
      plotBorderWidth: 0,
      zoomType: "xy",
      panKey: "ctrl",
      panning: true,
      followTouchMove: false,
    },
    xAxis: {
      categories: cityData,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "age",
      },
      labels: {
        format: "{value}%",
      },
    },
    legend: {
      enabled: false
    },
    tooltip: {
      headerFormat: "<b>{category}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },

    navigation: {
      buttonOptions: {
          align: 'right',
          verticalAlign: 'top'
      }
  },


    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
        //     bar: {
        //   grouping: false,
        // }
      },
      series: {
        colorByPoint: true,
      },
    },

    exporting: {
      enabled:true,
    },
    series: [{ name: cityData, data: ageData }],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr />
    </div>
  );
}
