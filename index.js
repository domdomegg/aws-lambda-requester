const chromium = require('@sparticuz/chrome-aws-lambda');

exports.handler = async (event, context) => {
    let browser = null;

    browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        // executablePath: '/usr/bin/google-chrome-stable',
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    page.on('response', res => {
        console.info(`Got status ${res.status()} and x-cache header ${res.headers()['x-cache']} from ${res.url()}`)
    });

    const urls = process.env.URLS.split(',');
    for (const url of urls) {
        await page.goto(url);
    }

    await browser.close();
};

// exports.handler()
