const puppeteer = require('puppeteer');

async function spinUpBrowser(username){
    console.log(username)
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('http://mud-golem.com:1996/', {
    waitUntil: 'networkidle2',
  });
    await page.waitForTimeout(1000)
    await page.$eval('#name', (el, username) => el.value = username, username);
    await page.$eval('#dungeon', el => el.value = 'test');
    await page.$eval('#connect', el => el.click())
    await page.waitForTimeout(3000)
    return page
}

async function sendChat(page, txt){
    await page.$eval('#msg', (el, txt) => el.value = txt, txt)
    await page.$eval('#send', el => el.click())
}

async function loop(page, n){
    for(let i = 0; i < 10000; i++){
        console.log(i)
        await sendChat(page, `Text Nachricht Runde ${i}`)
    }
}

(async () => {
    const promieses = ['Hans', 'Marie', 'Joseph', 'Joseph2', 'Joseph3', 'Joseph4', 'Joseph5'].map(name => spinUpBrowser(name))
    const browsers = await Promise.all(promieses);
    browsers.forEach(browser => loop(browser, 1000))

})();