const request = require("supertest") ;
const app = require("../../app");
const {mongoConnect , mongoDisconnect } = require("../../services/mongo");


describe('launches API' , () => {

    // connecting to mongoDB
    beforeAll(async () => {
        await mongoConnect();
    });

    // disconnect from DB 
    afterAll(async () => {
        await mongoDisconnect();
    })

    // using supertest and jest for testing 
    const launchData = {
        rocket : 'bello' ,
        mission : 'mission X' ,
        target : 'mars' ,
        launchDate : 'December 12, 1999' ,
    }

    const launchDataWithoutDate = {
        rocket : 'bello' ,
        mission : 'mission X' ,
        target : 'mars',
    }

    describe('GET /launches :' , () => {
        test('it should respond with 200' , async ()=> {
            await request(app).get('/launches')
            .expect('Content-Type' , /json/)
            .expect(200) ;
        })
    })

    describe('POST /launches' , () => {

        test('it should respond with 201', async () => {
            const response = await request(app).post('/launches')
            .send(launchData) 
            .expect('Content-Type' , /json/)
            .expect(201)
            
            // match launch date with request date
            let launchDate = new Date(launchData.launchDate).valueOf() ;
            let requestDate = new Date(response.body.launchDate).valueOf() ;
            expect(requestDate).toBe(launchDate) ;

            // match the rest of the data
            expect(response.body).toMatchObject(launchDataWithoutDate) ;
        });

        test('testing for missing properties' , async () =>{
            let response = await request(app) 
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type' , /json/)
            .expect(400) ;
            
            expect(response.body).toStrictEqual({"error" : "missing mission informations" })
        });

        test('test for invalid date' , async () => {
            let response = await request(app)
            .post('/launches')
            .send(Object.assign(launchDataWithoutDate , {launchDate : 'december 55, 2001'}))
            .expect('Content-Type' , /json/)
            .expect(400) ;
            
            expect(response.body).toStrictEqual({"error" : "invalid date"})
        });
    });
})
