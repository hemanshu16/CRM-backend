import express, { Express, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import APIResponse from "../models/apiResponse";
import bodyParser from 'body-parser';
import { Content } from "../models/types/content";
import { contentRepository } from "../repository/contentRepository";

const cors = require('cors');
const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(cors());
const _contentRepository = new contentRepository();

app.get("/api/content/:id", async (req: Request, res: Response) => {
  try {
    let content = await prisma.content.findUnique({ where: { contentId: req.params.id } });
    if (content) {
      res.status(200).json(new APIResponse(content));
    } else {
      res.status(404).json(new APIResponse("Not Found"));
    }
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }
}
)

app.get("/api/content", async (req: Request, res: Response) => {
  try {
    let content = await  _contentRepository.readAll();
   
      res.status(200).json(new APIResponse(content));
   
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }
}
)

app.post("/api/content", async (req: Request, res: Response) => {
  let content;
  try {
    content = await _contentRepository.readById(req.body.contentId);
    if(content)
      {
        res.status(400).json(new APIResponse("Please Provide Unique Id, With This Id Content Exist"));
        return;
      }
  }
  catch (error: any) {
    res.status(500).json(new APIResponse(error));
    return;
  }
  
  
  try {
    await _contentRepository.create(req.body);
    res.status(201).json(new APIResponse(req.body));
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }

})

app.put("/api/content/:contentId", async (req: Request, res: Response) => {
  let content;
  try {
    content = await _contentRepository.readById(req.params.contentId);
  }
  catch (error: any) {
    res.status(500).json(new APIResponse(error));
    return;
  }

  if (content == null) {
    res.status(400).json(new APIResponse("Not Valid Content Id"));
    return;
  }

  try {
    await _contentRepository.update(req.body,req.params.contentId);
    res.status(200).json(new APIResponse(req.body));
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }


})

app.delete("/api/content/:id", async (req: Request, res: Response) => {
  try {
    const row_affected : number = await _contentRepository.remove(req.params.id);
    if(row_affected == 0)
      {
        res.status(404).json(new APIResponse("Wrong Content Id, No Content Exist With This Id"));
        return;
      }
    res.status(200).json(new APIResponse("Successfully Deleted"));
  }
  catch (error: any) {
    res.status(500).json(new APIResponse(error));
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});