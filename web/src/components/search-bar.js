import React from 'react';

export default class SearchBar extends React.Component {
    render() {
        return <div className="input-group">
            <input type="text" className="form-control" placeholder="By Name" onChange={this.props.handleNameSearch} />
            <select className="custom-select" onChange={this.props.handleCoffeeSearchChange}>
                <option value="">Choose Coffee...</option>
                <option value="Flat White">Flat White</option>
                <option value="Batch Brew">Batch Brew</option>
            </select>
            <select className="custom-select" onChange={this.props.handleAttribute1SearchChange}>
                <option value="">Choose Attribute 1...</option>
                <option value="Skinny">Skinny</option>
                <option value="Almond">Almond</option>
            </select>
            
            <select className="custom-select"  onChange={this.props.handleAttribute2SearchChange}>
                <option value="">Choose Attribute 2...</option>
                <option value="Extra Hot">Extra Hot</option>
            </select>
            
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.props.searchCoffeeLovers}>Search</button>
            </div>
        </div>
    }
}