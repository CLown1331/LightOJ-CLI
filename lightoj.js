const getBrowser = require('./browser').getBrowser;
const cheerio = require('cheerio');
const Spinner = require('cli-spinner').Spinner;

const submit = async(username, password, file, problemId) => {
    let browser;
    let spinner;
    try {
        spinner = new Spinner('processing.. %s');
        spinner.setSpinnerString('|/-\\');
        spinner.start();
        browser = await getBrowser();
        const page = await browser.newPage();
        await page.goto('http://lightoj.com/login_main.php');
        await page.type('#myuserid', username);
        await page.type('#mypassword', password);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
        await page.goto('http://lightoj.com/volume_submit.php?problem=' + problemId, {
            waitUntil: 'networkidle2',
        });
        await page.type('textarea', file);
        await page.click('input[type="submit"]');
        browser.close();
        return 'Success';
    } catch(err) {
        console.error(err);
        return 'Fail';
    } finally {
        browser.close();
        spinner.stop();
    }
}

const checkIfSolved = async(username, password, problemId) => {
    let browser;
    let spinner;
    try {
        spinner = new Spinner('processing.. %s');
        spinner.setSpinnerString('|/-\\');
        spinner.start();
        browser = await getBrowser();
        const page = await browser.newPage();
        await page.goto('http://lightoj.com/login_main.php');
        await page.type('#myuserid', username);
        await page.type('#mypassword', password);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();

        await page.goto(`http://lightoj.com/volume_userstat.php`, {
          waitUntil: 'networkidle2',
        });
    
        const html = await page.content();
        
        const $ = cheerio.load(html);

        const solved = $('.leftTop').eq(3).parent().parent().find('a').map(function () {
          return $(this).text().trim();
        }).toArray();

        const isSolved = !!solved.find(id => id === problemId);

        return `\nloj-${problemId}: ${isSolved ? 'solved': 'not solved'}`;
    } catch(err) {
        console.error(err);
        return 'Fail';
    } finally {
        browser.close();
        spinner.stop();
    }
}

module.exports = {
    submit,
    checkIfSolved
};