import prisma from "../../../util/prisma";
import { formatCity, getGeoCity } from "../../../util/functionHelper";

export default async function handleDashboard(req, res) {
  const { method, body } = req;
  const data = body;

  if (method === "GET") {
    try {
      const waitingList = await prisma.dashboard.findMany();
      console.log("waitingList", waitingList);
      if (waitingList.length === 0) return res.status(200).json([]);
      for (let item of waitingList) {
        item.verified = JSON.stringify(item.verified);
        item.createdAt = JSON.stringify(item.createdAt);
        item.updatedAt = JSON.stringify(item.updatedAt);
      }
      console.log("waitingList2", waitingList);
      res.status(200).json(waitingList);
    } catch (e) {
      console.log(e);
    }
  }

  if (method === "POST") {
    try {
      const verifiedData = await verifyData(data);
      delete verifiedData.id;
      console.log("verified data", verifiedData);
      const newAgencies = await prisma.agency.createMany({
        data: verifiedData,
      });
      for (let agency of data) {
        const deletewaitingAgencies = await prisma.dashboard.deleteMany({
          where: {
            id: agency.id,
          },
        });
      }
      res.status(201).json({ success: true });
    } catch (e) {
      console.log(e);
    }
  }

  if (method === "DELETE") {
    try {
      for (let agency of data) {
        const deletewaitingAgencies = await prisma.dashboard.deleteMany({
          where: {
            id: agency.id,
          },
        });
      }
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
    }
  }
}

// function that check if city exist or not in city db. if not create a city else return the city obj
async function verifyData(data) {
  //format city string e.g amsteRdam => Amsterdam
  for (let item of data) {
    const city = formatCity(item.city);

    //check if city is in our model city
    const isCity = await prisma.city.findUnique({
      where: {
        city,
      },
    });
    console.log("isCity", isCity);
    //if it doesn't
    if (isCity === null) {
      const { lat, lon } = getGeoCity(city);

      newCity = await prisma.city.create({
        data: {
          city,
          latitude: lat,
          longitude: lon,
          count: 1,
          agencies: [data.name],
        },
      });
      item.cityId = newCity.id;
      //   return item;
    } else item.cityId = isCity.id;

    //if it does already have a city add the id of the city in data
    // return item;
  }
  return data;
}
