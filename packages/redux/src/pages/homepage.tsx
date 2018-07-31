// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Action } from 'redux-actions'
import { IState as StoreState } from '../store'
import { fetchItems, IItem, selectIsLoading, selectItems } from '../store/items'

// Type definitions
interface IProps {
  state: {
    isLoading: boolean
    items: IItem[]
  }
  dispatch: {
    fetchItems: typeof fetchItems
  }
}

// Page
class Homepage extends React.Component<IProps> {
  public render() {
    const { isLoading, items } = this.props.state

    return (
      <>
        <h1>Homepage</h1>

        {!isLoading &&
          items.length > 0 && (
            <ul>
              {items.map(item => (
                <li key={`item:${item.id}`}>{item.name}</li>
              ))}
            </ul>
          )}
        {!items.length && <button onClick={this.loadItems}>Load items</button>}
      </>
    )
  }

  private loadItems = () => {
    this.props.dispatch.fetchItems()
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
const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
  dispatch: bindActionCreators({ fetchItems }, dispatch)
})

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage)
