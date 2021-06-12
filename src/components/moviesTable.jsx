import React, { Component } from 'react';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import Like from './common/like';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => this.props.onDelete(movie._id)}>
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <table className='table'>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
