import express from "express";
import bodyParser from "body-parser";

export const initHttpMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
}