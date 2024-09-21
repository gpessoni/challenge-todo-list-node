import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentService {
  async createComment(data: { content: string; taskId: string }) {
    return prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
      },
    });
  }

  async getCommentsByTask(taskId: string) {
    return prisma.comment.findMany({
      where: { taskId },
    });
  }

  async getCommentById(id: string) {
    return prisma.comment.findUnique({
      where: { id },
    });
  }

  async updateComment(id: string, data: { content?: string }) {
    return prisma.comment.update({
      where: { id },
      data,
    });
  }

  async deleteComment(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}

export default new CommentService();
