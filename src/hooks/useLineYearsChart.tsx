import { useState, useEffect } from "react";

export function useLineYearsChart(data: any) {
  const [chart, setChart]: any = useState(null);

  useEffect(() => {
    if (data) {
      setChart({
        type: "line",
        height: 90,
        options: {
          crosshairs: {
            show: false,
          },
          chart: {
            sparkline: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#fff"],
          fill: {
            type: "solid",
            opacity: 1,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          yaxis: {
            min: 0,
            max: 100,
            show: false,
          },
          tooltip: {
            theme: "dark",
            fixed: {
              enabled: false,
            },
            x: {
              show: true,
            },
            y: {
              title: "Total Order",
            },
            marker: {
              show: false,
            },
          },
          xaxis: {
            categories: data.possibleYears,
          },
        },
        series: [
          {
            name: "Issues: ",
            data: data.issuesCounts,
          },
        ],
      });
    }
  }, [data]);

  return chart;
}
