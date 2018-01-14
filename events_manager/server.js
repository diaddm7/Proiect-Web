var express=require("express")
var Sequelize=require("Sequelize")
var nodeadmin=require("nodeadmin")
var cors=require("cors")

//conectarea la baza de date
var sequelize=new Sequelize('dianaweb','root',{
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log("Conectare cu succes!")
})

var Categorii=sequelize.define('categorii',{
    id_categorie:Sequelize.INTEGER,
    denumire_categorie:Sequelize.STRING,
    nr_evenimente: Sequelize.INTEGER
})

var Evenimente=sequelize.define('evenimente',{
    id_eveniment: Sequelize.INTEGER,
    denumire_eveniment:Sequelize.STRING,
    data:Sequelize.STRING,
    locatie:Sequelize.STRING,
    intrare:Sequelize.INTEGER
})

var Rezervare=sequelize.define('rezervare',{
    id_rezervare:Sequelize.INTEGER,
    nume_complet:Sequelize.STRING,
    email:Sequelize.STRING,
    telefon:Sequelize.INTEGER,
    id_eveniment:Sequelize.INTEGER
})

Rezervare.belongsTo(Evenimente,{foreignKey:'id_eveniment',targetKey:'id;'})

var app=express()
app.use('/nodeadmin',nodeadmin(app))
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

//preia lista de categorii
app.get('categorii',function(request,response){
    Categorii.findAll().then(function(categorii){
        response.status(200).send(categorii)
    })
})

//preia o categorie in functie de id
app.get('categorii/:id_categorie',function(request,response){
    Categorii.findOne({where: {id_categorie:request.params.id}}).then(function(categorie){
        if(categorie){
            response.status(200).send(categorie)
        } else {
            response.status(404).send()
        }
    })
})

//crearea unei categorii noi
app.post('/categorii',function(request, response) {
    Categorii.create(request.body).then(function(categorie){
        response.status(201).send(categorie)
    })
})

app.put('/categorii/:id',function(request,response){
    Categorii.findById(request.params.id).then(function(categorie) {
        if(categorie){
            categorie.update(request.body).then(function(categorie){
                response.status(201).send(categorie)
            }).catch(function(eroare){
                response.status(404).send(eroare)
            })
        } else{
            response.status(404).send('Not found')
        }
    })
})

app.delete('/categorii/:id',function(request,response){
    Categorii.findById(request.params.id).then(function(categorie){
        if(categorie){
            categorie.destroy().then(function(){
                response.status(204).send()
            })
        }
    })
})

app.listen(8080)