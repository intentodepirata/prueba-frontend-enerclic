import { Button, Stack } from "@mui/material";
import {
  GridColumnHeaderFilterIconButton,
  GridColumnHeaderMenu,
  GridColumnMenu,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export default function CustomGridToolbar() {
  const handleResetFilters = () => {
    localStorage.removeItem("columnConfig");
    window.location.reload();
  };
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <GridToolbarQuickFilter
        placeholder="Buscar por cualquier campo de la tabla"
        sx={{ width: "50%", p: 2 }}
      />
      <Stack spacing={2} direction="row" mr={2}>
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleResetFilters}
          variant="contained"
        >
          Restablecer Filtros
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
}
