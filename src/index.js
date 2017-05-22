import React from 'react'
import { FilterableHeaderCell } from './components/FilterableHeaderCell'
import { string, func } from 'prop-types'

export const renderFilterableHeaderCell = ({ columnKey, title, onFilterChange }) => (
    <div>
        <div>{title}</div>
        <FilterableHeaderCell columnKey={columnKey} onChange={onFilterChange} />
    </div>
)

renderFilterableHeaderCell.propTypes = {
    columnKey: string.isRequired,
    title: string.isRequired,
    onFilterChange: func.isRequired
}

export const getColDef = options => {
    if (options.filterable) {
        return {
            name: renderFilterableHeaderCell({
                title: options.title,
                columnKey: options.key,
                onFilterChange: options.onFilterChange
            }),
            ...options
        }
    } else {
        return {
            name: options.title,
            ...options
        }
    }
}

export { ReactDataGridSelection, ReactDataGridFiltering, ReactDataGridSorting } from './higher-order-components'
