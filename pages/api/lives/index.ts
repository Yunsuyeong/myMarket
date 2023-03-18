import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "GET") {
    const lives = await client.live.findMany({
      take: 5,
      skip: 0,
    });
    res.json({ ok: true, lives });
  }
  if (req.method === "POST") {
    const live = await client.live.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, live });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
