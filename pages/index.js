import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IoSend } from 'react-icons/io5';
import {BiLoaderAlt} from 'react-icons/bi';

export default function Home() {
  const [startTime, setStartTime] = useState("09:18");
  const [endTime, setEndTime] = useState("19:47");
  const [lunchTime, setLunchTime] = useState("00:00");
  const [totalTime, setTotalTime] = useState("00:00");
  const [defectTime, setDefectTime] = useState("00:00");
  const [excessTime, setExcessTime] = useState("00:00");
  const [excessTime1, setExcessTime1] = useState("00:00"); // 1 to 9
  const [excessTime2, setExcessTime2] = useState("00:00"); // 9 to 12
  const [excessTime3, setExcessTime3] = useState("00:00"); // 12 to 14
  const [compensateTime, setCompensateTime] = useState("00:00")
  const [compensateTime1, setCompensateTime1] = useState("00:00")
  const [compensateTime2, setCompensateTime2] = useState("00:00")
  const [compensateTime3, setCompensateTime3] = useState("00:00")

  const calculateExcessTime = function (totalMinutes, rangeStart, rangeEnd, rangeExcess) {
    const rangeStartMins = convertTimeToMinutes(rangeStart)
    const rangeEndMins = convertTimeToMinutes(rangeEnd)

    if (rangeStartMins >= totalMinutes) {
      return "00:00"
    } else if (totalMinutes <= rangeEndMins) {
      return convertMinutesToTime(totalMinutes - rangeStartMins)
    } else {
      return rangeExcess
    }
  }

  const sumTimesAsTime = function (array) {
    const minutes = array.map(value => convertTimeToMinutes(value))
    return convertMinutesToTime(minutes.reduce((partialSum, a) => partialSum + a, 0))
  }

  const calculateCompensateTime = function(excess, factor) {
    return convertMinutesToTime(convertTimeToMinutes(excess) * factor)
  }
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60) + minutes;
  }

  const convertMinutesToTime = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);
    const lunchMinutes = convertTimeToMinutes(lunchTime);

    let totalWorkMinutes = endMinutes - startMinutes - lunchMinutes;
    setTotalTime(convertMinutesToTime(totalWorkMinutes));
  }, [startTime, endTime, lunchTime])

  useEffect(() => {
    const totalMinutes = convertTimeToMinutes(totalTime);
    const hours = convertTimeToMinutes("07:30")
    if (totalMinutes <= hours) {
      setDefectTime(convertMinutesToTime(hours - totalMinutes))
      setExcessTime("00:00")
      setExcessTime1("00:00")
      setExcessTime2("00:00")
      setExcessTime3("00:00")
      setCompensateTime("00:00")
      setCompensateTime1("00:00")
      setCompensateTime2("00:00")
      setCompensateTime3("00:00")
    } else {
      setDefectTime("00:00")
      var excess = totalMinutes - hours
      setExcessTime(convertMinutesToTime(excess))
      const excess1 = calculateExcessTime(totalMinutes, "07:30", "09:00", "01:30");
      setExcessTime1(excess1)
      const excess2 = calculateExcessTime(totalMinutes, "09:00", "12:00", "03:00");
      setExcessTime2(excess2)
      const excess3 = calculateExcessTime(totalMinutes, "12:00", "14:00", "02:00");
      setExcessTime3(excess3)
      const compensate1 = calculateCompensateTime(excess1, 1);
      setCompensateTime1(compensate1)
      const compensate2 = calculateCompensateTime(excess2, 1.5);
      setCompensateTime2(compensate2)
      const compensate3 = calculateCompensateTime(excess3, 2);
      setCompensateTime3(compensate3)
      setCompensateTime(sumTimesAsTime([compensate1, compensate2, compensate3]))
    }
  }, [totalTime, defectTime])

  return (
    <div>
      <input value={startTime} onChange={e => setStartTime(e.target.value)} />
      <input value={endTime} onChange={e => setEndTime(e.target.value)} />
      <input value={lunchTime} onChange={e => setLunchTime(e.target.value)} />
      <p>Total time: {totalTime}</p>
      <p>Defect time: {defectTime}</p>
      <p>Excess time: {excessTime}</p>
      <p>Excess time 7:30 a 9: {excessTime1}</p>
      <p>Excess time 9 a 12: {excessTime2}</p>
      <p>Excess time 12 a 14: {excessTime3}</p>
      <p>Total a compensar: {compensateTime}</p>
      <p>Compensate time 7:30 a 9: {compensateTime1}</p>
      <p>Compensate time 9 a 12: {compensateTime2}</p>
      <p>Compensate time 12 a 14: {compensateTime3}</p>
    </div>
  );
}
