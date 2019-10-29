import React from 'react';

export default class Paginator extends React.Component {
    render() {
        return <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={this.getPreviousPageClass()}>
            <a className="page-link" href="#" onClick={this.props.previousPage} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {
              this.getPages().map((p) => 
                <li key={p} className={(p - 1) === this.props.pageIndex ? 'page-item active' : 'page-item'}><a className="page-link" href="#" onClick={this.props.onPageChange.bind(this, p - 1)}>{p}</a></li>
              )
          }
          <li className={this.getNextPageClass()}>
            <a className="page-link" href="#" onClick={this.props.nextPage} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    }

    getPages = () => {
        const pageCount = Math.ceil(this.props.pageLength / this.props.pageSize);
        const pages = [];
        for(let i = 0; i < pageCount; i++) {
            pages.push(i + 1);
        }

        return pages;
    }

    getNextPageClass = () => {
        const pageCount = Math.ceil(this.props.pageLength / this.props.pageSize);
        return (this.props.pageIndex + 1) === pageCount ? 'page-item disabled' : 'page-item';
    }

    getPreviousPageClass = () => {
        return this.props.pageIndex === 0 ? 'page-item disabled' : 'page-item';
    }
}