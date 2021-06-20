/* eslint-disable no-param-reassign */
const puppeteer = require('puppeteer')

module.exports = async ({ username = 'pedro.spoljaric', password = 'maria.maravilha123' }) => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    page.goto('http://intranet.unifesp.br')
    await page.$eval('input[class=username]', (el) => { el.value = username })
    await page.$eval('input[class=password]', (el) => { el.value = password })
    await page.click('input[type=submit]')

    browser.close()
}
