const program = require("commander");
const Downloader = require('./downloader');
const ora = require('ora');

const spinner = ora('Downloading file...').start();
spinner.color = 'yellow';
spinner.text = 'Downloading...';

program.version('0.0.1').description("A simple node-cli youtube downloader");

program.command('ytd')
    .requiredOption('-l, --link <link>', 'A youtube video link or id')
    .option('-n, --name [name]', 'Name of the downloaded file')
    .action((cmObj) => {
        let {link, name} = cmObj;
        Downloader.download(link, name)
            .then(finishedObj => {
                spinner.succeed(`Finished downloading "${finishedObj.videoTitle}" in ${finishedObj.stats.runtime} seconds`);
            }).catch(err => {
            spinner.fail("Could not download that file. An Error occurred.")
            console.error(err);
        });
        Downloader.downloader.on('progress', function (progressObj) {
            spinner.text = `${Number(progressObj.progress.percentage).toFixed(2)}% done`;
        })
    });

program.parse(process.argv);
