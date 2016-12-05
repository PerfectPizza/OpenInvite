
module.exports = function(){
     return Promise.all([
     knex('users').insert({id: 33838384, name: "Jimmy Henderson", photo: ""}),
  	 knex('users').insert({id: 43859382, name: "Ann Mugella", photo: ""}),
  	 knex('users').insert({id: 73018389, name: "Gromgramel Beckly", photo: ""}),
  	 knex('events').insert({address: "617 Congress Ave, Austin, TX 78701", latitude: "", longitude: "", location_name: "The Hideout Theatre", start_time: "5:30 PM", end_time: "9:30 PM", creator_id: 33838384, description: "I'm hanging out at the hideout coffee shop to study up on some Angular and then probably going to see The Threefer (improv show) at around 8pm. Come join" }),
  	 knex('events').insert({address: "4112 Medical Pkwy, Austin, TX 78756", latitude: "", longitude: "", location_name: "Draught House Pub & Brewery", start_time: "6:30 PM", end_time: "Till we get tired from drinking too much!! (probably till 12pm though)", creator_id: 43859382, description: "I'm getting off of work soon and am going to the Draught House to go chill and drink some brewskies. Maybe try out a new sour. Lez get drunk, buddies!" }),
  	 knex('events').insert({address: "209 E Ben White Blvd #202, Austin, TX 78704", latitude: "", longitude: "", location_name: "Ancient Mysteries", start_time: "6:00 PM", end_time: "10:30 PM", creator_id: 73018389, description: "My fellow patrons of occult arts shall proceed to Ancient Mysteries to procure some reagents, then go out back to commune with Drogmondoour to assist in pulling him across the veil so that the Chaos Bringer may tip the scales of balance of entropy in this world. The more people we get to join, the stronger the connection." })
     ]).then();
  }

