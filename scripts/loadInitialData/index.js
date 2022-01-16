const db = require('../../database')
const insert = require('./utils')

const loadInitialData = async () => {
    try {
        await db.transaction(async (trx) => {
            // await insert.meetingTimes(trx)
            // await insert.disciplines(trx)
            // await insert.teachers(trx)
            // await insert.courses(trx)
            // await insert.disciplineGroups(trx)
            // await insert.disciplineGroupsDisciplines(trx)
            // await insert.computerEngineeringDisciplines(trx)
            // await insert.computerScienceDisciplines(trx)
            await insert.eletivasBCCIDisciplines(trx)
            await insert.eletivasBCCIIDisciplines(trx)
            await insert.eletivasBCCIIIDisciplines(trx)
            // await insert.disciplinesRequirements(trx)
        })
        db.destroy()
    } catch (err) {
        db.destroy()
        throw err
    }
}

loadInitialData()
