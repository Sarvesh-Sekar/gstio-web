import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { forwardRef } from "react";

interface ColumnData {
  width: number;
  label: string;
  dataKey: string;
  numeric?: boolean;
  icon?: string;
  iconColor?: string;
  onClick?: () => void;
}

interface RowData {
  productId: number;
  productCode: string;
  userId: string;
  productName: string;
  pricePerUnit: number;
  cgst: number;
  sgst: number;
  igst: number;
  productPrice: number;
}

interface CommonTableProps {
  columns: ColumnData[];
  data: RowData[];
  endReached?: () => void;
  loader?: boolean;
}

export default function CommonTable({
  columns,
  data,
  endReached,
  loader,
}: CommonTableProps) {
  const VirtuosoTableComponents: TableComponents<RowData, number> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer
        component={Paper}
        {...props}
        ref={ref}
        sx={{ fontFamily: "Lexend, sans-serif" }} // 👈 font applied
      />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          fontFamily: "Lexend, sans-serif", // 👈 font applied
        }}
      />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead
        {...props}
        ref={ref}
        sx={{ fontFamily: "Lexend, sans-serif" }}
      />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody
        {...props}
        ref={ref}
        sx={{ fontFamily: "Lexend, sans-serif" }}
      />
    )),

    // ✅ Use Footer instead of TableFoot
    Footer: () =>
      loader ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      ) : null,
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
              fontFamily: "Lexend, sans-serif", // 👈 font applied
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: RowData) {
    return (
      <>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            // align={column.numeric || false ? "right" : "center"}
            align="center"
            sx={{ fontFamily: "Lexend, sans-serif" }} // 👈 font applied
          >
            {column?.icon ? (
              <column.icon
                className={`cursor-pointer ${ column?.iconColor ?  `text-[${column?.iconColor}]` : `text-primary` } w-full`}
                onClick={() => column.onClick(row.productId)}
              />
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <Paper
      style={{ height: 400, width: "100%", fontFamily: "Lexend, sans-serif" }}
    >
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        endReached={endReached}
        className="border-2 custom-scrollbar"
      />
    </Paper>
  );
}
