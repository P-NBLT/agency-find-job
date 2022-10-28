import { dataSet } from "./data/data.mjs";
import { data } from "./data/dataCoord.mjs";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

let dataAgency = [];
async function findAndCreate() {
  await prisma.city.createMany({
    data: data,
  });
  // dataAgency = dataSet.agencies.map((agency) => {
  for (let agency of dataSet.agencies) {
    const cityId = await prisma.city.findUnique({
      where: {
        city: agency.city,
      },
    });
    console.log(agency, cityId);
    dataAgency.push({
      name: agency.name,
      city: agency.city,
      region: agency.region,
      size: agency.companySize,
      website: agency.website,
      logo: agency.eguideImageSrc,
      cityId: cityId.id,
    });
    console.log(agency.name, agency.city, agency.id);
  }

  // await prisma.city.deleteMany();

  // for (let city of data.coord) {

  // }

  // for (let agency of dataAgency) {
  await prisma.agency.createMany({
    data: dataAgency,
  });
  // }
}

findAndCreate()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

// async function main() {
//   for (let city of data) {
//     await prisma.city.create({
//       data: city,
//     });
//   }
// }
// main()
// .catch((e) => {
//   console.log(e);
//   process.exit(1);
// })
// .finally(() => {
//   prisma.$disconnect();

async function createUserAdmin() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const userAdmin = await prisma.user.create({
    data: {
      email: "pierrealexis.noblet@gmail.com",
      password: password,
      firstName: "Pierre-Alexis",
      lastName: "Noblet",
      admin: true,
      verified: true,
    },
  });
}

createUserAdmin()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

// async function dashboardSimulation() {
//   const sample = await prisma.dashboard.create({
//     data: {
//       userName: "Paul",
//       emailUser: "Paul@gmail.com",
//       companyName: "BigTech",
//       city: "Rotterdam",
//       region: "Zuid-Holland",
//       size: "GT-100",
//       website: "http://www.humanoids.nl/",
//       logo: "https://eguide.nl/media/output/100_100/1_humanoids_logo.png",
//       payload: "create",
//     },
//   });
// }

// dashboardSimulation()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
// });
