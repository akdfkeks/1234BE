"use strict";
import { Router } from "express";
import { getToodoo, createToodoo, modifyToodoo } from "./todoController.js";

export const todoRouter = Router();

todoRouter.get("/", getToodoo);
todoRouter.post("/", createToodoo);
todoRouter.patch("/", modifyToodoo);
