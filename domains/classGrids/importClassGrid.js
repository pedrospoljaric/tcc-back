/* eslint-disable no-plusplus */
const ExcelJS = require('exceljs')
const { prop, split } = require('lodash/fp')
const db = require('../../database')

module.exports = async ({ file }) => {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(file.path)
    const worksheet = workbook.getWorksheet(1)
    const { rowCount } = worksheet
    const grid = worksheet.getRows(0, worksheet.rowCount).map(prop('values'))

    const classes = []

    for (let r = 3; r < rowCount; r++) {
        const columnCount = grid[r].length
        let isClassNameRow = false
        for (let c = 3; c < columnCount; c++) {
            if (grid[r][c]) {
                isClassNameRow = true
                const disciplineName = grid[r][c]
                const classNameAndTeacherName = grid[r + 1][c]
                let stop
                const [className, teacherName] = split(' - ', classNameAndTeacherName)
                const classDay = grid[2][c]
                const classTime = grid[r][2]

                classes.push({
                    disciplineName, className, classDay, classTime, teacherName
                })
            }
        }
        if (isClassNameRow) r++
    }

    console.log(classes)
}
