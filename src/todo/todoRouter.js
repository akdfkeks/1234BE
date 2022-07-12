"use strict";
import { Router } from "express";
import { getToodoo, createToodoo, deleteToodoo, modifyToodoo } from "./todoController.js";

export const todoRouter = Router();

todoRouter.get("/", getToodoo);
todoRouter.post("/", createToodoo);
todoRouter.delete("/", deleteToodoo);
todoRouter.patch("/", modifyToodoo);
