import React, { PureComponent as Component } from 'react'
import { checkIfImmutableCollection } from '../utils'

const DEFAULT_OPTIONS = {
    key: 'id',
    onSelectedKeysChangeCallback: null
}

const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false
    }
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) {
            return false
        }
    }

    return true
}

const getRowsKeys = ({ rows, options }) => {
    if (checkIfImmutableCollection(rows)) {
        return rows.reduce((acc, r) => {
            acc.push(r.getIn(['row', options.key]))

            return acc
        }, [])
    } else {
        return rows.map(r => r.row[options.key])
    }
}

export const ReactDataGridSelection = (DecoratedComponent, options = DEFAULT_OPTIONS) => {
    class ReactDataGridSelection extends Component {
        constructor() {
            super()

            this.state = {
                selectedKeys: []
            }
        }

        componentWillReceiveProps(nextProps, { selectedKeys: newSelectedKeys }) {
            const { selectedKeys } = this.state

            if (options.onSelectedKeysChangeCallback != null && areArraysEqual(selectedKeys, newSelectedKeys)) {
                options.onSelectedKeysChangeCallback(newSelectedKeys)
            }
        }

        onRowsSelected = rows => {
            const { selectedKeys } = this.state

            this.setState({ selectedKeys: selectedKeys.concat(getRowsKeys({ rows, options })) })
        }

        onRowsDeselected = rows => {
            const { selectedKeys } = this.state
            const deselectedRowsKeys = getRowsKeys({ rows, options })
            const newSelectedKeys = selectedKeys.filter(i => deselectedRowsKeys.indexOf(i) === -1)

            this.setState({ selectedKeys: newSelectedKeys })
        }

        setSelectedKeys = selectedKeys => {
            this.setState({ selectedKeys })
        }

        render() {
            const { selectedKeys } = this.state

            return (
                <DecoratedComponent
                    {...this.props}
                    selectedKeys={selectedKeys}
                    onRowsSelected={this.onRowsSelected}
                    onRowsDeselected={this.onRowsDeselected}
                    setSelectedKeys={this.setSelectedKeys}
                />
            )
        }
    }

    ReactDataGridSelection.displayName = `ReactDataGridSelection(${DecoratedComponent.displayName})`

    return ReactDataGridSelection
}
