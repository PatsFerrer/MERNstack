const userService = require("../services/user.service");
const mongoose = require('mongoose');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: 'All fields required' });
    }

    const user = await userService.createService(req.body);

    if(!user){
        return res.status(400).send({ message: 'Error creating User' });
    }

    res.status(201).send({
        message: 'User created successfully',
        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    })
}

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if(users.lenght === 0){
        return res.status(400).send({message: 'No users found'});
    }

    res.send(users)
}

const findById = async (req, res) => {
    // pega o parâmetro da rota
    const id = req.params.id;

    // verifica se o ID existe
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: 'Invalid ID' });
    }

    // buscar o usuário pelo id no service
    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    res.send(user);
}

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;
    
    if (!name && !username && !email && !password && !avatar && !background) {
        res.status(400).send({ message: 'Submit at least one field for update' });
    }
    
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: 'Invalid ID' });
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    await userService.updateService(id, name, username, email, password, avatar, background);

    res.send({ message: 'User updated successfully' });
}

module.exports = { create, findAll, findById, update };
