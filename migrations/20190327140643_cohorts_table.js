//  Cohorts Table
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cohorts', function (tbl) {
    // Primary key to configure table: called id to make it auto increment
    tbl.increments();  // allows for auto incrementing of index

    tbl.string('name', 128).notNullable().unique();  // name must be unique, is required and is expected to be a string.
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
