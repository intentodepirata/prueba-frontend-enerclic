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
import dataset from "./utils/dataset";

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
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Seleccione el tipo de grafica"
        >
          {chartsTypes.map((item, index) => (
            <Button
              key={index}
              size="small"
              onClick={() => setSelectedChartIndex(index)}
              variant={selectedChartIndex === index ? "contained" : "outlined"}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Seleccione el tipo de contenido"
        >
          {contents.map((item, index) => (
            <Button
              key={index}
              size="small"
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
              <Line
                options={optionsBar}
                data={dataset(data, selectedContentIndex)}
              />
            )}
            {selectedChartIndex === 1 && (
              <Bar
                options={optionsBar}
                data={dataset(data, selectedContentIndex)}
              />
            )}
            {/* {selectedChartIndex === 2 && (
              <Doughnut
                options={optionsDonut}
                data={dataset(data, selectedContentIndex)}
              />
            )}
            {selectedChartIndex === 3 && (
              <Pie
                options={optionsDonut}
                data={dataset(data, selectedContentIndex)}
              />
            )}
            {selectedChartIndex === 4 && (
              <PolarArea
                options={options}
                data={dataset(data, selectedContentIndex)}
              />
            )}
            {selectedChartIndex === 5 && (
              <Radar
                options={optionsRadar}
                data={dataset(data, selectedContentIndex)}
              />
            )} */}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CustomChart;
