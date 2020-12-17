
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('smurfs').del()
  .trucate()  
  .then(function () {
      // Inserts seed entries
      return knex('smurfs').insert([
        {name: 'PapaSmurf'},
        {name: 'Smurfette'},
        {name: 'Gargamel'}
      ]);
    });
};
