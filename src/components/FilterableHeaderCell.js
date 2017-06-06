import React, { PureComponent as Component } from 'react'
import { string, func } from 'prop-types'

export class FilterableHeaderCell extends Component {
    constructor() {
        super()

        this.state = {
            filterTerm: ''
        }
    }

    onChange = (e) => {
        const { target: { value: filterTerm } } = e
        const { columnKey, onChange } = this.props

        e.stopPropagation()

        this.setState({ filterTerm })
        onChange({ filterTerm, column: { key: columnKey } })
    }

    render() {
        const { filterTerm } = this.state
        const { columnKey } = this.props

        return (
            <input
                style={{ marginTop: '5px' }}
                key={`header-filter-${columnKey}`}
                type="text"
                className="form-control input-md"
                placeholder="Search"
                value={filterTerm}
                onChange={this.onChange}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
            />
        )
    }
}

FilterableHeaderCell.defaultProps = {
    filterTerm: ''
}

FilterableHeaderCell.propTypes = {
    columnKey: string.isRequired,
    onChange: func.isRequired
}
