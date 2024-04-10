const userService = require("../services/user.service");

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

module.exports = { create, findAll  };
