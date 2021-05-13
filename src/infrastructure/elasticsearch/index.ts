import { Client } from '@elastic/elasticsearch'
import { config } from '@app/config'

export const createElasticsearchClient = () => {
  return new Client({ node: config.elasticsearchURL })
}
