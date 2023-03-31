import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    /* const {
      query: { latitude, longitude },
    } = req;
    const Nlatitude = parseFloat(latitude!.toString());
    const Nlongitude = parseFloat(longitude!.toString()); */
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonders: true,
            answers: true,
          },
        },
      },
      /* where: {
        latitude: {
          gte: Nlatitude - 0.01,
          lte: Nlatitude + 0.01,
        },
        longitude: {
          gte: Nlongitude - 0.01,
          lte: Nlongitude + 0.01,
        },
      }, */
    });
    res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
