let supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);

/*
 como o nome da função ja diz essa função sera executada antes de cada teste 
 dentro dela eu posso colocar qualquer logica, a uitilidade disso e que posso 
 reaproveitar o codigo ou dados que ela gerar para poder usar nos testes  
*/ 
beforeAll(()=>{
  
});

/*
 Essa função será executada depois de todos os testes eu posso usar ela
 para apagar os dados que não servem mais depois do teste para não sujar 
 o banco como dados que eu não seram mais uteis depois dos testes   
*/
afterAll(()=>{

});

//a função describe separa o teste em grupos por exemplo esse grupo de testes e sobre o cxadastro de usuarios
describe("cadastro de usuarios",()=>{
 
    // esse de fato é um teste que executa o cadastro de um, novo usuario no banco 
    test("Deve cadastrar um usuario com sucesso", async ()=>{

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Ivan",email,password:'123456'};

       await request.post("/user")
        .send(user)
        .then(res=>{
            //essa e reposta que ele espera da resquisição
            //qualquer respota diferente dessa o teste vai falhar 
             
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