const express = require("express");
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize("sqlite:./players.db", {
    logging: false,
    dialect: "sqlite",
    define: {
        timestamps: false,
    },
});

class User extends Model {}
User.init({
    number: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    wikipedia_url: DataTypes.STRING
}, { sequelize, modelName: "Players" });

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

(async() => {
    await sequelize.sync({ alter: true });

    app.get('/users', async(req, res) => {
        const all = await User.findAll();
        res.send(JSON.stringify(all))
    });

    app.post('/users', async(req, res) => {
        if (true) {
            await User.create({
                number: req.body.number,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                avatar: req.body.avatar,
                wikipedia_url: req.body.wikipedia_url
            });
        }
        res.status(201).send('{"code":201}');
    });

    app.get('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        return res.status(200).send(user).header()
    });

    app.delete('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        await user.destroy()
        res.status(200).send({ msg: "User was deleted" })
    });

    app.put('/users/:id', async(req,res) => {
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        if(req.body.number!= null) user.number = req.body.number
        if(req.body.first_name!= null) user.first_name = req.body.first_name
        if(req.body.last_name!= null) user.last_name = req.body.last_name
        if(req.body.avatar!= null) user.avatar = req.body.avatar
        if(req.body.wikipedia_url!= null) user.wikipedia_url = req.body.wikipedia_url
        await user.save()
        res.status(200).send({ msg: "User was updated" })
    })
    
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
})
