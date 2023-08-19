import React, { useState } from "react"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

import Chip from "./Chip"

import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import IconButton from "@mui/material/IconButton"

import { getChipColor } from "../utils/colors"
import { WORK_STATUS } from "../utils/constants"

export default function DenseTable({ rows, onDeletePress }) {
  const [expandedRow, setExpandedRow] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="Timesheet"
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                fontWeight: "bold",
                fontFamily: "Montserrat",
                color: "var(--text-primary)",
              },
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell align="left">Día</TableCell>
              <TableCell align="left">Entrada</TableCell>
              <TableCell align="left">Saída</TableCell>
              <TableCell align="right" className="hide-on-mobile">
                Balance
              </TableCell>
              <TableCell className="hide-on-mobile" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <>
                  <TableRow
                    key={rowIndex}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : null,
                    }}
                  >
                    <TableCell align="left">
                      <IconButton onClick={() => handleRowClick(rowIndex)}>
                        {expandedRow === rowIndex ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <span className="tableSpan">{row.date}</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="tableSpan">{row.start}</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="tableSpan">{row.end}</span>
                    </TableCell>
                    <TableCell align="right" className="hide-on-mobile">
                      <Chip text={row.result} {...getChipColor(row.status)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        sx={{
                          color: "var(--secondary)",
                          cursor: "pointer",
                          ":hover": {
                            transform: "scale(1.15)",
                          },
                        }}
                        onClick={() => onDeletePress(row.id)}
                      >
                        Borrar
                      </DeleteIcon>
                    </TableCell>
                  </TableRow>
                  {expandedRow === rowIndex && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="details">
                          <div>
                            <span>{row.shiftDuration}</span>
                            <span>Xornada</span>
                          </div>
                          <div>
                            <span>{row.total}</span>
                            <span>Traballo</span>
                          </div>
                          <div>
                            <span>{row.break}</span>
                            <span>Descanso</span>
                          </div>
                          <div>
                            <span>{row.result}</span>
                            <span>
                              {row.status === WORK_STATUS.UNDERWORKED
                                ? "Debes"
                                : "Recuperas"}
                            </span>
                          </div>
                          <div>
                            <span>
                              {row.status === WORK_STATUS.FREE_DAY
                                ? "Sí"
                                : "Non"}
                            </span>
                            <span>Día libre</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                sx={{
                  "& .MuiTablePagination-actions": {
                    margin: 0,
                  },
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Elementos por páxina"
                SelectProps={{
                  inputProps: { "aria-label": "Elementos por páxina" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <style jsx>{`
        .tableSpan {
          font-family: "Montserrat";
          font-size: 0.9rem;
          font-weight: 600;
        }
        .details {
          display: flex;
          gap: var(--gutter6x);
          fontFamily: "Montserrat";
        }
        .details > div {
          display: flex;
          flex-direction: column;
          padding: var(--gutter);
          border-radius: var(--border-radius);
          width: fit-content;
        }
        .details > div > span:first-child {
          font-weight: bold;
          font-size: 0.9rem;
        }
        .details > div > span:last-child {
          font-size: 0.8rem;
        }
        .details > div > span {
          font-family: "Montserrat";
        }
        @media (max-width: 600px) {
          .container {
            margin-top: 0;
          }
          .container > div {
            flex-direction: column;
            gap: var(--gutter);
          }
          .details {
            flex-direction: column;
            gap: var(--gutter);
          }
          :global(.hide-on-mobile) {
            display: none;
          }
          .MuiTablePagination-actions {
            margin: 0;
          }
      `}</style>
    </>
  )
}
