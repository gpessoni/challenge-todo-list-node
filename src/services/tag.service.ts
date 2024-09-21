import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TagService {
  private async findTagByDescription(description: string) {
    return prisma.tag.findUnique({ where: { description } });
  }

  async createTag(data: { description: string; color: string }) {
    const tagExists = await this.findTagByDescription(data.description);
    if (tagExists) {
      throw new Error("Tag com essa descrição já existe.");
    }

    return prisma.tag.create({
      data: {
        description: data.description,
        color: data.color,
      },
    });
  }

  async getTags() {
    return prisma.tag.findMany();
  }

  async getTagById(id: string) {
    return await prisma.tag.findUnique({ where: { id } });
  }

  async updateTag(id: string, data: { description?: string; color?: string }) {
    if (data.description) {
      const tagWithSameDescription = await this.findTagByDescription(
        data.description
      );
      if (tagWithSameDescription && tagWithSameDescription.id !== id) {
        throw new Error("Tag com essa descrição já existe.");
      }
    }

    return prisma.tag.update({
      where: { id },
      data,
    });
  }

  async deleteTag(id: string) {
    return prisma.tag.delete({ where: { id } });
  }
}

export default new TagService();
