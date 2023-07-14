export const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "groupId", headerName: "Tipo", width: 200 },
  { field: "datetime", headerName: "Fecha", width: 150 },
  { field: "type", headerName: "Fuente", width: 150 },
  {
    field: "percentage",
    headerName: "Porcentaje",
    width: 200,
    valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
  },
  {
    field: "value",
    headerName: "Total",
    width: 150,
    valueFormatter: (params) => ` ${params.value.toFixed(2)} (kWh)`,
  },
];
