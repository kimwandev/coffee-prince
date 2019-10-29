import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import CoffeeLoverTable from './components/coffee-lover-table';
import SearchBar from './components/search-bar';

class App extends React.Component {
    state = {
        pageIndex: 0,
        pageLength: 0,
        pageSize: 3,
        searchString: '',
        coffeeSearch: '',
        attribute1Search: '',
        attribute2Search: '',
        coffeeLovers: [],
        cLoversPaged: [],
        isLoading: true
    }

    handlerSearchInputChange = (e) => {
        this.setState({searchString: e.target.value});
    }

    searchCoffeeLovers = (e) => {
        this.setState({
            isLoading: true
        });
        const searchUrl = ['http://localhost:3200/coffee-lovers?']

        if (this.state.searchString) {
            searchUrl.push('name=' + this.state.searchString + '&');
        }

        if (this.state.coffeeSearch) {
            searchUrl.push('coffee=' + this.state.coffeeSearch + '&');
        }

        if (this.state.attribute1Search) {
            searchUrl.push('attribute1=' + this.state.attribute1Search + '&');
        }

        if (this.state.attribute2Search) {
            searchUrl.push('attribute2=' + this.state.attribute2Search);
        }

        fetch(searchUrl.join(''))
            .then((res) => res.json())
            .then((data) => {
                
                const cLovers = data.slice(0 * this.state.pageSize, 1 * this.state.pageSize);
                this.setState({
                    coffeeLovers: data,
                    cLoversPaged: cLovers,
                    pageLength: data.length,
                    pageIndex: 0,
                    isLoading: false
                })
            });
    }

    componentDidMount() {
        fetch('http://localhost:3200/coffee-lovers')
            .then((res) => res.json())
            .then((data) => {
                const cLovers = data.slice(this.state.pageIndex * this.state.pageSize, (this.state.pageIndex + 1) * this.state.pageSize);
                this.setState({
                    coffeeLovers: data,
                    cLoversPaged: cLovers,
                    pageLength: data.length,
                    isLoading: false
                })
            });
    }

    render() {
        return <div className="position-relative">
                { this.state.isLoading ? <div className="page-modal position-absolute d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : null  }
                <h1>Coffee Lovers!</h1>
                <div className="mb-3">
                    <SearchBar
                        handleNameSearch={this.handlerSearchInputChange}
                        searchCoffeeLovers={this.searchCoffeeLovers} 
                        handleCoffeeSearchChange={this.handleCoffeeSearchChange}
                        handleAttribute1SearchChange={this.handleAttribute1SearchChange}
                        handleAttribute2SearchChange={this.handleAttribute2SearchChange}/>
                </div>
                <CoffeeLoverTable
                    coffeeLovers={this.state.cLoversPaged}
                    pageIndex={this.state.pageIndex}
                    pageLength={this.state.pageLength}
                    pageSize={this.state.pageSize}
                    nextPage={this.nextPage} previousPage={this.previousPage}
                    onPageChange={this.pageChange} />
            </div>
    }

    nextPage = () => {
        const nextPageIndex = this.state.pageIndex + 1;
        const cLovers = this.state.coffeeLovers.slice(nextPageIndex * this.state.pageSize, (nextPageIndex + 1) * this.state.pageSize);
        this.setState({
            pageIndex: nextPageIndex,
            cLoversPaged: cLovers
        })
    }

    previousPage = () => {
        const previousPageIndex = this.state.pageIndex - 1;
        const cLovers = this.state.coffeeLovers.slice(previousPageIndex * this.state.pageSize, (previousPageIndex + 1) * this.state.pageSize);
        this.setState({
            pageIndex: previousPageIndex,
            cLoversPaged: cLovers
        })
    }

    pageChange = (pageIndex) => {
        const cLovers = this.state.coffeeLovers.slice(pageIndex * this.state.pageSize, (pageIndex + 1) * this.state.pageSize);
        this.setState({
            pageIndex: pageIndex,
            cLoversPaged: cLovers
        })
    }

    handleCoffeeSearchChange = (e) => {
        this.setState({
            coffeeSearch: e.target.value
        })
    }

    handleAttribute1SearchChange = (e) => {
        this.setState({
            attribute1Search: e.target.value
        })
    }

    handleAttribute2SearchChange = (e) => {
        this.setState({
            attribute2Search: e.target.value
        })
    }


}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
