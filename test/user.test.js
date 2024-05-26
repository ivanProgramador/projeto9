let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

describe('Cadastro de usuarios',()=>{

   test('Deve cadastrar um usuario com sucesso',()=>{
       
    let time = Date.now();

    let email = `${time}@gmail.com`;

    let user = {name:"Ivan",email,password:"12345"};

    return request.post("/user")
                  .send(user)
                  .then(res=>{
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.email).toEqual(email);
                  }).catch(err=>{
                    console.log(err)
                  })



   })

})

