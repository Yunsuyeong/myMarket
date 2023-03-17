import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const live = await client.live.findUnique({
    where: {
      id: +id!.toString(),
    },
  });
  res.json({ ok: true, live });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
