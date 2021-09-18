const { createConnection } = require("typeorm")

let DbCon;
beforeAll(() => {
    require("./src/config")
})

beforeEach(async (done) => {
    try {
        DbCon = await createConnection({
            type: 'mongodb',
            host: process.env.DB_HOST,
            port: 27017,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            dropSchema: true,
            migrations: ['/src/db/migrations/*.ts'],
            entities: ['**/api/**/*Model.ts'],
            useUnifiedTopology: true
        });
        done()
    } catch (err) {
        throw new Error(('Unable to connect to the database:' + err));
    }

});

afterEach(() => {
    return DbCon.close()
})
