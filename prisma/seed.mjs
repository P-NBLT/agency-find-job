import { dataSet } from "./data/data.mjs";
import prisma from "../util/prisma";

const dataAgency = dataSet.agencies.map((agency) => ({
  name: agency.name,
  city: agency.city,
  region: agency.region,
  size: agency.companySize,
  website: agency.website,
  logo: agency.eguideImageSrc,
}));

async function main() {
  for (let agency of dataAgency) {
    await prisma.agency.create({
      data: agency,
    });
  }
}
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
