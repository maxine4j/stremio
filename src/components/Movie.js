import React from 'react';
import WebTorrent from 'webtorrent'


class Movie extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="movie-container">
                <p className="movie-name">{this.props.meta.name}</p>
                <p className="movie-release">{this.props.meta.releaseInfo}</p>
                <img src={this.props.meta.poster} alt="movie poster"></img>
            </div>
        )
    }
}

export default Movie;
