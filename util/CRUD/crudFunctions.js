import prisma from "../prisma";

export async function getUserDb(fromVerifyToken) {
  return await prisma.user.findUnique({
    where: {
      id: fromVerifyToken.id,
    },
  });
}

export async function createAgency(data) {
  const savedAgency = await prisma.agency.create({
    data: {
      companyName: data.name,
      city: data.city,
      region: data.region,
      size: data.size,
      website: data.website,
      logo: data.logo,
    },
  });
  return savedAgency;
}

export async function sendToDashboard(userDb, data, payload) {
  return await prisma.dashboard.create({
    data: {
      userName: userDb.firstName,
      emailUser: userDb.email,
      companyName: data.name,
      city: data.city,
      region: data.region,
      size: data.size,
      website: data.website,
      logo: data.logo,
      payload,
    },
  });
}

export async function updateAgency(id, data) {
  const updatedAgency = await prisma.agency.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      city: data.city,
      region: data.region,
      size: data.size,
      website: data.website,
      logo: data.logo,
    },
  });
}

export async function findUniqueAgency(id) {
  return await prisma.agency.findUnique({
    where: {
      id,
    },
  });
}
