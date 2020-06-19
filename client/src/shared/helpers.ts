import moment from "moment";

export const getDate = (date: string) => moment(Number(date)).format("YYYY-MM-DD HH:mm:ss");