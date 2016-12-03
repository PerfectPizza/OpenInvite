
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', table => {
    //table.increments('id').primary(); //replace increments with uuid
    table.uuid('id').primary();
    table.string('name');
    table.string('photo'); //image?
    table.string('email');
  }),
  knex.schema.createTableIfNotExists('events', table => {
    //table.increments('id').primary();  //replace increments with uuid
    table.uuid('id').primary();
    table.string('address');
    table.string('latitude');
    table.string('longitude'); //string?
    table.string('location_name');
    table.integer('start_time');
    table.integer('end_time');
    table.foreign('creator_id').references('id').inTable('users');  //foreign key with user id
    table.string('description');
    table.string('title');
  }),
  knex.schema.createTableIfNotExists('events_by_user', table => {
    //table.increments('id').primary(); //replace increments with uuid
    table.uuid('id').primary();
    table.foreign('user_id').references('id').inTable('users'); //foreign key with users id
    table.foreign('event_id').references('id').inTable('events'); //foreign key with events id
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('users'),   //might need to deal with dropping foreign keys first
  knex.schema.dropTableIfExists('events'),
  knex.schema.dropTableIfExists('events_by_user'),
]);
