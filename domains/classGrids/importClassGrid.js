/* eslint-disable no-plusplus */
const ExcelJS = require('exceljs')
const {
    prop, split, trim
} = require('lodash/fp')
const db = require('#database')

const daysOfTheWeek = {
    Segunda: 1,
    Terça: 2,
    Quarta: 3,
    Quinta: 4,
    Sexta: 5,
    Sábado: 6
}

const times = {
    '8h00': '08:00:00',
    '10h00': '10:00:00',
    '12h00': '12:00:00',
    '13h30': '13:30:00',
    '15h30': '15:30:00',
    '17h30': '17:30:00',
    '19h00': '19:00:00',
    '21h00': '21:00:00',
    '23h00': '23:00:00'
}

module.exports = async ({ file }) => {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(file.path)
    const worksheet = workbook.getWorksheet(1)
    const { rowCount } = worksheet
    const grid = worksheet.getRows(0, worksheet.rowCount).map(prop('values'))

    const classes = []

    for (let row = 3; row < rowCount; row++) {
        const columnCount = grid[row].length
        let isClassNameRow = false
        for (let column = 3; column < columnCount; column++) {
            if (grid[row][column]) {
                isClassNameRow = true
                const disciplineName = trim(grid[row][column].replace('(Veteranos)', '').replace('(reof)', '').replace('(Reof)', ''))
                const classNameAndTeacherName = grid[row + 1][column]
                const [className, teacherName] = split(' - ', classNameAndTeacherName)
                const classDay = trim(grid[2][column] || grid[2][column - 1])
                const classTime = split('-', grid[row][2].replace(' - ', '-'))
                const classStartTime = trim(classTime[0])
                const classEndTime = trim(classTime[1])

                if (daysOfTheWeek[classDay] >= 1 && daysOfTheWeek[classDay] <= 5) {
                    classes.push({
                        disciplineName, className, classDay, classStartTime, classEndTime, teacherName
                    })
                }
            }
        }
        if (isClassNameRow) row++
    }

    const meetingTimes = await db.select('id', 'day_of_the_week AS dayOfTheWeek', 'start_time AS startTime', 'end_time AS endTime').from('meeting_times')
    const meetingTimesReference = {}
    meetingTimes.forEach((meetingTime) => {
        const { dayOfTheWeek, startTime, endTime } = meetingTime
        meetingTimesReference[`${dayOfTheWeek}-${startTime}-${endTime}`] = meetingTime
    })

    const disciplines = await db.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { name } = discipline
        disciplineIdByName[name.toUpperCase()] = discipline
    })

    const classesInfo = classes.map((currentClass) => ({
        ...currentClass,
        meetingTime: meetingTimesReference[`${daysOfTheWeek[currentClass.classDay]}-${times[currentClass.classStartTime]}-${times[currentClass.classEndTime]}`],
        discipline: disciplineIdByName[currentClass.disciplineName.toUpperCase()] || 'n achei'
    }))

    classesInfo.sort((a, b) => {
        if (a.meetingTime.id < b.meetingTime.id) return -1
        return 1
    })

    return {
        classes: classesInfo
    }
}
