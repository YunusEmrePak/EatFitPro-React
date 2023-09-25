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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const UserList = () => {
  const context = useContext(EatFitProContext);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  let userListSize = context.userListSize;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpen = () => {
    setIsFilterOpen(true);
  };
  const handleClose = () => {
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const url = `http://localhost:8080/user/get/filtered?page=${
      pageNumber - 1
    }&size=${userListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setUserList(data.content);
      });
  }, [context.filterUserData, pageNumber, userListSize]);

  return (
    <div>
      <Button onClick={isFilterOpen ? handleClose : handleOpen}>
        <FilterListIcon style={{ cursor: "pointer" }} />
      </Button>

      {isFilterOpen && <UserFilteringForm />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} style={{ maxHeight: 350, marginTop: 20 }}>
            <Table
              sx={{ minWidth: 650, maxHeight: 400 }}
              size="small"
              aria-label="a dense table"
              style={{position: "relative"}}
            >
              <TableHead
              >
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Surname</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Length</TableCell>
                  <TableCell align="left">Weight</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.surname}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.length}</TableCell>
                    <TableCell align="left">{row.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Stack spacing={2} style={{ marginTop: 20 }}>
        <Pagination
          count={10}
          color="primary"
          onChange={(event, page) => {
            if (page !== pageNumber) {
              // setIsLoading(true);
              setPageNumber(page);
            }
          }}
        />
      </Stack>
    </div>
  );
};

export default UserList;
