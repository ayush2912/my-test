import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { ObjectId } from "bson";
import moment from "moment"
import { inspect } from "util"; 
import { isEmpty, omitBy, omit, find, get, mapValues, trim, compact, flatten } from "lodash/fp";

const prisma = new PrismaClient();
const compactObject = omitBy(isEmpty);

async function main() {
    const bidsCsv = parse(await fs.readFile("./csv/bids.csv"), {
        columns: true
    })

    const bids = bidsCsv.map( (p: any) => ({
        projectId: p["ProjectId"],
        period: parseInt(p["Vintage"], 10),
        volume: parseInt(p["Volume"], 10),
        price: parseFloat(p["Price"]),
        id: new ObjectId().toString(), 
        deliveryDate: moment(p["DeliveryDate"], "DD/MM/YY").format(),
        expiryDate: moment(p["ExpiryDate"], "DD/MM/YY").format(),
        status: p["Stage"].toUpperCase()
    }))
    console.log(inspect(bids, { depth: null, colors: true }))


    return Promise.all([
        prisma.bid.createMany({ data: bids })
    ]).then((results) => console.log(results));

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


