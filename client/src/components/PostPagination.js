import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostPagination extends Component {
  renderPageButtons(totalPosts, postsPerPage) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push((
        <li
          key={i}
          className="waves-effect"
          onClick={() => this.props.fetchPosts(i, postsPerPage)}
        >
          <a href="#!">{i}</a>
        </li>
      ));
    }

    return buttons;
  }

  render() {
    if (this.props.totalPosts) {
      return (
        <div className="container center-align">
          <ul className="pagination">
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {this.renderPageButtons(this.props.totalPosts, 6)}
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
      );
    }

    return <div />;
  }
}

function mapStateToProps({ posts: { totalPosts } }) {
  return { totalPosts };
}

export default connect(mapStateToProps, { fetchPosts })(PostPagination);
