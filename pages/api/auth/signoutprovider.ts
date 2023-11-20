import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { NextApiResponse } from "next";

export default async function signOutProvider(
  req: NextRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (session?.idToken) {
      // console.log("signOutProvider", session)
      try {
        await axios.get(
          `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
          { params: { id_token_hint: session.idToken } }
        );
        res.status(200).json(null);
      } catch (error) {
        res.status(500).json(null);
      }
    } else {
      // if user is not signed in, give 200
      res.status(200).json(null);
    }
  }
}
