import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import classNames from 'classnames/bind';

import {Button} from "../../components/ui/button";
import {
    putFoundMovies,
    putGenres,
    putSelectedGenres,
    setSearchQuery,
    setValueInFilter,
} from "../../store/actionCreators/movies";
import {getGenres, getGenresSelected, getSearchQuery, getFilters, getSideBarOpen} from "../../store/selectors/moviesSelectors";
import {apiMovie} from "../../backendServices/movie";
import {appPages} from "../../constants/pages";

import "./style.scss";

class FilterPanel extends React.PureComponent {
    state = {
        genreIsOpen: false,
    };

    componentDidMount() {
        apiMovie.getGenres();
    }

    handleChange = e => {
        const {name, value} = e.target;
        const {setSearchQuery, setValueInFilter} = this.props;

        if (name === "searchQuery") {
            setSearchQuery(value);
        } else {
            setValueInFilter(name, Number(value));
        }
    };

    handleSelectGenre = (genre) => {
        const {putSelectedGenres} = this.props;
        const genresSelected = this.props.genresSelected.slice();

        if (genresSelected.includes(genre)) {
            genresSelected.splice(genresSelected.indexOf(genre), 1);
        } else {
            genresSelected.push(genre);
        }

        putSelectedGenres(genresSelected);
    };

    getMovies = (e) => {
        e.preventDefault();
        const {searchQuery, history} = this.props;

        if (searchQuery) {
            new Promise((resolve, reject) => {
                apiMovie.getMoviesBySearchQuery(searchQuery, 1, false, resolve, reject)
            })
                .then(() => {
                    history.push(appPages.movieList);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    };

    toggleOpenGenres = () => {
        const {genreIsOpen} = this.state;

        this.setState({
            genreIsOpen: !genreIsOpen,
        })
    };

    getGenresString = () => {
        const {genresSelected, genres} = this.props;

        let genresString = "";
        genresSelected.length && genresSelected.forEach(genreId => {
            genresString = `${genresString} ` + genres[genreId].name;
        });

        return genresString;
    };

    render() {
        const {genreIsOpen} = this.state;
        const {genres, fixed, genresSelected, searchQuery, filters, location, openSideBar} = this.props;
        const {fromDate, toDate, ratingFrom, ratingTo} = filters;

        return (
            <div className={classNames(
                "filter-panel__container",
                {"filter-panel__container-fixed": fixed,
                 "movies-sidebar__opened": location.pathname === appPages.movieList && openSideBar,
                })}
                >
                <div className="filter-panel">

                    <form className="filter-panel__form">
                        <div className="filter-panel__form-element">
                            <div className="filter-panel__label">
                                Название фильма:
                            </div>

                            <input
                                name="searchQuery"
                                value={searchQuery}
                                onChange={this.handleChange}
                                id="filter"
                                type="text"
                                className="filter-panel__input"
                            />

                            <Button
                                textContent="Найти фильмы"
                                className="ui-button__submit"
                                onclick={this.getMovies}
                            />
                        </div>

                        <div className="filter-panel__form-element">
                            <div className="filter-panel__label">
                                Выберете жанр:
                            </div>

                            <div className="filter-panel__genre">
                                <div
                                    className="filter-panel__ellipsis"
                                    onClick={this.toggleOpenGenres}
                                >
                                    <span className="filter-panel__ellipsis-element">
                                        {genresSelected.length ? this.getGenresString() : "..."}
                                    </span>

                                    {genreIsOpen ? (
                                        <span className="filter-panel__arrow">&#9650;</span>
                                    ) : (
                                        <span className="filter-panel__arrow">&#9660;</span>
                                    )}
                                </div>

                                {genreIsOpen && (
                                    <div className="filter-panel__genre-list">
                                        {Object.values(genres).map(genre => (
                                            <div
                                                key={genre.id}
                                                className="filter-panel__genre-list_element"
                                                onClick={() => this.handleSelectGenre(genre.id)}
                                            >
                                                {genre.name}
                                                {genresSelected.includes(genre.id) && (
                                                    <span className="filter-panel__genre-check-mark">&#10004;</span>
                                                )}
                                            </div>)
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="filter-panel__form-element">
                            <div className="filter-panel__label">
                                Интервал годов:
                            </div>

                            <input
                                value={fromDate}
                                name="fromDate"
                                type="number"
                                className="filter-panel__input"
                                placeholder="От"
                                min="1900"
                                max="2100"
                                onChange={this.handleChange}
                            />

                            <input
                                value={toDate}
                                name="toDate"
                                type="number"
                                className="filter-panel__input"
                                placeholder="До"
                                min="1900"
                                max="2100"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="filter-panel__form-element">
                            <div className="filter-panel__label">
                                Рейтинг фильма:
                            </div>

                            <input
                                value={ratingFrom || ""}
                                name="ratingFrom"
                                type="number"
                                className="filter-panel__input"
                                placeholder="От"
                                min="0"
                                max="10"
                                onChange={this.handleChange}
                            />

                            <input
                                value={ratingTo || ""}
                                name="ratingTo"
                                type="number"
                                className="filter-panel__input"
                                placeholder="До"
                                min="0"
                                max="10"
                                onChange={this.handleChange}
                            />
                        </div>

                    </form>

                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    genres: getGenres(state),
    genresSelected: getGenresSelected(state),
    searchQuery: getSearchQuery(state),
    filters: getFilters(state),
    openSideBar: getSideBarOpen(state),
});

const mapDispatchToProps = {
    putFoundMovies,
    putGenres,
    putSelectedGenres,
    setSearchQuery,
    setValueInFilter,
};

export const FilterPanelConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel));