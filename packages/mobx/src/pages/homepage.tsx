// Dependencies
import { inject, observer } from 'mobx-react'
import React from 'react'
import { IStore } from '../store'

// Type definitions
interface IProps {
  store?: IStore
}

// Page
@inject('store')
@observer
export default class Homepage extends React.Component<IProps> {
  public store: IStore

  constructor(props: IProps) {
    super(props)

    this.store = props.store!
  }

  public loadItems = () => {
    this.store.items.fetchItems()
  }

  public render() {
    const items = this.store.items.all

    return (
      <>
        <h1>Homepage</h1>

        {items.length > 0 && (
          <ul>
            {items.map((item) => <li key={`item:${item.id}`}>{item.name}</li>)}
          </ul>
        )}
        {!items.length && <button onClick={this.loadItems}>Load items</button>}
      </>
    )
  }
}
