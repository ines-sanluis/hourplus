import { useCallback, useState } from "react"
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import PageLayout from "components/PageLayout"
import Button from "components/Button"
import { DateTimePicker, TimePicker} from "@mui/x-date-pickers"
import dayjs from 'dayjs';
import useUser from "hooks/useUser"
import { addEntry } from "../../../firebase/client"
import { calculateCompensation } from "utils/time"
import { Snackbar } from "@mui/material"
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from "@mui/lab"
import FastfoodIcon from '@mui/icons-material/Fastfood'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import WeekendIcon from '@mui/icons-material/Weekend';
import { useRouter } from "next/router"

const STATES = {
    USER_NOT_KNOWN: 0,
    INITIAL: 1,
    LOADING: 2,
    SUCCESS: 3,
    ERROR: -1,
}

export default function ComposeEntry() {
    const [status, setStatus] = useState(STATES.USER_NOT_KNOWN)
    const today = dayjs(new Date()).set('second', 0).set('millisecond', 0)
    const [startDate, setStartDate] = useState(today.set('hour', 8).set('minute', 0))
    const [endDate, setEndDate] = useState(today.set('hour', 17).set('minute', 0))
    const [breakTime, setBreakTime] = useState(today.set('hour', 0).set('minute', 0))
    const [shift, setShift] = useState(today.set('hour', 7).set('minute', 30))
    const [isFreeDay, setIsFreeDay] = useState(false)
    const user = useUser()
    const router = useRouter()

    const handleSubmit = useCallback(() => {
        const result = calculateCompensation(
            user.id,
            startDate.valueOf(),
            endDate.valueOf(),
            breakTime.hour() * 60 * 60 * 1000 + breakTime.minute() * 60 * 1000,
            shift.hour() * 60 * 60 * 1000 + shift.minute() * 60 * 1000,
            isFreeDay,
        )
        setStatus(STATES.LOADING)
        addEntry(result).then(() => {
            setStatus(STATES.SUCCESS)
            router.push('/home')
        }).catch((err) => {
            console.log(err)
            setStatus(STATES.ERROR)
        })
    }, [startDate, endDate, breakTime, shift, isFreeDay, user])

    return (
        <>
            <PageLayout>
                <Snackbar
                    open={status === STATES.SUCCESS || status === STATES.ERROR}
                    autoHideDuration={3000}
                    onClose={() => setStatus(STATES.INITIAL)}
                    message={status === STATES.SUCCESS ? "Engadido correctamente" : "Erro ao engadir"}
                    sx={{
                        "& div": {
                            backgroundColor: status === STATES.SUCCESS ? "var(--success)" : "var(--error)",
                            color: "white",
                            borderRadius: "var(--border-radius)",
                        },
                    }}
                />
                <section>
                    <Timeline>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{display: 'none'}} />
                            <TimelineSeparator>
                                <TimelineDot sx={{
                                    backgroundColor: 'var(--primary)',
                                }}>
                                    <CameraIndoorIcon />
                                </TimelineDot>
                                <TimelineConnector sx={
                                    {
                                        backgroundColor: 'var(--primary)'
                                    }
                                } />
                                </TimelineSeparator>
                                <TimelineContent sx={{py: '0', px: 'var(--gutter2x)', marginBottom: 'var(--gutter4x)', marginTop: 'var(--gutter)'}}>
                                    <label htmlFor="start">
                                        <span>A que hora entraches?</span>
                                    </label>
                                    <div>
                                        <DateTimePicker
                                            value={startDate}
                                            onChange={(newValue) => setStartDate(newValue)}
                                            format="DD/MM/YYYY HH:mm"
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
                                </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{display: 'none'}} />
                            <TimelineSeparator>
                                <TimelineDot sx={{
                                    backgroundColor: "var(--primary)"
                                }}>
                                    <DirectionsRunIcon />
                                </TimelineDot>
                                <TimelineConnector sx={
                                    {
                                        backgroundColor: 'var(--primary)'
                                    }
                                } />
                                </TimelineSeparator>
                                <TimelineContent sx={{py: '0', px: 'var(--gutter2x)', marginBottom: 'var(--gutter4x)', marginTop: 'var(--gutter)'}}>
                                <label htmlFor="end">
                                    <span>A que hora saíches?</span>
                                </label>
                                <div>
                                    <DateTimePicker
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        format="DD/MM/YYYY HH:mm"
                                        sx={{
                                            "& input": {
                                                fontFamily: "Montserrat",
                                                color: "var(--text-primary)",
                                                padding: "var(--gutter)",
                                                cursor: "pointer",
                                            },
                                            "& div": {
                                                backgroundColor: "var(--white)",
                                                borderRadius: "var(--border-radius)",
                                            },
                                        }}
                                    />
                                </div>
                                </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{display: 'none'}} />
                            <TimelineSeparator>
                                <TimelineDot sx={{
                                    backgroundColor: "var(--primary)"
                                }}>
                                    <FastfoodIcon />
                                </TimelineDot>
                                <TimelineConnector sx={
                                    {
                                        backgroundColor: 'var(--primary)'
                                    }
                                } />
                                </TimelineSeparator>
                                <TimelineContent sx={{py: '0', px: 'var(--gutter2x)', marginBottom: 'var(--gutter4x)', marginTop: 'var(--gutter)'}}>
                                    <label htmlFor="break">
                                        <span>Canto tempo usaches para comer?</span>
                                    </label>
                                    <div>
                                        <TimePicker
                                            value={breakTime}
                                            onChange={(newValue) => setBreakTime(newValue)}
                                            format="HH:mm"
                                            ampm={false}
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
                                </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{display: 'none'}} />
                            <TimelineSeparator>
                                <TimelineDot sx={{
                                    backgroundColor: "var(--primary)"
                                }}>
                                    <TimelapseIcon />
                                </TimelineDot>
                                <TimelineConnector sx={
                                    {
                                        backgroundColor: 'var(--primary)'
                                    }
                                } />
                                </TimelineSeparator>
                                <TimelineContent sx={{py: '0', px: 'var(--gutter2x)', marginBottom: 'var(--gutter4x)', marginTop: 'var(--gutter)'}}>
                                    <label htmlFor="shift">
                                        <span>Canto ía durar a tua xornada?</span>
                                    </label>
                                    <div>
                                        <TimePicker
                                            value={shift}
                                            onChange={(newValue) => setShift(newValue)}
                                            format="HH:mm"
                                            ampm={false}
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
                                </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{display: 'none'}} />
                            <TimelineSeparator>
                                <TimelineDot sx={{
                                    backgroundColor: "var(--primary)"
                                }}>
                                    <WeekendIcon />
                                </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent sx={{py: '0', px: 'var(--gutter2x)', marginBottom: 'var(--gutter4x)', marginTop: 'var(--gutter)'}}>
                                    <span>Era un día libre?</span>
                                    <div>
                                        <FormControlLabel
                                            sx={{
                                                "& .MuiFormControlLabel-label": {
                                                    fontFamily: "Montserrat",
                                                    color: "var(--text-primary)",
                                                },
                                            }}
                                            control={
                                                <Switch checked={isFreeDay} onChange={(e) => setIsFreeDay(e.target.checked)}
                                                name="free"
                                                sx={
                                                    {
                                                        "& .MuiSwitch-thumb": {
                                                            color: "var(--text-primary)",
                                                        },
                                                        "& .MuiSwitch-track": {
                                                            backgroundColor: "var(--border)",
                                                        },
                                                }}
                                                />
                                            }
                                            label={isFreeDay ? "Sí" : "Non"}
                                        />
                                    </div>
                                </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                    <Button onClick={handleSubmit} primary disabled={status === STATES.LOADING}>Engadir</Button>
                </section>
            </PageLayout>
            <style jsx>{`
                section {
                    margin: auto;
                    max-width: 335px;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                }
                span {
                    font-size: 0.8rem;
                    font-weight: bold;
                    font-family: Montserrat;
                    margin-bottom: var(--gutter);
                }
            `}</style>
        </>
    )
}