import request from "supertest";
import app from "./../server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Task Routes", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.task.deleteMany({});
  });

  describe("POST /tasks", () => {
    it("deve criar uma nova tarefa", async () => {
      const newTask = {
        title: "Nova Tarefa",
        description: "Descrição da tarefa",
      };

      const response = await request(app).post("/tasks").send(newTask);

      expect(response.status).toBe(201);
      expect(response.body.title).toEqual(newTask.title);
      expect(response.body.description).toEqual(newTask.description);
    });
  });

  describe("GET /tasks", () => {
    it("deve retornar todas as tarefas", async () => {
      await prisma.task.createMany({
        data: [
          { title: "Tarefa 1", description: "Descrição 1" },
          { title: "Tarefa 2", description: "Descrição 2" },
        ],
      });

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it("deve retornar tarefas paginadas", async () => {
      await prisma.task.createMany({
        data: [
          { title: "Tarefa 1", description: "Descrição 1" },
          { title: "Tarefa 2", description: "Descrição 2" },
          { title: "Tarefa 3", description: "Descrição 3" },
        ],
      });

      const response = await request(app).get("/tasks?page=1&limit=2");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it("deve retornar tarefas filtradas por status", async () => {
      await prisma.task.createMany({
        data: [
          { title: "Tarefa 1", description: "Descrição 1", status: "pending" },
          {
            title: "Tarefa 2",
            description: "Descrição 2",
            status: "completed",
          },
        ],
      });

      const response = await request(app).get("/tasks?status=pending");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].status).toBe("pending");
    });
  });

  describe("GET /tasks/:id", () => {
    it("deve retornar uma tarefa existente", async () => {
      const createdTask = await prisma.task.create({
        data: { title: "Tarefa 1", description: "Descrição 1" },
      });

      const response = await request(app).get(`/tasks/${createdTask.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(createdTask.id);
      expect(response.body.title).toEqual(createdTask.title);
    });

    it("deve retornar erro se a tarefa não for encontrada", async () => {
      const response = await request(app).get("/tasks/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tarefa não encontrada.");
    });
  });

  describe("PUT /tasks/:id", () => {
    it("deve atualizar uma tarefa existente", async () => {
      const createdTask = await prisma.task.create({
        data: { title: "Tarefa 1", description: "Descrição 1" },
      });
      const updatedTask = {
        title: "Tarefa Atualizada",
        description: "Nova descrição",
      };

      const response = await request(app)
        .put(`/tasks/${createdTask.id}`)
        .send(updatedTask);

      expect(response.status).toBe(200);
      expect(response.body.title).toEqual(updatedTask.title);
    });

    it("deve retornar erro se a tarefa não for encontrada ao atualizar", async () => {
      const updatedTask = {
        title: "Tarefa Não Encontrada",
        description: "Descrição",
      };

      const response = await request(app).put("/tasks/999").send(updatedTask);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tarefa não encontrada.");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("deve deletar uma tarefa com sucesso", async () => {
      const createdTask = await prisma.task.create({
        data: { title: "Tarefa 1", description: "Descrição 1" },
      });

      const response = await request(app).delete(`/tasks/${createdTask.id}`);

      expect(response.status).toBe(204);
    });

    it("deve retornar erro se a tarefa não for encontrada para deletar", async () => {
      const response = await request(app).delete("/tasks/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tarefa não encontrada.");
    });
  });
});
