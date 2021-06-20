/* eslint-disable no-param-reassign */
const cheerio = require('cheerio')
const request = require('request-promise')
const puppeteer = require('puppeteer')
const https = require('https')
const FormData = require('form-data')
const { prop } = require('lodash/fp')
const { default: axios } = require('axios')

const formUrlEncoded = (x) => Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c])}`, '')

const teste = async ({ username = 'pedro.spoljaric', password = 'maria.maravilha123' }) => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    page.goto('http://intranet.unifesp.br')
    await page.$eval('input[class=username]', (el) => { el.value = username })
    await page.$eval('input[class=password]', (el) => { el.value = password })
    await page.click('input[type=submit]')

    let stop
}

teste({}).catch((err) => {
    let stop
})
