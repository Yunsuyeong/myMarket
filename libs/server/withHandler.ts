import { NextApiHandler } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

interface ICongig {
  method: "GET" | "POST" | "DELETE";
  handler: NextApiHandler;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ICongig): NextApiHandler {
  return async (req, res) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please Log in" });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
