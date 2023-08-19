import { useEffect, useState } from "react"
import useUser from "hooks/useUser"
import * as XLSX from "xlsx"

import { DateTimePicker } from "@mui/x-date-pickers"
import { Snackbar } from "@mui/material"

import AddButton from "components/AddButton"
import Button from "components/Button"
import Chip from "components/Chip"
import PageLayout from "components/PageLayout"
import Table from "components/Table"

import DeleteIcon from "@mui/icons-material/Delete"
import { FileDownload } from "@mui/icons-material"

import { dateFormatter, msToString } from "utils/time"
import { deleteAllEntries, deleteEntry, fetchUserEntries } from "../../firebase/client"
import { getChipColor } from "utils/colors"
import { WORK_STATUS } from "utils/constants"

const STATES = {
  IDLE: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function Home() {
  const [timesheet, setTimesheet] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState(STATES.LOADING)
  const [message, setMessage] = useState("")
  const user = useUser()

  useEffect(() => {
    if (user) {
      fetchUserEntries(user.id).then((result) => {
        setTimesheet(result.entries)
        setTotal(result.total)
        setStatus(STATES.IDLE)
      }).catch((err) => {
        console.log(err)
        setStatus(STATES.ERROR)
        setMessage("Erro ao cargar")
      })
    }
  }, [user])

  const onDeleteRow = (rowId) => {
    setStatus(STATES.LOADING)
    deleteEntry(rowId).then(() => {
      setMessage("Eliminado correctamente")
      setTimesheet(timesheet.filter((row) => row.id !== rowId))
      setStatus(STATES.SUCCESS)
      // TODO update total
    }).catch((err) => {
        console.log(err)
        setStatus(STATES.ERROR)
        setMessage("Erro ao eliminar a entrada seleccionada")
    })
  }

  const onExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      timesheet.map((row) => ({
        Día: row.date,
        Entrada: row.start,
        Saída: row.end,
        Xornada: row.shiftDuration,
        Traballado: row.total,
        Descanso: row.break,
        Estado: row.status === WORK_STATUS.UNDERWORKED ? "Debes" : row.status === WORK_STATUS.WORKING ? "Correcto" : "Recuperas",
        Balance: row.result,
        "Día Libre": row.status === WORK_STATUS.FREE_DAY ? "Sí" : "Non",
      }))
    )
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "contahoras.xlsx")
  }

  const onDeleteAll = () => {
    setStatus(STATES.LOADING)
    deleteAllEntries(user.id).then(() => {
      setMessage("Eliminado correctamente")
      setTimesheet([])
      setTotal(0)
      setStatus(STATES.SUCCESS)
    }).catch((err) => {
      console.log(err)
      setStatus(STATES.ERROR)
      setMessage("Erro ao eliminar as entradas")
    })
  }

  return (
    <>
      <PageLayout>
        {status === STATES.LOADING && <section><img src="/spinner.gif" alt="Loading" /></section>}
        {status !== STATES.LOADING && timesheet.length === 0 && 
          <section>
            <h1>Engade o teu primeiro rexistro</h1>
            <AddButton />
          </section>
        }
        {status !== STATES.LOADING && timesheet.length > 0 && <>
          <section className="controls">
            <div className="actions">
              <div>
                <div>
                  <label>Busca unha data</label>
                  <DateTimePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    format="D/MM/YY"
                    sx={{
                      "& input": {
                        fontFamily: "Montserrat",
                        color: "var(--text-primary)",
                        padding: "var(--gutter)",
                        cursor: "pointer",
                      },
                      "& div": {
                        borderRadius: "var(--border-radius)",
                        backgroundColor: "var(--white)",
                      },
                    }}
                  />
                </div>
                <Button onClick={onDeleteAll}>
                  <DeleteIcon />
                  <span>Borrar todo</span>
                </Button>
                <AddButton />
              </div>
              <div>
                <Button onClick={onExportToExcel}>
                  <FileDownload />
                  <span>Exportar</span>
                </Button>
              </div>
            </div>
            <div className="total">
              <Chip
                  text={`${total > 0 ? "Recuperas" : "Debes"} ${msToString(total)}`}
                  {...getChipColor(
                  total > 0 ? WORK_STATUS.OVERWORKED : WORK_STATUS.UNDERWORKED
                )}
                />
            </div>
          </section>
          <Table 
            rows={
              timesheet.filter((row) => 
                !selectedDate 
                || isNaN(selectedDate) 
                || !isFinite(selectedDate) 
                || row.date === dateFormatter.format(selectedDate))
            }
            onDeletePress={onDeleteRow}
          />
        </>}
        <Snackbar
          open={status === STATES.ERROR}
          autoHideDuration={3000}
          onClose={() => setStatus(STATES.INITIAL)}
          message={message}
          sx={{
              "& div": {
                  backgroundColor: "var(--error)",
                  color: "white",
                  borderRadius: "var(--border-radius)",
              },
          }}
        />
        <Snackbar
          open={status === STATES.SUCCESS}
          autoHideDuration={3000}
          onClose={() => setStatus(STATES.INITIAL)}
          message={"Eliminado correctamente"}
          sx={{
              "& div": {
                  backgroundColor: "var(--success)",
                  color: "white",
                  borderRadius: "var(--border-radius)",
              },
          }}
        />
      </PageLayout>
      <style jsx>{`
        .controls {
          display: flex;
          flex-direction: column;
          gap: var(--gutter);
          margin-bottom: var(--gutter);
        }
        .actions {
          display: flex;
          justify-content: space-between;
        }
        .controls > div > div {
          display: flex;
          gap: var(--gutter);
          align-items: end;
        }
        .controls > div > div > div {
          display: flex;
          flex-direction: column;
          gap: var(--gutter);
        }
        .total {
          display: flex;
          justify-content: flex-end;
        }
        h1 {
          color: var(--secondary);
          font-weight: bold;
          font-size: 2rem;
          margin: var(--gutter);
          text-align: center;
        }
        @media screen and (max-width: 720px) {
          .controls {
            flex-direction: column;
            align-items: start;
          }
          .controls > div > div {
            align-items: start;
          }
          .actions {
            flex-direction: column;
            gap: var(--gutter);
            align-items: start;
          }
          .actions > div {
            flex-direction: column;
            gap: var(--gutter);
          }
          .total {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  )
}
