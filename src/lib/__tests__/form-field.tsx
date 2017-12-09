// Third-party dependencies
import { mount } from 'enzyme'
import * as React from 'react'

// Helper
import FormField from '../form-field'

describe('FormField', () => {
  it('sets a string value', () => {
    const field = new FormField({ value: 'Initial' })

    expect(field.value).toBe('Initial')

    field.set('Text string')

    expect(field.value).toBe('Text string')
  })

  it('sets an array value', () => {
    const field = new FormField({ value: ['one'] })

    expect(field.value).toEqual(['one'])

    field.set(['two', 'three'])

    expect(field.value).toEqual(['two', 'three'])
  })

  it('toggles values in an array value', () => {
    const field = new FormField({ value: ['one', 'two', 'three'] })

    field.toggle('two')

    expect(field.value).toEqual(['one', 'three'])

    field.toggle('four')

    expect(field.value).toEqual(['one', 'three', 'four'])
  })

  it('validates and returns an error message', () => {
    const field = new FormField({
      validate: value => `The value is ${value}`,
      value: 'right here'
    })

    expect(field.error).toBe('')

    const errorMessage = field.validate()

    expect(field.error).toBe('The value is right here')
    expect(errorMessage).toBe('The value is right here')
  })

  it('returns an empty string if there is no validator', () => {
    const field = new FormField({ value: '' })

    const errorMessage = field.validate()

    expect(errorMessage).toBe('')
  })

  fit('sets a string value from a change event', () => {
    const field = new FormField({ value: '' })

    const onChangeHandler = (
      e: React.ChangeEvent<
        HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
      >
    ) => field.updateFromEvent(e)
    const input = mount(<input onChange={onChangeHandler} />)

    input.prop('onChange')({ currentTarget: { value: 'Text String' } })

    expect(field.value).toBe('Text String')
  })

  it('toggles values in an array value from a change event', () => {
    const field = new FormField({ value: ['one', 'two', 'three'] })

    const onChangeHandler = (
      e: React.ChangeEvent<
        HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
      >
    ) => field.updateFromEvent(e)
    const input = mount(<input onChange={onChangeHandler} />)

    input.prop('onChange')({ currentTarget: { value: 'two' } })

    expect(field.value).toEqual(['one', 'three'])

    input.prop('onChange')({ currentTarget: { value: 'four' } })

    expect(field.value).toEqual(['one', 'three', 'four'])
  })

  xit('sets an array value from a change event', () => {
    const field = new FormField({ value: [] })

    const onChangeHandler = (
      e: React.ChangeEvent<
        HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
      >
    ) => field.updateFromEvent(e)
    const input = mount(
      <select multiple={true} onChange={onChangeHandler}>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </select>
    )

    input.prop('onChange')({
      currentTarget: {
        multiple: input.prop('multiple'),
        options: input.getDOMNode().options,
        value: 'two'
      }
    })
    input.prop('onChange')({
      currentTarget: {
        multiple: input.prop('multiple'),
        options: input.getDOMNode().options,
        value: 'three'
      }
    })

    expect(field.value).toEqual(['two', 'three'])
  })
})
