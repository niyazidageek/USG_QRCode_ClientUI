import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function useChart(data: any, options: any) {
  const [chart, setChart]: any = useState(null);

  useEffect(() => {
    if (data && options) {
      setChart({
        height: 480,
        type: "bar",
        options: {
          chart: {
            id: "bar-chart",
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: true,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
            },
          },
          yaxis: {
            labels: {
              formatter: (value:any) => {
                return parseInt(value)
              },
            }
          },
          xaxis: {
            type: "category",
            categories: months.filter((m: any, index) => index < data.length),
          },
          legend: {
            show: true,
            fontSize: "14px",
            fontFamily: `'Roboto', sans-serif`,
            position: "bottom",
            offsetX: 20,
            labels: {
              useSeriesColors: false,
            },
            markers: {
              width: 16,
              height: 16,
              radius: 5,
            },
            itemMargin: {
              horizontal: 15,
              vertical: 8,
            },
          },
          fill: {
            type: "solid",
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            show: true,
          },
        },
        series: [
          {
            name: "Scans",
            data: data,
          },
        ],
      });
    }
  },[data]);

  return chart;
}
