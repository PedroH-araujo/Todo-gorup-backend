/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary()
    table.string('title').notNullable()
    table.text('description')
    table.string('status').defaultTo('todo')
    table.timestamps(true, true)
    table.uuid('user_id').references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
