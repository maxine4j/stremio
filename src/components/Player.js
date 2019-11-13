import React from 'react';
import WebTorrent from 'webtorrent'

const trackers = ['wss://tracker.btorrent.xyz', 'wss://tracker.openwebtorrent.com', 'wss://tracker.fastcast.nz']

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.client = new WebTorrent({
            announce: trackers,
        })
        this.state = {
            downloaded: 0,
            downloadSpeed: 0,
            progress: 0,
        }
    }

    componentDidMount() {
        console.log("Attempting to start torrent with hash:", this.props.torrentId);
        this.client.add(this.props.torrentId, (torrent) => {
            console.log("This is the player torrent: ", torrent);
            for (let i = 0; i < torrent.files.length; i++) {
                console.log("Appending a file to body:");
                torrent.files[i].appendTo("body");
            }
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
