import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const live = await client.live.findUnique({
    where: {
      id: +id!.toString(),
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      userId: true,
      cloudflareId: true,
      created: true,
      updated: true,
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
        take: 5,
        skip: 0,
      },
    },
  });
  const ownLive = await client.live.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
        take: 5,
        skip: 0,
      },
    },
  });
  const isOwner = live?.userId === user?.id;
  res.json({ ok: true, live: isOwner ? ownLive : live });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
