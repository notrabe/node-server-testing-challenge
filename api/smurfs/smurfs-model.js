const db = require('../../data/dbConfig')

module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById
}

async function insert(smurf) {
    const [id] = await db('smurfs').insert(smurf)
    return db('smurfs').where({id}).first()
}

function update() {

}

function remove(id) {
    return db('smurfs').where({id}).delete()
}

function getAll() {
    return db('smurfs')
}

function getById(id) {
    return db('smurfs').where('id', id).first()
}