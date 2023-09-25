import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useContext, useEffect } from "react";
import UserFilteringForm from "../../Forms/FilteringForms/UserFilteringForm/UserFIlteringForm";
import EatFitProContext from "../../store/context";

const unFilteredData = {
  name: null,
  surname: null,
  email: null,
  length: null,
  weight: null,
};

const UserList = () => {
  const context = useContext(EatFitProContext);

  const [filterData, setFilterData] = useState(unFilteredData);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpen = () => {
    setIsFilterOpen(true);
  };
  const handleClose = () => {
    setIsFilterOpen(false);
  };

  const url = "http://localhost:8080/user/get/filtered";

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(
      //   context.filterUserData.content
      //     ? context.filterUserData.content
      //     : unFilteredData
      // ),
      body: JSON.stringify(
        context.filterUserData
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data.content)
        setUserList(data.content);
        // context.setFilterUserData(data.content)
      });
  }, [context.filterUserData]);

  return (
    <div>
      <Button onClick={isFilterOpen ? handleClose : handleOpen}>
        <FilterListIcon style={{ cursor: "pointer" }} />
      </Button>

      {isFilterOpen && <UserFilteringForm />}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Surname</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Length</TableCell>
                <TableCell align="center">Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.surname}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.length}</TableCell>
                  <TableCell align="center">{row.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserList;
