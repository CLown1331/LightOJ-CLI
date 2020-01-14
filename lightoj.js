const getBrowser = require('./browser').getBrowser;

const submit = async(username, password, file, problemId) => {
    try {
        const browser = await getBrowser();
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
    }
}

module.exports = {
    submit
};