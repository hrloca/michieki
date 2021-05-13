import rc from 'rc'

const defaultConfig = {
  port: 3000,
  restPrefix: '/api',
  graphqlPrefix: '/graphql',
}

export const config = rc('api', defaultConfig) as typeof defaultConfig
