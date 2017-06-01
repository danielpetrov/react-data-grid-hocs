import React, { PureComponent as Component } from 'react'

export const ReactDataGridSorting = DecoratedComponent => {
    class ReactDataGridSorting extends Component {
        constructor() {
            super()

            this.state = {
                sortColumn: null,
                sortDirection: null
            }
        }

        onGridSort = (sortColumn, sortDirection) => {
            this.setState({ sortColumn, sortDirection })
        }

        render() {
            const { sortColumn, sortDirection } = this.state

            return (
                <DecoratedComponent
                    {...this.props}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onGridSort={this.onGridSort}
                />
            )
        }
    }

    ReactDataGridSorting.displayName = `ReactDataGridSorting(${DecoratedComponent.displayName})`

    return ReactDataGridSorting
}
