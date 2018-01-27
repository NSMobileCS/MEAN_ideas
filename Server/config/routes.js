const controller  = require("../controllers/controller");

module.exports = function (app) {

    app.post("/login", controller.login);
    app.get("/logout", controller.logout);
    app.get("/login", controller.getUser);

    app.get("/ideas", controller.ideas);
    app.post("/ideas", controller.newIdea);
    app.get("/ideas/:id", controller.oneIdea);
    app.get("/ideas/like/:id", controller.like);

    app.get("/users", controller.users);

    // app.post("/items/new", controller.addNewItem);
    // app.get("/items/:id", controller.singleItem);
    // app.post("/items/destroy/:id", controller.deleteItem);
    // app.get("/vote/:id", controller.upVote);
    // app.post("/items/:id", controller.addNewAnswer);
}
