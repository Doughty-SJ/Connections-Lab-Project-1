console.log("Hello");
let express = require("express");

let app = express();

app.use("/",express.static('public'));

``
app.get("/about", (req, res)=> {
    res.send("this is an about page");
})

app.get('/data', (req, res)=> {
    let data = {
        dwarf:"happy"
    };
    res.json(data);
    
})
app.listen(3000, ()=>{
    console.log('listening at port 3000');
})
console.log(app);