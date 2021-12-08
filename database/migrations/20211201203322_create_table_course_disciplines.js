exports.up = (knex) => knex.schema
    .createTable('course_disciplines', (table) => {
        table.increments()
        table.integer('course_id').notNullable()
        table.integer('semester_number').notNullable()
        table.integer('discipline_id')
        table.integer('discipline_group_id')

        table.foreign('course_id').references('id').on('courses')
        table.foreign('discipline_id').references('id').on('disciplines')
        table.foreign('discipline_group_id').references('id').on('discipline_groups')
    })
    .raw(`
        ALTER TABLE course_disciplines
        ADD CONSTRAINT chk_only_one_is_not_null
        CHECK (NUM_NONNULLS(discipline_id, discipline_group_id) = 1)
    `)

exports.down = (knex) => knex.schema
    .dropTable('course_disciplines')
