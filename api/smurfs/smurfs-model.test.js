const Smurf = require('./smurfs-model')
const db = require('../../data/dbConfig')

const PapaSmurf = { name: 'PapaSmurf' }
const Smurfette = { name: 'Smurfette' }
const Gargamel = { name: 'Gargamel' }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('smurfs').truncate()
})
afterAll(async() => {
    await db.destroy()
})

describe('Smurfs model', () => {
    it('Smurf.getAll returns empty array if no smurfs', async () => { //getAll
        const result = await Smurf.getAll()
        expect(result).toHaveLength(0)
    } )
    it('Smurf.getAll returns smurfs', async () => {
        await db('smurfs').insert(PapaSmurf)
        const result = await Smurf.getAll()
        expect(result).toHaveLength(1)
    })
    it('Smurf.getById returns smurf from the given id', async () => { //getById
        await db('smurfs').insert(Smurfette)
        const result = await Smurf.getById(1)
        console.log(result)
        expect(result).toMatchObject(Smurfette)
    })
    it('Returns nothing if smurf is not in db', async() => {
        const result = await Smurf.getById(1)
        console.log(result)
        expect(result).toBeUndefined()
    })
    it('Posts a smurf', async () => { //insert
        await db('smurfs').insert(Gargamel)
        const result = await Smurf.getAll()
        console.log(result)
        console.log(Gargamel)
        expect(result).toHaveLength(1)
        const id = await Smurf.getById(1)
        expect(id).toMatchObject(Gargamel)
    })
    it('Removes a smurf', async () => { //remove
        await db('smurfs').insert(PapaSmurf)
        await Smurf.remove(1)
        const result = await db('smurfs')
        expect(result).toHaveLength(0)
    })
})