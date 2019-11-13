import React from 'react';
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Player from '../components/Player';
import Movie from '../components/Movie';
import Stremio from 'stremio-addon-client';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // catalogue addon
        let cl = "https://v3-cinemeta.strem.io/manifest.json"
        Stremio.detectFromURL(cl)
        .then((resp) => {
            console.log(resp);
            this.catalog = resp.addon;
        });

        // stream addon
        let addon = "https://juan.ultimatestremioaddons.club/stremioget/stremio/v1"
        Stremio.detectFromURL(addon)
        .then((resp) => {
            console.log(resp);
            this.stream = resp.addon;
            this.playGodfather();
        });

    }

    searchStremio() {
        let query = document.getElementById("search-query").value;
        this.catalog.get("catalog", "movie", "top", { search: query })
        .then((resp) => {
            console.log("search result: ", resp)
            this.setState({
                "results": resp.metas
            });
        });
    }

    playGodfather() {
        let gfid = "tt0068646";
        this.stream.get("stream", "movie", gfid)
        .then((resp) => {
            console.log("got godfather stream", resp);
            this.setState({
                tid: resp.streams[0].infoHash,
                filename: resp.streams[0].filename
            });
        });
    }

    render() {
        let resultsJsx = [];
        if (this.state.results) {
            for (let i = 0; i < this.state.results.length; i++) {
                resultsJsx.push(<Movie key={i} meta={this.state.results[i]} />);
            }
        }

        return (
            <>
            <Helmet>
                <title>Stremio</title>
            </Helmet>

            <h1>Player</h1>
            <p>{this.state.filename}</p>
            <Player torrentId={this.state.tid} />

            <h1>Search</h1>
            <input id="search-query" type="text"></input>
            <button onClick={this.searchStremio.bind(this)}>Search</button>
            {resultsJsx}
            </>
        )
    }
}

export default Home;
