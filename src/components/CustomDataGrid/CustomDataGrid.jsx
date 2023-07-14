import { Box, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomGridToolbar from "./utils/CutomGridToolbar";
import CustomGridFooter from "./utils/CustomGridFooter";
import CustomNoRowsOverlay from "./utils/CustomNoRowsOverlay";
import { columns } from "./utils/columns";
import moment from "moment/moment";

const CustomDataGrid = ({ data, cargando }) => {
  const [columnsUserPreset, setColumnsUserPreset] = useState(
    JSON.parse(localStorage.getItem("columnConfig"))
  );
  if (!data || !data.included || !data.included[0].attributes.content) {
    return null;
  }

  useEffect(() => {
    localStorage.setItem("columnConfig", JSON.stringify(columnsUserPreset));
  }, [columnsUserPreset]);

  const handleColumnVisibilityChange = (params) => {
    setColumnsUserPreset({
      columns: {
        columnVisibilityModel: {
          ...params,
        },
      },
    });
  };
  const rows = data.included.reduce((acc, group) => {
    const groupRows = group.attributes.content.map((item) => {
      const { type, id, groupId, attributes } = item;
      const values = attributes.values[0];
      return {
        id,
        groupId,
        datetime: moment(values.datetime).format("DD-MM-YYYY HH:mm"),
        type,
        percentage: values.percentage,
        value: values.value,
      };
    });
    return [...acc, ...groupRows];
  }, []);

  return (
    <DataGrid
      sx={{ minHeight: 400 }}
      rows={rows}
      columns={columns}
      initialState={columnsUserPreset}
      slots={{
        toolbar: CustomGridToolbar,
        loadingOverlay: LinearProgress,
        footer: CustomGridFooter,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      loading={Boolean(cargando)}
      onColumnVisibilityModelChange={(params) => {
        handleColumnVisibilityChange(params);
      }}
    />
  );
};

export default CustomDataGrid;
