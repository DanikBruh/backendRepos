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

let users = [{ number: 31, first_name: "Jarrett", last_name: "Allen", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628386.png" },
    { number: 1, first_name: "Bruce", last_name: "Brown", "avatar": "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628971.png" },
    { number: 4, first_name: "Chris", last_name: "Chiozza", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629185.png" },
    { number: 33, first_name: "Nicolas", last_name: "Claxton", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629651.png" },
    { number: 26, first_name: "Spencer", last_name: "Dinwiddie", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203915.png" },
    { number: 7, first_name: "Kevin", last_name: "Durant", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png" },
    { number: 8, first_name: "Jeff", last_name: "Green", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201145.png" },
    { number: 12, first_name: "Joe", last_name: "Harris", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203925.png" },
    { number: 11, first_name: "Kyrie", last_name: "Irving", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202681.png" },
    { number: 22, first_name: "Caris", last_name: "Levert", avatar: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627747.png" }
];

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
        console.log("req body: " + req.body.first_name);
        console.log("req body: " + req.body.last_name);
        console.log("req body: " + req.body.avatar);
        console.log("req body: " + req.body.wikipedia_url);
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        user.number = req.body.number;
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.avatar = req.body.avatar
        user.wikipedia_url = req.body.wikipedia_url
        await user.save()
        res.status(200).send({ msg: "User was updated" })
    })
    
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
})
