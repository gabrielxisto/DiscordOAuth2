const express = require("express");
const FormData = require("form-data"); 
const fetch = require("node-fetch");
const config = require("../../config.json")

const loginCallback = async (request, response) => {
    const accessCode = request.query.code;

    if (!accessCode) return response.redirect("/");


    const data = new FormData();
    data.append("client_id", config.discord.client_id);
    data.append("client_secret", config.discord.client_secret);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", config.discord.redirect_uri);
    data.append("scope", "identify");
    data.append("code", accessCode);

    const json = await (await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: data
    })).json(); 

    const userJson = await (await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${json.token_type} ${json.access_token}`,
        },  
    })).json(); 

    request.session.user_info = userJson; 
    request.session.user_name = userJson.username; 
    request.session.user_tag = userJson.discriminator; 
    request.session.user_avatar = "https://cdn.discordapp.com/avatars/" + userJson.id + "/" + userJson.avatar + ".png"; 
    request.session.bearer_token = json.access_token; 
    
    response.redirect("/"); 
}; 

module.exports = loginCallback