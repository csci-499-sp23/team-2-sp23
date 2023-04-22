import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import AddressSearch from "../AddressSearch";
import * as yup from "yup";

const classes = {
  formContainer: {
    display: "flex",
    justifyContent: "center",
    columnGap: "1rem",
    rowGap: "0.5rem",
    width: "100%",
    flexWrap: "wrap",
  },
  searchButton: {
    color: "primary.main",
    margin: 0,
    height: "120%",
    alignSelf: "flex-end",
  },
};

function FormikField({ formik, type, field, label, unit, style }) {
  return (
    <TextField
      error={Boolean(formik.touched[field] && formik.errors[field])}
      helperText={formik.touched[field] && formik.errors[field]}
      label={label}
      name={field}
      variant="standard"
      value={formik.values[field]}
      onChange={formik.handleChange}
      sx={{ color: "primary.main", margin: 0, ...style }}
      InputProps={{
        type: type,
        endAdornment: <InputAdornment position="start">{unit}</InputAdornment>,
      }}
    />
  );
}

function SearchField(props) {
  const validation = yup.object().shape({
    longitude: yup.number().required("Longitude is required"),
    latitude: yup.number().required("Latitude is required"),
    meters: yup
      .number()
      .min(20)
      .max(2000)
      .required("Search radius is required"),
    budget: yup.number().min(0).required("Budget should be at least $0"),
  });

  const formik = useFormik({
    initialValues: props.searchFields,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (data) => {
      props.updateFields(data);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={classes.formContainer}>
        <AddressSearch updateFields={props.updateFields}  />
      <div>
        <FormikField
          formik={formik}
          type="number"
          field="meters"
          label="Search Radius"
          unit="meters"
          style={{ width: "7rem", marginRight: "0.5rem" }}
        />
        <FormikField
          formik={formik}
          type="number"
          field="budget"
          label="Budget"
          unit="$"
          style={{ width: "4.5rem" }}
        />
        <IconButton type="submit" sx={classes.searchButton}>
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  );
}

export default SearchField;
