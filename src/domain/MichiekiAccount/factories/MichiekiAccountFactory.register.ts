import { container } from 'tsyringe'
import { MichiekiAccountFactoryFromUUID } from './MichiekiAccountFactory'

container.register('MichiekiAccountFactory', MichiekiAccountFactoryFromUUID)
