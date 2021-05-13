import { config } from '@app/config'
import dateformat from 'date-fns/format'
import { createLogger as create, transports, format } from 'winston'

const myFormat = format.printf((info) => {
  const json = info
  const { level, message, timestamp, ...other } = json

  if (config.isDev) {
    const levelString = (level + '      ').slice(0, 5)
    const values = Object.entries(other)
      .sort()
      .map(([key, value]) => `${key}:${value}`)
      .join(', ')

    const oneline = `${levelString.toUpperCase()} ${timestamp} ${message} ${values}`

    if (config.logForOnlyOneline) return oneline

    json.oneline = oneline
  }

  return `${JSON.stringify(json, Object.keys(json).sort())}`
})

export const createLogger = () => {
  return create({
    level: config.isDev ? 'debug' : 'info',
    format: format.combine(
      format.timestamp({
        format: () => dateformat(new Date(), 'yyyy-mm-dd HH:mm:ss'),
      }),
      myFormat
    ),
    transports: [new transports.Console()],
  })
}
