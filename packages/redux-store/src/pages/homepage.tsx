// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { State as StoreState } from '../store'
import { selectIsLoading, selectItems, fetchItems, Item } from '../store/items'

// Type definitions
interface Props {
  state: {
    isLoading: boolean
    items: Item[]
  }
  dispatch: {
    fetchItems: typeof fetchItems
  }
}

// Page
class Homepage extends React.Component<Props> {
  loadItems = () => {
    this.props.dispatch.fetchItems()
  }

  render() {
    const { isLoading, items } = this.props.state

    return (
      <>
        <h1>Homepage</h1>

        {!isLoading &&
          items.length > 0 && (
            <ul>
              {items.map(item => <li key={`item:${item.id}`}>{item.name}</li>)}
            </ul>
          )}
        {!items.length && <button onClick={this.loadItems}>Load items</button>}
      </>
    )
  }
}

// State
const mapStateToProps = (state: StoreState) => ({
  state: {
    isLoading: selectIsLoading(state),
    items: selectItems(state)
  }
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  dispatch: bindActionCreators({ fetchItems }, dispatch)
})

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
