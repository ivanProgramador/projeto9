let supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);

describe("cadastro de usuarios",()=>{

    test("Deve cadastrar um usuario com sucesso", async ()=>{

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Ivan",email,password:'123456'};

       await request.post("/user")
        .send(user)
        .then(res=>{

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);

        }).catch((err)=>{
            console.log(err)
        })

    })

    test("Garantir que um usuario não seja cadastrado com dados vazios ",async ()=>{

        let user = {name: "",email:"",password:""};

        await request.post("/user")
        .send(user)
        .then(res=>{

            expect(res.statusCode).toEqual(400);
           

        }).catch((err)=>{
            console.log(err)
        })


    })

    test("Deve impedir que um usuario se cadastre com um e-mail repetido",()=>{
      
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Ivan",email,password:'123456'};

        //cadastrando uum usuário
        return request.post("/user")
                      .send(user)
                      .then(res=>{
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.email).toEqual(email);


        //cadastrando o usuario de novo com o mesmo e-mail
        return request.post("/user")
                      .send(user)
                      .then(res=>{
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual("E-mail já cadastrado");
                    }).catch(err=>{
                        console.log(err);
                     });   



                      }).catch(err=>{
                         console.log(err);
                      });

        
        



    })
})