import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../libs/server/withSession";
import { Post } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
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
        registers: {
          select: {
            id: true,
            contact: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
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
  if (req.method === "POST") {
    const {
      query: { id },
      body: { name, price, description },
    } = req;
    if (name) {
      await client.product.update({
        where: {
          id: +id!.toString(),
        },
        data: {
          name,
        },
      });
    }
    if (price) {
      await client.product.update({
        where: {
          id: +id!.toString(),
        },
        data: {
          price,
        },
      });
    }
    if (description) {
      await client.product.update({
        where: {
          id: +id!.toString(),
        },
        data: {
          description,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
