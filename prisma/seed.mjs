import { dataSet } from "./data/data.mjs";
import { data } from "./data/dataCoord.mjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let dataAgency = [];
async function findAndCreate() {
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

  await prisma.city.deleteMany();

  // for (let city of data.coord) {
  await prisma.city.createMany({
    data: data,
  });
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
//   for (let city of data.coord) {
//     await prisma.city.create({
//       data: city,
//     });
//   }
// }
// main()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
