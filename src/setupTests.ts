// Third-party dependencies
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-styled-components'

// Enzyme
configure({ adapter: new Adapter() })
