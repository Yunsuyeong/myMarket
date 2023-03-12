import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  if (req.method === "POST") {
    const product = await client.product.create({
      data: {
        description,
        name,
        price: +price,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, product });
  }
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({ ok: true, products });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
