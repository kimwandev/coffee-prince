import React from 'react';
import Coffee from './coffee';
import Paginator from './paginator';

export default class CoffeeLoverTable extends React.Component {
    state = {
        coffeeLoversPaged: []
    }

    render() {
        return <div>
                <table className="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Coffee</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.coffeeLovers.map((coffeeLover) => 
                            <tr key={coffeeLover.id}>
                                <th>{coffeeLover.id}</th>
                                <td>{coffeeLover.name}</td>
                                <td>
                                    <Coffee name={coffeeLover.coffee} attribute1={coffeeLover.attribute1} attribute2={coffeeLover.attribute2} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <Paginator 
                    nextPage={this.props.nextPage}
                    previousPage={this.props.previousPage}
                    pageIndex={this.props.pageIndex}
                    pageLength={this.props.pageLength}
                    pageSize={this.props.pageSize} onPageChange={this.props.onPageChange} />
            </div>
        </div>
    }
}