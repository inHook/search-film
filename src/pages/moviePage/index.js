import React from 'react';
import {debounce} from "debounce";
import {connect} from "react-redux";
import classNames from "classnames";

import {FilterPanel} from "../../containers/filtersPanel";
import {MoviesListConnected} from "../../containers/movieList";
import {SideBarConnected} from "../../containers/sideBar";
import {getSearchQuery, getPage, getTotalPages, getSideBarOpen} from "../../store/selectors/moviesSelectors";
import {apiMovie} from "../../backendServices/movie";

import "./style.scss";

class MoviesPage extends React.PureComponent {
    moviePageRef = React.createRef();

    componentDidMount() {
        window.addEventListener("scroll", debounce(() => {
            const {page, searchQuery, totalPage} = this.props;

            if (window.pageYOffset === (this.moviePageRef.current.scrollHeight - window.innerHeight)) {
                const nextPage = page + 1;

                if (nextPage <= totalPage) {
                    apiMovie.getMoviesBySearchQuery(searchQuery, nextPage, true);
                }
            }
        }, 500));
    }

    render() {
        const {openSideBar} = this.props;

        return (
            <div className="movies-page" ref={this.moviePageRef}>
                <div className={classNames(
                    "movies-page__inner",
                    {"movies-sidebar__opened": openSideBar},
                )}>
                    <FilterPanel fixed />
                    <MoviesListConnected />
                </div>

                <SideBarConnected />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    page: getPage(state),
    searchQuery: getSearchQuery(state),
    totalPage: getTotalPages(state),
    openSideBar: getSideBarOpen(state),
});

export const MoviesPageConnected = connect(mapStateToProps)(MoviesPage);