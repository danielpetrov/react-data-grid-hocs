import React, { PureComponent as Component } from 'react'

export const ReactDataGridSorting = (DecoratedComponent, options = {
    defaultSortColumn: null,
    defaultSortDirection: null
} = {}) => {
    class ReactDataGridSorting extends Component {
        constructor() {
            super()

            this.state = {
                sortColumn: options.defaultSortColumn,
                sortDirection: options.defaultSortDirection
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
