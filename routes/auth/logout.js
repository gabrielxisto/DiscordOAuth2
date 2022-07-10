const express = require("express")

const logout = (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/");
    } else {
        request.session.destroy();
        response.redirect("/");
    }; 
};

module.exports = logout