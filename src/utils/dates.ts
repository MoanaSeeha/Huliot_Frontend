import moment, { Moment } from 'moment'

export const formatDate = (date: Moment): string => {
  return moment(date).format('YYYY/MM/DD')
}
