import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const resp = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/
  accounts/${process.env.CF_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        },
      }
    )
  ).json();
  res.json({ ok: true, ...resp.result });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
