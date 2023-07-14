import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button, ButtonGroup, Typography } from "@mui/material";
import accessibility from "highcharts/modules/accessibility";

accessibility(Highcharts);

const CustomHighChart = ({ data }) => {
  const [chartType, setChartType] = useState("column");
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = chartRef.current.chart;
      chart.update({});
    }
  }, [data]);

  if (!data || !data.included || data.included.length === 0) {
    return <Typography>No hay datos</Typography>;
  }
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };
  const included = data.included;

  const seriesData = included.flatMap((item) =>
    item.attributes.content
      .filter((subItem) => subItem.attributes.composite)
      .map((subItem) => ({
        name: subItem.type,
        data: [parseFloat(subItem.attributes.total.toFixed(2))],
      }))
  );

  const totalSum = seriesData
    .reduce((sum, series) => sum + series.data[0], 0)
    .toFixed(2);

  const columnOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: data.data.type,
    },
    xAxis: {
      categories: [`Total: ${totalSum} mWh`],
    },
    yAxis: {
      title: {
        text: "Generación (MWh)",
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{series.name}: {point.y}",
          style: {
            fontWeight: "bold",
            color: "contrast",
            textOutline: "2px contrast",
          },
        },
      },
    },
    series: seriesData,
  };

  const pieOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Total balance eléctrico producido",
    },
    xAxis: {
      tittle: `Total: ${totalSum} mWh`,
    },
    yAxis: {
      title: {
        text: undefined,
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        innerSize: "45%",
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f}%",
          distance: 5,
          style: {
            fontWeight: "bold",
            color: "contrast",
            textOutline: "2px contrast",
          },
        },
      },
    },
    series: [
      {
        name: "Series",
        colorByPoint: true,
        data: seriesData.map((series) => ({
          name: series.name,
          y: series.data[0],
        })),
      },
    ],
  };

  const options = chartType === "column" ? columnOptions : pieOptions;
  return (
    <div>
      <Typography variant="h5" color="initial">
        Totales
      </Typography>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <ButtonGroup>
        <Button
          variant={chartType === "column" ? "contained" : "outlined"}
          onClick={() => handleChartTypeChange("column")}
          size="small"
        >
          Bar
        </Button>
        <Button
          variant={chartType === "pie" ? "contained" : "outlined"}
          onClick={() => handleChartTypeChange("pie")}
          size="small"
        >
          Pie
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomHighChart;
