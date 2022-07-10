const express = require("express");
const config = require("../../config.json")

const login = (request, response) => {
    response.redirect(`https://discord.com/api/oauth2/authorize` + 
        `?client_id=${config.discord.client_id}` +
        `&redirect_uri=${encodeURIComponent(config.discord.redirect_uri)}` +
        `&response_type=code&scope=${encodeURIComponent(config.discord.scopes.join(" "))}`);
};

module.exports = login