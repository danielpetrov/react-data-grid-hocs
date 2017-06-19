import React from 'react'
import { FilterableHeaderCell } from './components/FilterableHeaderCell'
import { string, func } from 'prop-types'

export const SubHeaderCell = ({ columnKey, title, onFilterChange, CustomFilterComponent }) => (
    <div>
        <div>{title}</div>
        {
            CustomFilterComponent != null ?
                <CustomFilterComponent columnKey={columnKey} onFilterChange={onFilterChange} />
                : null
        }
        {
            CustomFilterComponent == null ?
                <FilterableHeaderCell columnKey={columnKey} onChange={onFilterChange} />
                : null
        }
    </div>
)

SubHeaderCell.propTypes = {
    columnKey: string.isRequired,
    title: string.isRequired,
    onFilterChange: func.isRequired
}

export const getColDef = options => {
    if (options.filterable) {
        return {
            name: SubHeaderCell({
                title: options.title,
                columnKey: options.key,
                onFilterChange: options.onFilterChange,
                ...options
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
