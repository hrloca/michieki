import rc from 'rc'

const defaultConfig = {
  port: 3000,
  isDev: process.env.NODE_ENV !== 'production',
  logForOnlyOneline: true,
  redisURL: 'redis://localhost:6379',
  elasticsearchURL: 'http://localhost:9200',
}

export const config = rc('api', defaultConfig) as typeof defaultConfig
