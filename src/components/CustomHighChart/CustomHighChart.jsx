import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import accessibility from "highcharts/modules/accessibility";
import options from "./utils/options";

accessibility(Highcharts);

const CustomHighChart = ({ data }) => {
  const [chartType, setChartType] = useState("column");

  if (!data) {
    return null;
  }
  const { description } = data.data.attributes;
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        <ButtonGroup>
          <Button
            variant={chartType === "column" ? "contained" : "outlined"}
            onClick={() => handleChartTypeChange("column")}
            size="small"
          >
            Barras
          </Button>
          <Button
            variant={chartType === "pie" ? "contained" : "outlined"}
            onClick={() => handleChartTypeChange("pie")}
            size="small"
          >
            Circular
          </Button>
        </ButtonGroup>
      </Box>

      <HighchartsReact
        highcharts={Highcharts}
        options={options(data, chartType)}
      />
      <Typography textAlign={"left"} variant="subtitle1" color="initial" mb={1}>
        {description}
      </Typography>
    </>
  );
};

export default CustomHighChart;
