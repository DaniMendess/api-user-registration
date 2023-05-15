// BIBLIOTECA DE ID
const randonId = require('uuid')
const express = require('express');

const cors = require('cors')

const port = process.env.PORT || 3001;



const app = express()
app.use(express.json())

app.use(cors())

//const port = 3002;


// Middleware 
const MyfirstMiddle = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(element => element.id === id)

    request.userId = id
    request.userIndex = index

    if(index < 0 ){
        return response.status(404).json({message: "Usuário não encontrado!"})
    }
   
    next()
}

// ROTAS

app.get('/', (request,response) => {
    return response.json("Ok 👌")
})

const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request,response) => {
    const id = randonId.v4()
    const {name, age} = request.body

    const user = {id, name,age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', MyfirstMiddle, (request,response) => {
    
    const id = request.userId
    const index = request.userIndex

    const { name, age} = request.body

    const updateUser = {id, name, age}

    users[index] = updateUser

    return response.status(201).json(updateUser)
})

app.delete('/users/:id',MyfirstMiddle, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(200).json(`Usuario na posição ${users}, foi removido!`)
})

// PORTA
app.listen(port, () => {
    console.log("👌")
})