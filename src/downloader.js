const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const {isURL} = require("./helpers");
let url = require('url');

const downloader = new YoutubeMp3Downloader({
    ffmpegPath: "/usr/bin/ffmpeg",
    outputPath: "/home/cray/mp3-downloads",
    youtubeVideoQuality: 'lowest',
    queueParallelism: 3,
    progressTimeout: 1000
});

module.exports = {
    download: function (videoIdOrLink, fileName) {
        return new Promise(((resolve, reject) => {

            let videoId = videoIdOrLink;

            if (isURL(videoIdOrLink)) {
                let urlQueryObj = url.parse(videoIdOrLink, true).query
                videoId = urlQueryObj.v;
            }

            if (!videoId) {
                throw new Error("Missing video id.")
            }

            downloader.download(videoId, fileName);

            downloader.on('finished', function (err, data) {
                resolve(data);
            });

            downloader.on('error', function (err) {
                reject(err);
            });
        }))
    },
    downloader
};
