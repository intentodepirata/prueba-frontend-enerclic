export const optionsBar = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Generación (MWh)",
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
export const options = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  responsive: true,

  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
export const optionsDonut = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  responsive: true,
  dataLabels: {
    enabled: true,
  },
  plugins: {
    legend: {
      position: "bottom",
      align: "center",
      labels: {
        boxWidth: 10,
      },
    },
  },
};

export const optionsRadar = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  responsive: true,
  plugins: {
    legend: {
      position: "left",
      align: "start",
      labels: {
        boxWidth: 10,
      },
    },
  },
  scale: {
    angleLines: {
      display: false,
    },
    ticks: {
      beginAtZero: true,
    },
  },
};

export const chartsTypes = [
  "Lineas",
  "Barras",
  // "Donut",
  // "Circular",
  // "PolarArea",
  // "Radar",
];
