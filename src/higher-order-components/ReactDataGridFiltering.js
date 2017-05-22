import React, { PureComponent as Component } from 'react'

export const ReactDataGridFiltering = DecoratedComponent => {
    class ReactDataGridFiltering extends Component {
        constructor() {
            super()

            this.state = {
                filters: {}
            }
        }

        onFilterChange = (filter) => {
            const { filters } = this.state

            let newFilters = Object.assign({}, filters)

            if (filter.filterTerm) {
                newFilters[filter.column.key] = filter
            } else {
                delete newFilters[filter.column.key]
            }
            this.setState({ filters: newFilters })
        }

        onClearFilters = () => {
            // all filters removed
            this.setState({ filters: {} })
        }

        render() {
            const { filters } = this.state

            return (
                <DecoratedComponent
                    {...this.props}
                    filters={filters}
                    onFilterChange={this.onFilterChange}
                    onClearFilters={this.onClearFilters}
                />
            )
        }
    }

    ReactDataGridFiltering.displayName = `ReactDataGridFiltering(${DecoratedComponent.displayName})`

    return ReactDataGridFiltering
}
