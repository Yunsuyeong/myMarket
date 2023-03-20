import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { imageId, name, price, description },
    session: { user },
  } = req;
  if (req.method === "POST") {
    const item = await client.product.create({
      data: {
        description,
        name,
        price: +price,
        image: imageId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, item });
  }
  if (req.method === "GET") {
    const items = await client.product.findMany({
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
    res.json({ ok: true, items });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
