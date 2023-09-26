import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TablePagination = (props) => {
  return (
    <Stack spacing={2} style={{ marginTop: 20 }}>
      <Pagination
        count={props.totalPage}
        color="primary"
        page={props.pageNumber}
        onChange={(event, page) => {
          if (page !== props.pageNumber) {
            props.setPageNumber(page);
          }
        }}
      />
    </Stack>
  );
};

export default TablePagination;
