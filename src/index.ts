import express, { Express, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import APIResponse from "../models/apiResponse";
import bodyParser from 'body-parser';
import { Content } from "../models/types/content";

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(bodyParser.json());

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

app.post("/api/content", async (req: Request, res: Response) => {
  try {
    await prisma.content.create({ data: req.body });
    res.status(201).json(new APIResponse(req.body));
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }

})

app.put("/api/content", async (req: Request, res: Response) => {
  let content;
  try {
    content = await prisma.content.findUnique({ where: { contentId: req.body.contentId } });
  }
  catch (error: any) {
    res.status(500).json(new APIResponse(error));
  }

  if (content == null) {
    res.sendStatus(400).json(new APIResponse("Not Valid Content Id"));
  }

  try {
    let savedContent: Content = await prisma.content.update({
      where: {
        contentId: req.body.contentId
      },
      data: {
        content: req.body.content
      }
    });
    res.status(200).json(new APIResponse(savedContent));
  }
  catch (error) {
    res.status(500).json(new APIResponse(error));
  }


})

app.delete("/api/content/:id", async (req: Request, res: Response) => {
  try {
    await prisma.content.delete({ where: { contentId: req.params.id } });
    res.status(200).json(new APIResponse("Successfully Deleted"));
  }
  catch (error: any) {
    res.status(500).json(new APIResponse(error));
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});