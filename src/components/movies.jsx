import React, { Component } from 'react';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        const genres = [{name: "All Genres"}, ...getGenres()];

        this.setState({
            movies: getMovies(),
            genres
        })
    }

    handleDelete = id => {
        this.setState(
            {
                movies: this.state.movies.filter( movie => movie._id !== id )
            }
        );
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {
            ...movies[index],
            liked: !movies[index].liked
        }
        this.setState(
            { 
                movies
            }
        );
    };

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        });
    };

    renderTable(movies) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like 
                                    liked={movie.liked}
                                    onLike={() => this.handleLike(movie)}
                                    /></td>
                            <td>
                                <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(movie._id)}
                            >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        );
    };

    render() { 
        const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
            : allMovies;

        const movies = paginate(filteredMovies, currentPage, pageSize);

        return (
            <div className="row m-5">
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col">
                    { filteredMovies.length === 0 ? <p>There are no movies in the database</p> : 
                (
                    <React.Fragment>
                        <p>Showing {filteredMovies.length} movies in the database</p>
                        { this.renderTable(movies) }
                    </React.Fragment>
                )}
                <Pagination 
                    itemsCount={filteredMovies.length} 
                    pageSize={pageSize} 
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
                </div>
                </div>
            
        );
    };
};
 
export default Movies;