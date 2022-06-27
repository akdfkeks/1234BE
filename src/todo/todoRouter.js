"use strict";
import { Router } from "express";
import { getToodoo, createToodoo, modifyToodoo } from "./todoController.js";

export const todoRouter = Router();

todoRouter.get("/todo", getToodoo);
todoRouter.post("/todo", createToodoo);
todoRouter.patch("/todo", modifyToodoo);
