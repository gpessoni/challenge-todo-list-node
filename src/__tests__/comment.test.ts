import request from "supertest";
import app from "../server"; // Seu servidor Express
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Comment Routes", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.comment.deleteMany({});
    await prisma.task.deleteMany({});
  });

  describe("POST /comment", () => {
    it("deve criar um novo comentário", async () => {
      const task = await prisma.task.create({
        data: { title: "Test Task", description: "Task description" },
      });

      const newComment = { content: "Novo comentário", taskId: task.id };

      const response = await request(app).post("/comment").send(newComment);

      expect(response.status).toBe(201);
      expect(response.body.content).toEqual(newComment.content);
      expect(response.body.taskId).toEqual(newComment.taskId);
    });

    it("deve retornar erro se o ID da tarefa não for válido", async () => {
      const newComment = {
        content: "Comentário sem tarefa",
        taskId: "invalid-task-id",
      };

      const response = await request(app).post("/comment").send(newComment);

      expect(response.status).toBe(400);
    });
  });

  describe("GET /comment/task/:taskId", () => {
    it("deve retornar todos os comentários de uma tarefa", async () => {
      const task = await prisma.task.create({
        data: { title: "Test Task", description: "Task description" },
      });

      const commentsToCreate = [
        { content: "Comentário 1", taskId: task.id },
        { content: "Comentário 2", taskId: task.id },
      ];
      await prisma.comment.createMany({ data: commentsToCreate });

      const response = await request(app).get(`/comment/task/${task.id}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ content: "Comentário 1" }),
          expect.objectContaining({ content: "Comentário 2" }),
        ])
      );
    });

    it("deve retornar erro se a tarefa não for encontrada", async () => {
      const response = await request(app).get("/comment/task/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tarefa não encontrada.");
    });
  });

  describe("GET /comment/:id", () => {
    it("deve retornar um comentário existente", async () => {
      const task = await prisma.task.create({
        data: { title: "Test Task", description: "Task description" },
      });

      const createdComment = await prisma.comment.create({
        data: { content: "Comentário Teste", taskId: task.id },
      });

      const response = await request(app).get(`/comment/${createdComment.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(createdComment.id);
      expect(response.body.content).toEqual(createdComment.content);
    });

    it("deve retornar erro se o comentário não for encontrado", async () => {
      const response = await request(app).get("/comment/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Comentários Não encontrados");
    });
  });

  describe("PUT /comment/:id", () => {
    it("deve atualizar um comentário existente", async () => {
      const task = await prisma.task.create({
        data: { title: "Test Task", description: "Task description" },
      });

      const createdComment = await prisma.comment.create({
        data: { content: "Comentário Teste", taskId: task.id },
      });
      const updatedComment = { content: "Comentário Atualizado" };

      const response = await request(app)
        .put(`/comment/${createdComment.id}`)
        .send(updatedComment);

      expect(response.status).toBe(200);
      expect(response.body.content).toEqual(updatedComment.content);
    });

    it("deve retornar erro se o comentário não for encontrado ao atualizar", async () => {
      const updatedComment = { content: "Comentário Inexistente" };

      const response = await request(app)
        .put("/comment/999")
        .send(updatedComment);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Comentários Não encontrados");
    });
  });

  describe("DELETE /comment/:id", () => {
    it("deve deletar um comentário com sucesso", async () => {
      const task = await prisma.task.create({
        data: { title: "Test Task", description: "Task description" },
      });

      const createdComment = await prisma.comment.create({
        data: { content: "Comentário Teste", taskId: task.id },
      });

      const response = await request(app).delete(
        `/comment/${createdComment.id}`
      );

      expect(response.status).toBe(204);
    });

    it("deve retornar erro se o comentário não for encontrado para deletar", async () => {
      const response = await request(app).delete("/comment/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Comentários Não encontrados");
    });
  });
});
