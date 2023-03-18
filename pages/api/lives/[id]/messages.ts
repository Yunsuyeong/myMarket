import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body: { message },
    session: { user },
  } = req;
  const newMessage = await client.message.create({
    data: {
      message,
      live: {
        connect: {
          id: +id!.toString(),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, newMessage });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
