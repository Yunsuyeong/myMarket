import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: 5,
        skip: 0,
      },
      _count: {
        select: {
          answers: true,
          wonders: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wonder.findFirst({
      where: {
        postId: +id!.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, post, isWondering });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
