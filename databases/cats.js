var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catApp");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String
});

var Cat = mongoose.model("Cat", catSchema);

// //add cat to database
// var george = new Cat({
//     name : "George",
//     age: "3",
//     color: "Yellow"
// });

// var george = new Cat({
//     name : "George",
//     age: "3",
//     color: "Yellow"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("An error occurred");
//     } else {
//         console.log("Just saved ");
//         console.log(cat);
//     }
// });
//create and save in one action
Cat.create({
    name: "Charles",
    age: 43,
    color: "Brown"
}, function(err, cat){
        if(err){
            console.log("An error occurred");
        } else {
            console.log("Just saved ");
            console.log(cat);
        }
    });
//retrieve all cats from DB and console.log each one

Cat.find({}, function(err, cats){
    if (err){
    console.log("Error");
    console.log(err);
    } else {
        console.log("Every Cat");
        console.log(cats);
    }
});