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
    const form = new FormData()

    form.append('username', username)
    form.append('password', password)

    const response = await axios.post('http://intranet.unifesp.br/restrict/login.php3', form,
        {
            headers: {
                Host: 'intranet.unifesp.br',
                Cookie: '__utmz=132441418.1622990931.24.11.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga=GA1.2.87763416.1604963064; __utma=132441418.87763416.1604963064.1622990931.1623192166.25; INTRANET=18ae6d0b273c741d72a38e2d64d15f35'
            }
        })

    // autenticação funcionou

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    })

    const response2 = await axios.post('https://sistemas.unifesp.br/acad/historico-graduacao/vinculo',
        {
            httpsAgent,
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                Host: 'intranet.unifesp.br',
                Cookie: '__utmz=132441418.1622990931.24.11.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga=GA1.2.87763416.1604963064; __utma=132441418.87763416.1604963064.1622990931.1623192166.25; HISTORICOINTRANET=fiso1eupdpgth2600aq1t7isj6'
            }
        })

    let stop

    if (prop('request._redirect.redirects[0].redirectUri', response) === 'http://intranet.unifesp.br/restrict/index3.php') {
        return true
    }
    return false
}

teste({}).catch((err) => {
    let stop
})
