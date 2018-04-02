// Dependencies
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Store } from '../store'

// Type definitions
interface Props {
  store?: Store
}

// Page
@inject('store')
@observer
export default class Homepage extends React.Component<Props> {
  store: Store

  constructor(props: Props) {
    super(props)

    this.store = props.store!
  }

  loadItems = () => {
    this.store.items.fetchItems()
  }

  render() {
    const items = this.store.items.all

    return (
      <>
        <h1>Homepage</h1>

        {items.length > 0 && (
          <ul>
            {items.map(item => <li key={`item-${item.id}`}>{item.name}</li>)}
          </ul>
        )}
        {!items.length && <button onClick={this.loadItems}>Load items</button>}
      </>
    )
  }
}
