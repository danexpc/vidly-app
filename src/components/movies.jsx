import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'

class Movies extends Component {
    state = { 
        movies: getMovies()
    }

    deleteHandler = id => {
        this.setState(
            {
                movies: this.state.movies.filter( movie => movie._id !== id )
            }
        )
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.deleteHandler(movie._id)}
                            >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        )
    }

    render() { 
        const movieCounter = this.state.movies.length;

        return (
            <React.Fragment>
            { movieCounter === 0 ? <p className="m-2">There are no movies in the database</p> : 
            (
                <React.Fragment>
                    <p className="m-2">Showing {movieCounter} movies in the database</p>
                    { this.renderTable() }
                </React.Fragment>
            )}
            </React.Fragment>
        );
    }
}
 
export default Movies;