// prisma/seed.cjs
const { PrismaClient, Role, TipoItem } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);

  const tenant = await prisma.tenant.upsert({
    where: { id: "seed-tenant" },
    update: {},
    create: { id: "seed-tenant", nome: "Tenant Demo" },
  });

  await prisma.usuario.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      tenantId: tenant.id,
      nome: "Admin Demo",
      email: "admin@demo.com",
      senhaHash,
      role: Role.ADMIN,
    },
  });

  const notebook = await prisma.item.create({
    data: {
      tenantId: tenant.id,
      nome: "Notebook A",
      codigo: "NB-A-001",
      tipo: TipoItem.PATRIMONIO,
    },
  });

  const barco = await prisma.item.create({
    data: {
      tenantId: tenant.id,
      nome: "Barco Apoio 18ft",
      codigo: "BK-APO-018",
      tipo: TipoItem.ALUGAVEL,
    },
  });

  await prisma.custodia.create({
    data: {
      tenantId: tenant.id,
      itemId: notebook.id,
      funcionario: "Funcionário A",
      setor: "TI",
      observacao: "Uso home office",
    },
  });

  const hoje = new Date();
  const daqui15 = new Date(hoje.getTime() + 15 * 24 * 60 * 60 * 1000);

  await prisma.locacao.create({
    data: {
      tenantId: tenant.id,
      itemId: barco.id,
      destino: "Delta Offshore - Plataforma X",
      responsavel: "Eng. João",
      fimPrevisto: daqui15,
      observacao: "Suporte a inspeção",
    },
  });

  console.log("Seed ok — admin@demo.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
