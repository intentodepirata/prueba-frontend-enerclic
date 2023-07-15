import { Box, CircularProgress, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CustomDataGrid from "./components/CustomDataGrid/CustomDataGrid";
import CustomChart from "./components/CustomChart/CustomChart";
import CustomHighChart from "./components/CustomHighChart/CustomHighChart";

const App = () => {
  const [balance, setBalance] = useState(null);
  const [demanda, setDemanda] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [url, setUrl] = useState("");
  const [urlDemanda, setUrlDemanda] = useState("");

  //Produccion
  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }es/datos/balance/balance-electrico?start_date=2019-07-01T11:07&end_date=2019-07-31T11:07&time_trunc=month`
      );
      const data = await res.json();
      setBalance(data);
      console.log(data);
      setIsloading(false);
    };
    fetchData();
  }, [url]);

  //Demanda
  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }es/datos/demanda/ire-general?start_date=2018-01-01T00:00&end_date=2018-01-31T23:59&time_trunc=month&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`
      );
      const data = await res.json();
      setDemanda(data);
      console.log(data);
      setIsloading(false);
    };
    fetchData();
  }, [urlDemanda]);

  return (
    <Container maxWidth="lg">
      <Typography textAlign={"center"} mb={5} variant="h2" color="initial">
        Grafica de Electricidad
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box textAlign={"center"}>
          <Box mb={5} textAlign={"center"}>
            {isloading ? (
              <CircularProgress />
            ) : (
              <CustomHighChart data={balance} />
            )}
          </Box>
          <Typography variant="p" color="initial" fontWeight={"bold"} mb={2}>
            Detalle por Tipo de Energia
          </Typography>
          <Box mb={5} textAlign={"center"}>
            {isloading ? <CircularProgress /> : <CustomChart data={balance} />}
          </Box>

          <Box>
            {isloading ? (
              <CircularProgress />
            ) : (
              <CustomDataGrid data={balance} cargando={isloading} />
            )}
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" color="primary">
            Demanda
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
