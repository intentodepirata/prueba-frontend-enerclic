//Importamos los componentes
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  LineElement,
} from "chart.js";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import {
  chartsTypes,
  options,
  optionsBar,
  optionsDonut,
  optionsRadar,
} from "./utils/options";

// Contruimos la grafica
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomChart = ({ data }) => {
  const [selectedContentIndex, setSelectedContentIndex] = useState(0);
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);

  //Como el componente se renderiza en el DOM antes de que lleguen los datos, se debe hacer la validación
  if (!data) {
    return null;
  }
  const { included } = data;

  const contents = included.map((item) => item.type);

  // Extraemos el array de contenidos y eliminamos el total
  const labels = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.type);

  // Extraemos los totales y eliminamos el total
  const totales = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.attributes.total);

  // Extraemos los colores y eliminamos el total
  const colores = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.attributes.color);

  // Construimos el objeto de dataset
  const dataset = {
    label: "Balance eléctrico",
    data: totales,
    borderColor: colores,
    backgroundColor: colores,
  };

  // Le asignamos los datos
  const chartData = {
    labels,
    datasets: [dataset],
  };
  return (
    <>
      <Box>
        <Typography variant="h5" color="initial" mb={2}>
          Seleccione Tipo de Energia
        </Typography>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="outlined primary button group"
        >
          {contents.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelectedContentIndex(index)}
              variant={
                selectedContentIndex === index ? "contained" : "outlined"
              }
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box mt={2}>
        {selectedChartIndex !== null && (
          <Box mb={2} minHeight={300}>
            {selectedChartIndex === 0 && (
              <Bar options={optionsBar} data={chartData} />
            )}
            {selectedChartIndex === 1 && (
              <Line options={optionsBar} data={chartData} />
            )}
            {selectedChartIndex === 2 && (
              <Doughnut options={optionsDonut} data={chartData} />
            )}
            {selectedChartIndex === 3 && (
              <Pie options={optionsDonut} data={chartData} />
            )}
            {selectedChartIndex === 4 && (
              <PolarArea options={options} data={chartData} />
            )}
            {selectedChartIndex === 5 && (
              <Radar options={optionsRadar} data={chartData} />
            )}
          </Box>
        )}
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="outlined primary button group"
        >
          {chartsTypes.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelectedChartIndex(index)}
              variant={selectedChartIndex === index ? "contained" : "outlined"}
              size="small"
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </>
  );
};

export default CustomChart;
