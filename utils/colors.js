import { WORK_STATUS } from "./constants"

export const getChipColor = (status) => {
  switch (status) {
    case WORK_STATUS.FREE_DAY:
      return {
        color: "white",
        background: "var(--success)",
      }
    case WORK_STATUS.OVERWORKED:
      return {
        color: "white",
        background: "var(--success)",
      }
    case WORK_STATUS.UNDERWORKED:
      return {
        color: "white",
        background: "var(--error)",
      }
    default:
      return {
        color: "white",
        background: "var(--success)",
      }
  }
}
