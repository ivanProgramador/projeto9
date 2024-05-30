let supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);

let mainUser = {name:'Ivan',email:'ivan@teste.com.br', password:'123456'}
beforeAll(()=>{

    return request.post("/user").send(mainUser).then(res=>{}).catch(err=>{console.log(err)});
  
});


afterAll(()=>{

    return request.delete(`/user/${mainUser.email}`).then(res=>{}).catch(err=>{console.log(err)});

});


describe("cadastro de usuarios",()=>{

    test("Deve cadastrar um usuario com sucesso", async ()=>{

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Master",email,password:'123456'};

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

describe("Autenticação",()=>{

    test("Deve me retornar um token quando logar",()=>{
        return request.post("/auth")
                      .send({email: mainUser.email,password:mainUser.password})
                      .then(res=>{
                         expect(res.statusCode).toEqual(200);
                         expect(res.body.token).toBeDefined();
                      })
                      .catch(err=>{
                         fail(err);
                      })
                })

    test("Deve impedir que um usuario não cadastrado acesse",()=>{
       return request.post("/auth").send({email:"umemailqualquer@teste.br",password:'123456787'})
                     .then(res=>{
                        expect(res.statusCode).toEqual(403);
                        expect(res.body.errors.email).toEqual("E-mail não cadastrado");
                     }).catch(err=>{
                        fail(error)
                     })


        })

        test("Deve impedir que um usuario entre com a senha errada ",()=>{
            return request.post("/auth").send({email:mainUser.email,password:'bolinha'})
                          .then(res=>{
                             expect(res.statusCode).toEqual(403);
                             expect(res.body.errors.password).toEqual("senha incorreta");
                          }).catch(err=>{
                             fail(error)
                          })
     
     
             })

    
    });