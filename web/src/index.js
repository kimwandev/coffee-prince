import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    state = {
        searchString: '',
        coffeeLovers: []
    }

    handlerSearchInputChange = (e) => {
        this.setState({searchString: e.target.value});
    }

    searchCoffeeLovers = (e) => {
        fetch('http://localhost:3200/coffee-lovers?name=' + this.state.searchString)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    coffeeLovers: data
                })
            });
    }

    componentDidMount() {
        fetch('http://localhost:3200/coffee-lovers')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    coffeeLovers: data
                })
            });
    }

    render() {
        return <div>
                <h1>Coffee Lovers!</h1>
                <div className="input-group mb-3">
                    <input type="text" value={this.state.searchString} className="form-control" placeholder="Search" onChange={this.handlerSearchInputChange} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.searchCoffeeLovers}>Search</button>
                    </div>
                </div>
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
                            this.state.coffeeLovers.map((coffeeLover) => 
                                <tr key={coffeeLover.id}>
                                    <th>{coffeeLover.id}</th>
                                    <td>{coffeeLover.name}</td>
                                    <td><span>{coffeeLover.attribute1}</span> <span>{coffeeLover.coffee}</span> <span>{coffeeLover.attribute2}</span></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    }


}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
