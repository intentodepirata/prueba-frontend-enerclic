export default function options(data, chartType) {
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
      text: data.data.type,
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
  return options;
}
