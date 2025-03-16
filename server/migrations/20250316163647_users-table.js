/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('name').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.timestamps(true, true)
    table.uuid('team_id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
