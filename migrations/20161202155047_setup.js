
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', table => {
    //table.increments('id').primary(); //replace increments with uuid
    table.string('id');
    table.string('name');
    table.string('photo'); //image?
    table.string('email');
  }),
  knex.schema.createTableIfNotExists('events', table => {
    //table.increments('id').primary();  //replace increments with uuid
    //table.uuid('id'); //.primary();
    table.uuid('id');
    table.string('address');
    table.string('latitude');
    table.string('longitude'); //string?
    table.string('location_name');
    table.integer('start_time');
    table.integer('end_time');
    table.string('creator_id'); //.references('id').inTable('users');  //foreign key with user id
    table.string('description');
    table.string('title');
  }),
  knex.schema.createTableIfNotExists('events_users', table => {
    //table.increments('id').primary(); //replace increments with uuid
    //table.uuid('id'); //.primary();
    //table.increments();
    // table.integer('user_id').unsigned();
    // table.foreign('user_id').references('id').inTable('users'); //integer key with users id
    table.uuid('id');
    table.string('user_id');
    table.integer('event_id');

    //table.integer('events_id').references('id').inTable('events'); //integer key with events id
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('events_users'),
  knex.schema.dropTableIfExists('events'),   //might need to deal with dropping integer keys first
  knex.schema.dropTableIfExists('users'),

]);
