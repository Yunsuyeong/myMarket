import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body: { contact },
    session: { user },
  } = req;
  const newContact = await client.register.create({
    data: {
      contact,
      product: {
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
  res.json({ ok: true, newContact });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
