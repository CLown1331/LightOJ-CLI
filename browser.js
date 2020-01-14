const puppeteer = require('puppeteer');

module.exports = {
    getBrowser: async() => {
        return await puppeteer.launch({
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process']
            }
        );
    }
};