import { APIGatewayProxyHandler } from "aws-lambda";

import { api } from "../../utils/API";

interface ICWCallback {
  Entity: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { Entity } = JSON.parse(event.body) as ICWCallback;

  if (!Entity) {
    throw new Error("API Failed");
  }

  const { automaticEmailCc, id } = JSON.parse(Entity);

  if (!automaticEmailCc || !id || automaticEmailCc === "") {
    throw new Error("API Failed");
  }

  const before = automaticEmailCc;
  const after = before
    .replace("accounts@bepoz.com.au;", "")
    .replace("support@bepoz.com.au;", "")
    .replace("support@vectron.com.au;", "")
    .replace("support@bepoz.co.nz;", "")
    .replace("support@bepoz.co.uk;", "")
    .replace("workshop@vectron.com.au;", "")
    .replace("workshop@bepoz.com.au;", "");

  // UPDATE TICKET CC SECTION
  await api.patch(
    `/service/tickets/${id}`,
    JSON.stringify([
      {
        op: "replace",
        path: "automaticEmailCc",
        value: after,
      },
    ])
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: before === after ? "no changes" : "blacklisted",
      before,
      after,
    }),
    headers: {
      "content-type": "application/json",
    },
  };
};
