/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const puppeteer = require('puppeteer')
const crypto = require('crypto')
const db = require('../../database')

const keyBlacklist = ['Nome', 'CPF', 'RG', 'Órgão Expedidor', 'Email(s)']

const getSHA256OfString = (str) => crypto.createHash('sha256').update(str).digest('hex')

module.exports = async ({ username, password }) => {
    if (!username || !password) throw Error('Usuário e/ou senha não fornecidos.')

    const browser = await puppeteer.launch({
        executablePath: 'D:\\Programas(x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        // args: ['--no-sandbox']
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
        return elements.map((el) => el.textContent)
    })

    const table = await frame.waitForSelector('.tblHistorico tbody')

    const recordsUrls = await table.$$eval('a', (records) => records.map((record) => record.getAttribute('href')))

    let userHash

    const records = []
    for (const recordUrl of recordsUrls) {
        await page.goto(recordUrl)

        await page.waitForSelector('form[name=frmHistorico]')

        const headerEntries = await page.$$eval('div .alert .row div', (elements) => elements.map((el) => el.textContent))

        const headerData = {}
        headerEntries.forEach((headerEntry) => {
            const [key, value] = headerEntry.split(': ')
            if (key === 'Matricula') userHash = userHash || getSHA256OfString(value)
            if (!keyBlacklist.includes(key)) headerData[key] = value
        })

        const columns = await page.$$eval('.tblHistorico thead tr th', (elements) => elements.map((column) => column.textContent))
        const record = await page.$$eval('.tblHistorico tbody tr', (lines) => lines.map((line) => line.textContent))

        records.push({
            header_data: headerData,
            entries: record.map((line) => {
                const obj = {}
                const attributes = line.replace(/\t/g, '').replace(/^\n/, '').replace(/\n$/, '').split('\n')
                attributes.forEach((attribute, index) => {
                    obj[columns[index]] = attribute
                })
                return obj
            })
        })
    }

    await db
        .table('records')
        .insert({ user_hash: userHash, json_data: JSON.stringify(records) })
        .onConflict('user_hash')
        .merge()

    return records
}
