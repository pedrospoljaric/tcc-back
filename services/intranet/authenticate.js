const puppeteer = require('puppeteer')
const { APIError } = require('../../utils')

const waitForLogin = (page) => new Promise((resolve, reject) => {
    page.waitForSelector('#logout').then(() => {
        resolve(true)
    }).catch(reject)
    page.waitForNavigation({ waitUntil: 'networkidle2' }).then(() => {
        if (page.url().includes('loginx=1')) resolve(false)
    }).catch(reject)
})

module.exports = async ({ username, password }) => {
    if (process.env.NODE_ENV === 'development') return true

    let loginResult
    let page
    let browser

    try {
        browser = await puppeteer.launch({
            // executablePath: 'D:\\Programas(x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            args: ['--no-sandbox']
        })

        page = await browser.newPage()
        await page.goto('http://intranet.unifesp.br')

        await page.focus('input[name=username]')
        await page.keyboard.type(username)
        await page.focus('input[name=password]')
        await page.keyboard.type(password)
        await page.click('input[type=submit]')

        loginResult = await waitForLogin(page)

        await browser.close()
        return loginResult
    } catch (err) {
        if (browser) await browser.close()
        throw APIError('Falha ao autenticar. Tente novamente mais tarde', 503)
    }
}
