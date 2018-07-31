import React, { Component } from 'react';

class PostPagination extends Component {
  renderPageButtons(totalPages) {
    const currentPage = this.props.page;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const buttons = [];

    buttons.push((
      <li
        key="previous"
        className={`${isFirstPage ? 'disabled' : 'waves-effect'}`}
        onClick={isFirstPage ? () => { } : () => this.props.fetchPosts(currentPage - 1)}
      >
        <a><i className="material-icons">chevron_left</i></a>
      </li>
    ));

    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push((
        <li
          key={i}
          className={`waves-effect ${currentPage === i ? 'active blue darken-1' : ''}`}
          onClick={() => this.props.fetchPosts(i)}
        >
          <a className={`${currentPage === i ? 'white-text' : ''}`}>{i}</a>
        </li >
      ));
    }

    buttons.push((
      <li
        key="next"
        className={`${isLastPage ? 'disabled ' : 'waves-effect'}`}
        onClick={isLastPage ? () => { } : () => this.props.fetchPosts(currentPage + 1)}
      >
        <a><i className="material-icons">chevron_right</i></a>
      </li>
    ));

    return buttons;
  }

  render() {
    if (this.props.totalPages) {
      return (
        <div className="container center-align">
          <ul className="pagination">
            {this.renderPageButtons(this.props.totalPages)}
          </ul>
        </div>
      );
    }

    return <div />;
  }
}

export default PostPagination;
