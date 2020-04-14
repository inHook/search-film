import React from 'react';
import {debounce} from "debounce";
import {connect} from "react-redux";
import classNames from "classnames";

import {FilterPanel} from "../../containers/filtersPanel";
import {MoviesListConnected} from "../../containers/movieList";
import {SideBarConnected} from "../../containers/sideBar";
import {getSearchQuery, getPage, getTotalPages, getSideBarOpen, getLoadMovies} from "../../store/selectors/moviesSelectors";
import {apiMovie} from "../../backendServices/movie";
import {Loader} from "../../components/ui/loader";
import {getAppRef} from "../../helpers/moviesHelper";

import "./style.scss";

class MoviesPage extends React.PureComponent {
    componentDidMount() {
        window.addEventListener("scroll", debounce(() => {
            const {page, searchQuery, totalPage} = this.props;
            const appRef = getAppRef();

            if (window.pageYOffset === (appRef.current.scrollHeight - window.innerHeight)) {
                const nextPage = page + 1;

                if (nextPage <= totalPage) {
                    apiMovie.getMoviesBySearchQuery(searchQuery, nextPage, true);
                }
            }
        }, 500));
    }

    render() {
        const {openSideBar, loadMovies} = this.props;

        return (
            <div className="movies-page">
                <div className={classNames(
                    "movies-page__inner",
                    {"movies-sidebar__opened": openSideBar},
                )}>
                    <FilterPanel fixed />
                    <MoviesListConnected />
                </div>

                <SideBarConnected />

                {loadMovies && (
                    <div className="movies-page__loader lds-wrapper">
                        <Loader />
                    </div>
                )}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    page: getPage(state),
    searchQuery: getSearchQuery(state),
    totalPage: getTotalPages(state),
    openSideBar: getSideBarOpen(state),
    loadMovies: getLoadMovies(state),
});

export const MoviesPageConnected = connect(mapStateToProps)(MoviesPage);