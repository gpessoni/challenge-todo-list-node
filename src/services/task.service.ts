import { PrismaClient, Status, Priority } from "@prisma/client";

const prisma = new PrismaClient();

class TaskService {
  async createTask(data: {
    title: string;
    description: string;
    status?: Status;
    priority?: Priority;
    tags?: string[];
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status ?? Status.pending,
        priority: data.priority ?? Priority.medium,
        tags: {
          connect: data.tags?.map((tagId) => ({ id: tagId })),
        },
      },
      include: { tags: true },
    });
  }

  async getTasks(status?: string, page?: number, limit?: number) {
    const filters: { status?: Status } = {};

    if (
      status &&
      (status === "pending" || status === "doing" || status === "completed")
    ) {
      filters.status = status as Status; 
    }

    if (!page || !limit) {
      return prisma.task.findMany({
        where: filters,
        include: { tags: true, Comment: true },
      });
    }

    const tasks = await prisma.task.findMany({
      where: filters,
      include: { tags: true, Comment: true },
      take: limit, 
      skip: (page - 1) * limit, 
    });

    return tasks;
  }

  async getTaskById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: { tags: true, Comment: true },
    });
  }

  async updateTask(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: Status;
      priority?: Priority;
      tags?: string[];
    }
  ) {
    return prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        tags: data.tags
          ? { set: data.tags.map((tagId) => ({ id: tagId })) }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async deleteTask(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export default new TaskService();
