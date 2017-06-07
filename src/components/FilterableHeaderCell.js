import React, { PureComponent as Component } from 'react'
import { string, func } from 'prop-types'

export class FilterableHeaderCell extends Component {
    constructor() {
        super()

        this.state = {
            filterTerm: ''
        }
    }

    onChange = ({ target: { value: filterTerm } }) => {
        const { columnKey, onChange } = this.props

        this.setState({ filterTerm })
        onChange({ filterTerm, column: { key: columnKey } })
        setTimeout(() => { this.inputRef.focus() }, 0)
    }

    render() {
        const { filterTerm } = this.state
        const { columnKey } = this.props

        return (
            <div>
                <div className="form-group" style={{ padding: '5px 0 0 0', marginBottom: 0 }}>
                    <input
                        key={`header-filter-${columnKey}`}
                        ref={input => { this.inputRef = input }}
                        type="text"
                        className="form-control input-md"
                        placeholder="Search"
                        value={filterTerm}
                        onChange={this.onChange}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            </div>
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
