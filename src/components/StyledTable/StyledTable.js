import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: 0,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "td, th": {
    border: 0,
  },
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#1B1B1B" : "rgba(234, 234, 234, 0.3)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
