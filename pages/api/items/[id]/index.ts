import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const item = await client.product.findUnique({
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
    },
  });
  const terms = item?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedItem = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: item?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        productId: item?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, item, isLiked, relatedItem });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
