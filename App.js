const express = require("express");
const app = express();
const config = require("./config.json");
const router = require("./routes/routes");
const path = require("path")
 
app.use(require("express-session")({
    secret: "secret",
    cookie: {
        maxAge: 86400000,
    },
    resave: true,
    saveUninitialized: false
}));

app.use('/', router)

app.get("/", async (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/login");
    } else {
        response.json(request.session.user_info)
    }; 
}); 


app.listen(config.port, () => {
    console.log("[SERVER] - Servidor Logado com Sucesso!");
});
