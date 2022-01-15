const { prop } = require('lodash/fp')
const { PdfReader } = require('pdfreader')

const readPdf = (file) => new Promise((resolve, reject) => {
    const items = []
    new PdfReader().parseFileItems(file, (err, item) => {
        if (err) reject(err)
        if (!item) resolve(items)
        else if (prop('text', item)) items.push(item)
    })
})

const columns = {
    year: [3.654, 5.5],
    semester: [5.835, 7],
    term: [7.336, 9.2],
    shift: [9.437, 11],
    class_name: [11.273, 13],
    discipline_code: [13.521, 15.5],
    discipline_name: [15.6, 23],
    group: [23.5, 30],
    category: [31.127, 35],
    absences: [35.5, 37],
    attendance: [37.5, 39],
    credits: [39.5, 41],
    workload: [41.5, 44],
    grade: [44.384, 46],
    status: [46.5, 50]
}

module.exports = async ({ file }) => {
    const items = await readPdf(file.path)

    const records = []
    const rows = items.map(prop('text'))

    const courseName = prop(`${rows.indexOf('Curso: ') + 1}`, rows)

    let record = {}
    items.slice(rows.indexOf('Situação') + 1).forEach((item) => {
        if (item.x >= columns.year[0] && item.x <= columns.year[1]) record = { year: item.text }
        else if (item.x >= columns.semester[0] && item.x <= columns.semester[1]) record.semester = record.semester ? `${record.semester} ${item.text}` : item.text
        else if (item.x >= columns.term[0] && item.x <= columns.term[1]) record.term = record.term ? `${record.term} ${item.text}` : item.text
        else if (item.x >= columns.shift[0] && item.x <= columns.shift[1]) record.shift = record.shift ? `${record.shift} ${item.text}` : item.text
        else if (item.x >= columns.class_name[0] && item.x <= columns.class_name[1]) record.class_name = record.class_name ? `${record.class_name} ${item.text}` : item.text
        else if (item.x >= columns.discipline_code[0] && item.x <= columns.discipline_code[1]) record.discipline_code = record.discipline_code ? `${record.discipline_code} ${item.text}` : item.text
        else if (item.x >= columns.discipline_name[0] && item.x <= columns.discipline_name[1]) record.discipline_name = record.discipline_name ? `${record.discipline_name} ${item.text}` : item.text
        else if (item.x >= columns.group[0] && item.x <= columns.group[1]) record.group = record.group ? `${record.group} ${item.text}` : item.text
        else if (item.x >= columns.category[0] && item.x <= columns.category[1]) record.category = record.category ? `${record.category} ${item.text}` : item.text
        else if (item.x >= columns.absences[0] && item.x <= columns.absences[1]) record.absences = record.absences ? `${record.absences} ${item.text}` : item.text
        else if (item.x >= columns.attendance[0] && item.x <= columns.attendance[1]) record.attendance = record.attendance ? `${record.attendance} ${item.text}` : item.text
        else if (item.x >= columns.credits[0] && item.x <= columns.credits[1]) record.credits = record.credits ? `${record.credits} ${item.text}` : item.text
        else if (item.x >= columns.workload[0] && item.x <= columns.workload[1]) record.workload = record.workload ? `${record.workload} ${item.text}` : item.text
        else if (item.x >= columns.grade[0] && item.x <= columns.grade[1]) record.grade = record.grade ? `${record.grade} ${item.text}` : item.text
        else if (item.x >= columns.status[0] && item.x <= columns.status[1]) {
            record.status = item.text
            if (record.semester) records.push(record)
            record = {}
        }
    })

    return {
        courseName,
        records
    }
}
