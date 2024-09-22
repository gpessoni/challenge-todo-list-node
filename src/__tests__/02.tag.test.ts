import request from "supertest";
import app from "../server"; // Seu servidor Express
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Tag Routes", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.tag.deleteMany({});
  });

  describe("POST /tags", () => {
    it("deve criar uma nova tag", async () => {
      const newTag = { description: "New Tag", color: "#FFFFFF" };

      const response = await request(app).post("/tags").send(newTag);

      expect(response.status).toBe(201);
      expect(response.body.description).toEqual(newTag.description);
      expect(response.body.color).toEqual(newTag.color);
    });

    it("deve retornar erro ao criar tag com descrição já existente", async () => {
      const existingTag = { description: "Existing Tag", color: "#000000" };
      await prisma.tag.create({ data: existingTag });

      const response = await request(app).post("/tags").send(existingTag);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Erro ao criar a tag.");
    });
  });

  describe("GET /tags", () => {
    it("deve retornar todas as tags", async () => {
      const tagsToCreate = [
        { description: "Tag1", color: "#FFFFFF" },
        { description: "Tag2", color: "#000000" },
      ];
      await prisma.tag.createMany({ data: tagsToCreate });

      const response = await request(app).get("/tags");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ description: "Tag1", color: "#FFFFFF" }),
          expect.objectContaining({ description: "Tag2", color: "#000000" }),
        ])
      );
    });
  });

  describe("GET /tags/:id", () => {
    it("deve retornar uma tag existente", async () => {
      const createdTag = await prisma.tag.create({
        data: { description: "Tag1", color: "#FFFFFF" },
      });

      const response = await request(app).get(`/tags/${createdTag.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(createdTag.id);
      expect(response.body.description).toEqual(createdTag.description);
    });

    it("deve retornar erro se a tag não for encontrada", async () => {
      const response = await request(app).get("/tags/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tag não encontrada.");
    });
  });

  describe("PUT /tags/:id", () => {
    it("deve atualizar uma tag existente", async () => {
      const createdTag = await prisma.tag.create({
        data: { description: "Tag1", color: "#FFFFFF" },
      });
      const updatedTag = { description: "Updated Tag", color: "#FF5733" };

      const response = await request(app)
        .put(`/tags/${createdTag.id}`)
        .send(updatedTag);

      expect(response.status).toBe(200);
      expect(response.body.description).toEqual(updatedTag.description);
      expect(response.body.color).toEqual(updatedTag.color);
    });

    it("deve retornar erro se a tag não for encontrada ao atualizar", async () => {
      const updatedTag = { description: "Non-existent Tag", color: "#000000" };

      const response = await request(app).put("/tags/999").send(updatedTag);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tag não encontrada.");
    });
  });

  describe("DELETE /tags/:id", () => {
    it("deve deletar uma tag com sucesso", async () => {
      const createdTag = await prisma.tag.create({
        data: { description: "Tag1", color: "#FFFFFF" },
      });

      const response = await request(app).delete(`/tags/${createdTag.id}`);

      expect(response.status).toBe(204);
    });

    it("deve retornar erro se a tag não for encontrada para deletar", async () => {
      const response = await request(app).delete("/tags/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Tag não encontrada.");
    });
  });
});
