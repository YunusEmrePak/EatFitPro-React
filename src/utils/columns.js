import React, { useContext } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EatFitProContext from "../../../store/context";

const GetUserColumns = () => {
  const context = useContext(EatFitProContext);

  return [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      sortable: false,
      filterable: false,
    },
    {
      field: "length",
      headerName: "Length",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (value) => {
        return (
          <DeleteIcon
            type="submit"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              context.openDeleteDialog(value);
            }}
          />
        );
      },
    },
  ];
};

export { GetUserColumns };
