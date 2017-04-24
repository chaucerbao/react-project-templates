import {configure} from '@kadira/storybook'

const requireContext = require.context(
  '../src/components',
  true,
  /.stories.jsx?$/
)

function loadStories () {
  requireContext.keys().forEach(filename => requireContext(filename))
}

configure(loadStories, module)
