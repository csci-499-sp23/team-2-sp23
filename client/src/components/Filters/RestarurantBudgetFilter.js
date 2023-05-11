import { Box, TextField } from "@mui/material";

function BudgetFilter({ foodsInBudget, budget, setBudget }) {
   
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        width: "300px",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          borderLeft: 2,
          borderColor: "primary.main",
          paddingLeft: "0.5rem",
          height: "fit-content",
          marginBottom: "6px",
        }}
      >
        Menu Items ({foodsInBudget.length})
      </Box>
      <TextField
        id="standard-basic"
        label="Budget"
        value={budget}
        variant="standard"
        onChange={(event) => {
          setBudget(event.target.value);
        }}
        style={{ width: "6.5rem" }}
        InputProps={{
          type: "number",
        }}
      />
    </div>
  );
}

export default BudgetFilter;
