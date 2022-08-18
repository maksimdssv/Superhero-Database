const express = require("express");
const fs = require('fs');
const {promises: fsp} = require('fs');
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/client/build"));

const port = process.env.PORT || 5000;

const storage = multer.diskStorage({ // function to handle saving of files
    destination: async function (req, file, cb) {
        await fs.mkdir('./upload/' + req.body.nickname, {recursive: true}, (err) => {
            if (err) console.log(err)
        });
        cb(null, './upload/' + req.body.nickname);
    }, filename: function (req, file, cb) {
        const uniqueSuffix = file.fieldname[file.fieldname.length - 1]
        cb(null, req.body.nickname + '-' + uniqueSuffix);
    }
})

const fileFilter = async (req, file, cb) => { // function to filter incoming files
    if (!file.mimetype.includes("image/")) { // check for wrong type
        cb(null, false)
    }
    if (file.mimetype.includes("gif")) { // check if gif
        cb(null, false)
    }
    if (req.method === "POST") { // check if while changing hero nickname was already taken
        await mongoose.connect(address);
        const foundName = await Superhero.findOne({nickname: req.body.nickname});
        mongoose.connection.close();
        if (foundName) {
            cb(null, false);
        }
    }
    cb(null, true);
}

const upload = multer({storage: storage, fileFilter: fileFilter}); // files handler

const address = "mongodb://localhost:27017/superheroesDB" // our database

const superheroSchema = new mongoose.Schema({ // Superhero schema
    nickname: String,
    real_name: String,
    origin_description: String,
    superpowers: String,
    catch_phrase: String,
    images: [String]
});

const Superhero = new mongoose.model("Superhero", superheroSchema); // Superhero model

app.get("/superheroes/:amount", async (req, res) => { // handle get of all superheroes
    await mongoose.connect(address);
    const data = await Superhero.find().sort({nickname: 1}); // sort by alphabet

    const m = 5 * req.params.amount;
    const newData = data.slice(m, 5 + m); // return the required page with heroes

    // broke down algorithm to transform images to dataURL in separate functions for better readability

    async function readFile(file) { // transforming file into dataURL
        const readFile = await fsp.readFile(file, "base64");
        return `data:image/jpeg;base64, ${readFile}`;
    }

    async function makeArr(arr) { // making a new array with dataURLs instead of images
        return await Promise.all(arr.map(async (img) => Promise.resolve(readFile("./" + img))));
    }

    const heroes = await Promise.all(newData.map(async (hero) => { // reading array from db and transforming images
        return new Promise(async (resolve) => {
            resolve({
                ...hero["_doc"], images: await makeArr(hero["_doc"].images)
            })
        });
    }));

    mongoose.connection.close();
    res.send(heroes);
})

app.post("/superheroes", upload.any(), async (req, res) => { // handle adding new hero
    await mongoose.connect(address);
    const foundHero = await Superhero.findOne({nickname: req.body.nickname})
    if (foundHero) { // if nickname is already taken, abort
        res.status(500).send("Hero already exists");
        return
    }
    const newHero = new Superhero({
        nickname: req.body.nickname,
        real_name: req.body.realName,
        origin_description: req.body.origin,
        superpowers: req.body.superpowers,
        catch_phrase: req.body.catchPhrase,
        images: req.files.map((file) => file.path) // add strings with path to out files
    })
    await newHero.save()
    mongoose.connection.close();
    res.send("Hero was created successfully");
})

app.patch("/superheroes/:id", upload.any(), async (req, res) => { // handle updating hero
    await mongoose.connect(address);
    await Superhero.updateOne({_id: req.params.id}, {
        nickname: req.body.nickname,
        real_name: req.body.realName,
        origin_description: req.body.origin,
        superpowers: req.body.superpowers,
        catch_phrase: req.body.catchPhrase,
        images: req.files.map((file) => file.path) // add strings with path to out files
    })
    const leftovers = 5 - req.files.length;
    for (let i = leftovers; i < 5; i++) { // check for leftover files and delete them
        const deleteFile = "./upload/" + req.body.nickname + "/" + req.body.nickname + "-" + i;
        if (fs.existsSync(deleteFile)) {
            fs.unlink(deleteFile, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    mongoose.connection.close();
    res.send("Successfully updated");
})

app.delete("/superheroes/:id", async (req, res) => { // handle deletion
    await mongoose.connect(address);
    const {nickname} = await Superhero.findOne({_id: req.params.id}) // fetching nickname for path
    await Superhero.deleteOne({_id: req.params.id});
    mongoose.connection.close();

    const deleteFile = "./upload/" + nickname; // deleting leftover directory
    if (fs.existsSync(deleteFile)) {
        fs.rm(deleteFile, {force: true, recursive: true}, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    res.send("Successfully deleted");
})

app.get("/", (req, res) => { // home page
    res.sendFile(__dirname + "client/build/index.html");
})

app.listen(port, () => {
    console.log("Listening on port 5000");
})