// Dependencies
import { useStrict } from 'mobx'

// Individual stores
import UiStore from './ui/ui-store'
import UserStore from './user/user-store'

// MobX strict mode
useStrict(true)

// Stores collection
const stores = {}
Object.assign(stores, {
  ui: new UiStore(stores),
  user: new UserStore(stores)
})

// Exports
export default stores
