import Table from "components/Table"
import PageLayout from "components/PageLayout"
import { useCallback, useEffect, useState } from "react"
import Button from "components/Button"
import { useRouter } from "next/router"
import useUser from "hooks/useUser"

export default function Home() {
  const [timesheet, setTimesheet] = useState([])
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    user && fetch("/api/timesheet")
      .then((response) => response.json())
      .then((data) => {
        setTimesheet(data)
      })
  }, [user])

  const onAdd = useCallback(() => {
    router.push("/compose/entry")
  }, [])

  return (
    <>
      <PageLayout>
        <Button onClick={onAdd} primary>Engadir</Button>
        <Table rows={timesheet} />
        {/* {timesheet.map((entry) => (
          <article key={entry.id}>
            <div>
              <p>{entry.start}</p>
              <p>{entry.end}</p>
            </div>
            <div>
              <p>{entry.hours}</p>
              <p>{entry.shift}</p>
              <p>{entry.balance}</p>
            </div>
          </article>
        ))} */}
      </PageLayout>
      <style jsx>{`
        article {
          display: flex;
          flex-direction: column;
          gap: var(--gutter);
          margin-bottom: var(--gutter2x);
        }
        article > div {
          display: flex;
          justify-content: space-between;
          gap: var(--gutter);
        }
        p {
          font-size: 0.8rem;
          border-radius: var(--border-radius);
          padding: var(--gutter);
          background-color: var(--shadow);
          border: 1px solid var(--shadow);
          margin: 0;
        }
      `}</style>
    </>
  )
}
