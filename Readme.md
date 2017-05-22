Higher Order Components for ReactDataGrid, which will make your life easier
=========================================================================

example usage:

````
import React, { PureComponent as Component } from 'react'
import { list } from 'react-immutable-proptypes'
import { bool, string, array, object, func } from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import { Data } from 'react-data-grid-addons'
import { ReactDataGridSelection, ReactDataGridFiltering, ReactDataGridSorting, getColDef } from 'react-data-grid-hocs'
import { SID, FIRST_NAME, LAST_NAME, COUNTRY_NAME } from '../../../constants/global'
import { getColDef } from '../../ReactDataGrid'

const { Selectors } = Data

const getColumns = options => [
    getColDef({
        key: SID,
        title: 'SID',
        ...options
    }),
    getColDef({
        key: FIRST_NAME,
        title: 'First Name',
        ...options
    }),
    getColDef({
        key: LAST_NAME,
        title: 'Last Name',
        ...options
    }),
    getColDef({
        key: COUNTRY_NAME,
        title: 'Country Name',
        ...options
    })
]

export class _Table extends Component {
    componentWillReceiveProps({ selectedKeys: newSelectedKeys }) {
        const { selectedKeys, setReportDetailsSelectedSIDs } = this.props

        if (!areArraysEqual(selectedKeys, newSelectedKeys)) {
            setSelectedIds({ SIDs: newSelectedKeys })
        }
    }

    getRows = () => {
        const { rowData, selectedKeys, filters, sortColumn, sortDirection } = this.props

        return Selectors.getRows({
            rows: rowData,
            filters,
            sortColumn,
            sortDirection,
            selectedIndexes: selectedKeys
        })
    }

    getSize = () => {
        return this.getRows().length
    }

    rowGetter = (rowIdx) => {
        const rows = this.getRows()

        return rows[rowIdx]
    }

    render() {
        const { selectedKeys, onRowsDeselected, onRowsSelected, showCheckbox } = this.props
        const { onFilterChange, onClearFilters, onGridSort } = this.props

        return (
            <ReactDataGrid
                columns={getColumns({
                    onFilterChange,
                    sortable: true,
                    filterable: true,
                    width: 150
                })}
                rowGetter={this.rowGetter}
                enableCellSelect={true}
                rowsCount={this.getSize()}
                minHeight={400}
                onAddFilter={onFilterChange}
                onClearFilters={onClearFilters}
                rowSelection={{
                    showCheckbox,
                    enableShiftSelect: true,
                    selectBy: {
                        keys: {
                            rowKey: SID,
                            values: selectedKeys
                        }
                    },
                    onRowsSelected,
                    onRowsDeselected
                }}
                rowKey={SID}
                onGridSort={onGridSort}
                headerRowHeight={60}
            />
        )
    }
}

_Table.defaultProps = {
    showCheckbox: true
}

_Table.propTypes = {
    setSelectedIds: func.isRequired,
    sortColumn: string.isRequired,
    sortDirection: string.isRequired,
    rowData: array.isRequired,
    selectedKeys: array.isRequired,
    filters: object.isRequired,
    onRowsSelected: func.isRequired,
    onRowsDeselected: func.isRequired,
    onFilterChange: func.isRequired,
    onClearFilters: func.isRequired,
    onGridSort: func.isRequired,
    showCheckbox: bool
}

export const ReportDetailsTable = ReactDataGridFiltering(
    ReactDataGridSorting(
        ReactDataGridSelection(_ReportDetailsTable)
    )
)

````