const express = require("express");
const cors = require("cors");
const monk = require("monk");
const bodyParser = require('body-parser');

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/todos")

const todos = db.get("todos")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res)=>{
    res.json({
        message: "Heyyyy"
    })
})


app.get("/todos", async (req, res, next)=>{
    try{
        const items = await todos.find()
        res.json(items)

    }catch (error){
        next(error)
    }
})

app.post("/", async (req, res, next)=>{
    try{
        console.log('res', req.body);
        const inserted = await todos.insert(req.body)
        res.json(inserted)
    }catch (error){
        next(error)
    }
})

app.put("/:id", async (req, res, next)=>{
    try{
        const { id } = req.params;
        const item = await todos.findOne({
            _id: id
        })
        if(!item) return next();
        const updatedItem = await todos.update({
            _id: id
        }, {
            $set: req.body,
        })
        res.json(updatedItem)
    }catch(error){
        next(error)
    }
})
app.delete("/:id", async (req, res, next)=>{
    try{
        const { id } = req.params;
        await todos.remove({
            _id: id
        })
        res.status(200).send("Successfully removed the item!");
    }catch(error){
        next(error)
    }
})

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
      message: error.message
    });
});

app.listen(5000, ()=>{
    console.log('Listening server in port 5000');
});