import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TagService {
  async createTag(data: { description: string; color: string }) {
    return await prisma.tag.create({
      data: {
        description: data.description,
        color: data.color,
      },
    });
  }

  async getTagByDescription(description: string) {
    return await prisma.tag.findUnique({ where: { description } });
  }

  async getTags() {
    return await prisma.tag.findMany();
  }

  async getTagById(id: string) {
    return await prisma.tag.findUnique({ where: { id } });
  }

  async updateTag(id: string, data: { description?: string; color?: string }) {
    return await prisma.tag.update({ where: { id }, data });
  }

  async deleteTag(id: string) {
    return await prisma.tag.delete({ where: { id } });
  }
}

export default new TagService();
