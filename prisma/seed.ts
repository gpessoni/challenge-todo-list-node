import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tag1 = await prisma.tag.create({
    data: { description: "Urgente", color: "#FF0000" },
  });
  const tag2 = await prisma.tag.create({
    data: { description: "Trabalho", color: "#0000FF" },
  });
  const tag3 = await prisma.tag.create({
    data: { description: "Pessoal", color: "#00FF00" },
  });

  console.log("Tags criadas:", tag1, tag2, tag3);

  const task = await prisma.task.create({
    data: {
      title: "Finalizar relatório de vendas",
      description: "Relatório deve ser enviado até sexta-feira.",
      status: "pending",
      priority: "high",
      tags: {
        connect: [
          { id: tag1.id }, 
          { id: tag2.id }, 
        ],
      },
    },
  });

  console.log("Tarefa criada:", task);

  const comment1 = await prisma.comment.create({
    data: {
      content: "Lembre-se de incluir os dados de julho.",
      taskId: task.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: "Verificar com o time de vendas sobre os números.",
      taskId: task.id,
    },
  });

  console.log("Comentários criados:", comment1, comment2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
