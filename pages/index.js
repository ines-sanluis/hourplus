import { useEffect, useState } from "react";
import style from './index.module.css';
import { 
  isMoreThanShift,
  msToString,
  stringToMs,
  calculateExcess
} from "../utils/time";
import Range from "../components/Range";
import Time from "../components/Time";
import Header from "../components/Header";
import Footer from "../components/Footer";
// 7:30 in milliseconds
const SHIFT_DURATION = 7 * 60 * 60 * 1000 + 30 * 60 * 1000;

const COLORS = {
  extra: {
    bg: "#F9E6C7",
    color: "#81550E"
  },
  short: {
    bg: "#F5A5A3",
    color: "#A51512"
  },
  total: {
    bg: "#BDE9EF",
    color: "#1C6973"
  },
  compensate: {
    bg: "#BDF0C1",
    color: "#1C7323"
  }
}
export default function Home() {
  const [shift, setShift] = useState(SHIFT_DURATION);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [breakTime, setBreakTime] = useState(undefined);
  const [total, setTotal] = useState("00:00");
  const [diff, setDiff] = useState("00:00");
  const [extraFirstRange, setExtraFirstRange] = useState("00:00");
  const [extraSecondRange, setExtraSecondRange] = useState("00:00");
  const [extraThirdRange, setExtraThirdRange] = useState("00:00");
  const [totalCompensate, setTotalCompensate] = useState("00:00");
  const [compensateFirstRange, setCompensateFirstRange] = useState("00:00");
  const [compensateSecondRange, setCompensateSecondRange] = useState("00:00");
  const [compensateThirdRange, setCompensateThirdRange] = useState("00:00");
  const [showExtraTime, setShowExtraTime] = useState(false);

  useEffect(() => {
    // change document title
    document.title = "HorasPlus";
  }, []);

  const formatDateForInput = date => {
    if (!date) return;
    new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
  }

  useEffect(() => {
    if (!startDate || !endDate) return;
    // Calculate total hours
    let diffInMilliSeconds = endDate - startDate; 
    if (breakTime) {
      diffInMilliSeconds -= breakTime;
    }
    setTotal(msToString(diffInMilliSeconds));
    const excess1 = calculateExcess(diffInMilliSeconds, "7:30", "09:00", "01:30", false);
    const excess2 = calculateExcess(diffInMilliSeconds,"09:00", "12:00", "03:00", false);
    const excess3 = calculateExcess(diffInMilliSeconds, "12:00", "14:00", "02:00", false);
    if(isMoreThanShift(diffInMilliSeconds, shift)) { // Extra time
      setShowExtraTime(true);
      // Extra time
      setDiff(msToString(diffInMilliSeconds - shift));
      setExtraFirstRange(msToString(excess1));
      setExtraSecondRange(msToString(excess2));
      setExtraThirdRange(msToString(excess3));
      // Compensate time
      setCompensateFirstRange(msToString(excess1));
      setCompensateSecondRange(msToString(excess2 * 1.5));
      setCompensateThirdRange(msToString(excess3 * 2));
      setTotalCompensate(msToString(excess1 + excess2 * 1.5 + excess3 * 2));
    } else { // Calculate owing time
      setShowExtraTime(false);
      setDiff(msToString(shift - diffInMilliSeconds));
    }
  }, [startDate, endDate, breakTime]);

  return (
    <>
      <Header></Header>
      <main>
        <div className={style.results}>
          {/* Total */}
          <div>
            <Time
              time={msToString(shift)}
              title="Xornada"
            />
            <Time
              time={total}
              title="Total"
              disabled={startDate === undefined || endDate === undefined}
              backgroundColor={COLORS.total.bg}
              color={COLORS.total.color}
            />
          </div>
          {/* Diff (extra time or short time) */}
          <div>
            <Time
              time={diff}
              title={showExtraTime ? "Exceso" : (startDate === undefined || endDate === undefined ? "Defecto/Exceso" : "Defecto")}
              backgroundColor={COLORS[showExtraTime ? "extra" : "short"].bg}
              color={COLORS[showExtraTime ? "extra" : "short"].color}
              disabled={startDate === undefined || endDate === undefined}
            />
            <Range
              time={extraFirstRange}
              start="7:30"
              end="9:00"
              backgroundColor={COLORS.extra.bg}
              color={COLORS.extra.color}
              disabled={!showExtraTime}
            />
            <Range
              time={extraSecondRange}
              start="9:00"
              end="12:00"
              backgroundColor={COLORS.extra.bg}
              color={COLORS.extra.color}
              disabled={!showExtraTime}
            />
            <Range
              time={extraThirdRange}
              start="12:00"
              end="14:00"
              backgroundColor={COLORS.extra.bg}
              color={COLORS.extra.color}
              disabled={!showExtraTime}
            />
          </div>
          {/* Compensate */}
          <div>
              <Time
                time={totalCompensate}
                title={"Compensar"}
                backgroundColor={COLORS.compensate.bg}
                color={COLORS.compensate.color}
                disabled={!showExtraTime}
              />
              <Range
                time={compensateFirstRange}
                start="7:30"
                end="9:00"
                backgroundColor={COLORS.compensate.bg}
                color={COLORS.compensate.color}
                disabled={!showExtraTime}
              />
              <Range
                time={compensateSecondRange}
                start="9:00"
                end="12:00"
                backgroundColor={COLORS.compensate.bg}
                color={COLORS.compensate.color}
                disabled={!showExtraTime}
              />
              <Range
                time={compensateThirdRange}
                start="12:00"
                end="14:00"
                backgroundColor={COLORS.compensate.bg}
                color={COLORS.compensate.color}
                disabled={!showExtraTime}
              />
          </div>
        </div>
        <div className={style.inputs}>
          <div className={style.input}>
            <span>🚶</span>
            <div>
              <label htmlFor="start">
                <span>Hora de entrada</span>
              </label>
              <input
                id="start"
                name="start"
                type="datetime-local"
                value={formatDateForInput(startDate)}
                onChange={e => setStartDate(new Date(e.target.value))} 
                />
            </div>
          </div>
          <div className={style.input}>
            <span>🚪</span>
            <div>
              <label htmlFor="end">
                <span>Hora de saída</span>
              </label>
              <input
                id="end"
                name="end"
                type="datetime-local" 
                value={formatDateForInput(endDate)} 
                onChange={e => setEndDate(new Date(e.target.value))} 
                />
            </div>
          </div>
          <div className={style.input}>
            <span>🥪</span>
            <div>
              <label htmlFor="time">
                <span>Tempo de comida</span>
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={msToString(breakTime)}
                onChange={e => setBreakTime(stringToMs(e.target.value))}
                />
            </div>
          </div>
          <div className={style.input}>
            <span>⌛ </span>
            <div>
              <label htmlFor="shift">
                <span>Xornada</span>
              </label>
              <input
                id="shift"
                name="shift"
                type="time"
                value={msToString(shift)}
                onChange={e => setShift(stringToMs(e.target.value))}
                />
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
