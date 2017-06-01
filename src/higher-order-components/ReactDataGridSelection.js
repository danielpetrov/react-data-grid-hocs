import React, { PureComponent as Component } from 'react'

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

            if (options.onSelectedKeysChangeCallback !== null && areArraysEqual(selectedKeys, newSelectedKeys)) {
                options.onSelectedKeysChangeCallback(newSelectedKeys)
            }
        }

        onRowsSelected = rows => {
            const { selectedKeys } = this.state
            const newSelectedKeys = selectedKeys.concat(rows.map(r => r.row[options.key]))

            this.setState({ selectedKeys: newSelectedKeys })
        }

        onRowsDeselected = rows => {
            const { selectedKeys } = this.state
            const rowIndexes = rows.map(r => r.row[options.key])
            const newSelectedKeys = selectedKeys.filter(i => rowIndexes.indexOf(i) === -1)

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
