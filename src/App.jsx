import { Box, CircularProgress, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import CustomDataGrid from "./components/CustomDataGrid/CustomDataGrid";
import CustomChart from "./components/CustomChart/CustomChart";
import CustomHighChart from "./components/CustomHighChart/CustomHighChart";

const App = () => {
  const [data, setData] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }es/datos/balance/balance-electrico?start_date=2019-07-01T11:07&end_date=2019-07-31T11:07&time_trunc=month`
      );
      const data = await res.json();
      setData(data);
      setIsloading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Container maxWidth="lg">
      <Typography textAlign={"center"} mb={5} variant="h2" color="initial">
        Grafica de Electricidad
      </Typography>
      <Box mb={5} textAlign={"center"}>
        {isloading ? <CircularProgress /> : <CustomChart data={data} />}
      </Box>
      <Box mb={5} textAlign={"center"}>
        {isloading ? <CircularProgress /> : <CustomHighChart data={data} />}
      </Box>
      <Box textAlign={"center"}>
        <Typography textAlign={"center"} mb={5} variant="h2" color="initial">
          Tabla de resultados
        </Typography>
        {isloading ? (
          <CircularProgress />
        ) : (
          <CustomDataGrid data={data} cargando={isloading} />
        )}
      </Box>
    </Container>
  );
};

export default App;
