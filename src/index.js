import React from 'react'
import { FilterableHeaderCell } from './components/FilterableHeaderCell'
import { string, func } from 'prop-types'

export const renderFilterableHeaderCell = ({ columnKey, title, onFilterChange, CustomFilterComponent }) => (
    <div>
        <div>{title}</div>
        {
            CustomFilterComponent != null ?
                <CustomFilterComponent />
                : null
        }
        {
            CustomFilterComponent == null ?
                <FilterableHeaderCell columnKey={columnKey} onChange={onFilterChange} />
                : null
        }
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
    } else if (options.customFilterComponent != null) {
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
