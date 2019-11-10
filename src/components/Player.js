import React from 'react';
import WebTorrent from 'webtorrent'


class Player extends React.Component {

    constructor(props) {
        super(props);
        this.client = new WebTorrent()
        this.state = {
            downloaded: 0,
            downloadSpeed: 0,
            progress: 0,
        }
    }

    componentDidMount() {
        this.client.add(this.props.torrentId, (torrent) => {
            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4');
            })
            file.renderTo("video#player");
            this.torrent = torrent;
        });
        this.downloadInterval = setInterval(() => {
            if (this.torrent) {
                this.setState({ 
                    downloaded: this.torrent.downloaded,
                    downloadSpeed: this.torrent.downloadSpeed,
                    progress: this.torrent.progress,
                }); 
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.downloadInterval);
    }

    formatBytes(bytes) {
        if (bytes > 1e+9) {
            return (bytes / 1e+9).toFixed(2) + " GB";
        } else if (bytes > 1e+6) {
            return (bytes / 1e+6).toFixed(2) + " MB";
        } else if (bytes > 1e+3) {
            return (bytes / 1e+3).toFixed(2) + " KB";
        } else {
            return (bytes).toFixed(2) + " B";
        }
    }

    formatPercent(perc) {
        return (perc * 100).toFixed(2) + "%";
    }

    render() {
        return (
            <>
            <p>Downloaded: {this.formatBytes(this.state.downloaded)}</p>
            <p>Download Speed: {this.formatBytes(this.state.downloadSpeed)}/s</p>
            <p>Progress: {this.formatPercent(this.state.progress)}</p>
            <video autoPlay={true} id="player"></video>
            </>
        )
    }
}

export default Player;
