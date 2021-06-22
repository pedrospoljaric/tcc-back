/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const puppeteer = require('puppeteer')
const db = require('../../database')

module.exports = async ({ username, password }) => {
    if (!username || !password) throw Error('Usuário e/ou senha não fornecidos.')

    const browser = await puppeteer.launch({
        // executablePath: 'D:\\Programas(x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        args: ['--no-sandbox']
    })

    const page = await browser.newPage()
    await page.goto('http://intranet.unifesp.br')

    await page.focus('input[name=username]')
    await page.keyboard.type(username)
    await page.focus('input[name=password]')
    await page.keyboard.type(password)
    await page.click('input[type=submit]')

    await page.waitForSelector('#logout')

    await page.$$eval('#menuprivado li a', (elements) => {
        const element = elements.find((eç) => eç.textContent === 'Unifesp')
        element.click()
        return elements.map((element2) => element2.textContent)
    })

    await page.waitForSelector('#tbCorpoVisual')

    await page.$$eval('#tbCorpoVisual tbody tr td a', (elements) => {
        const element = elements.find((el) => el.textContent === '\n\nHistórico Acadêmico On Line (Visualizar no Google Chrome ou IE)')
        element.click()
        return elements.map((element2) => element2.textContent)
    })

    const elementHandle = await page.waitForSelector('#iframe iframe')

    const frame = await elementHandle.contentFrame()

    await frame.$$eval('a', (elements) => {
        const element = elements.find((el) => el.textContent === 'Continuar')
        element.setAttribute('target', '_self')
        element.click()
        return elements.map((element2) => element2.textContent)
    })

    const table = await frame.waitForSelector('.tblHistorico tbody')

    const recordsUrls = await table.$$eval('a', (records) => records.map((record) => record.getAttribute('href')))

    const records = []
    for (const recordUrl of recordsUrls) {
        await page.goto(recordUrl)

        await page.waitForSelector('form[name=frmHistorico]')

        const columns = await page.$$eval('.tblHistorico thead tr th', (elements) => elements.map((column) => column.textContent))
        const record = await page.$$eval('.tblHistorico tbody tr', (lines) => lines.map((line) => line.textContent))

        records.push(record.map((line) => {
            const obj = {}
            const attributes = line.replace(/\t/g, '').replace(/^\n/, '').replace(/\n$/, '').split('\n')
            attributes.forEach((attribute, index) => {
                obj[columns[index]] = attribute
            })
            return obj
        }))
    }

    await db.table('records').insert({ entries: records })

    return records
}
