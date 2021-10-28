import { APIGatewayProxyHandler } from "aws-lambda";

import { api } from "../../utils/API";

interface ICWCallback {
  Entity: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { Entity } = JSON.parse(event.body) as ICWCallback;

  if (!Entity) {
  }

  const { automaticEmailCc, id } = JSON.parse(Entity);

  if (!automaticEmailCc || !id) {
    throw new Error("API Failed");
  }

  const before = automaticEmailCc;
  const after = before
    .replace("accounts@bepoz.com.au;", "")
    .replace("support@bepoz.com.au;", "")
    .replace("support@vectron.com.au;", "")
    .replace("support@bepoz.co.nz;", "")
    .replace("workshop@vectron.com.au;", "");

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
    statusCode: 201,
    body: JSON.stringify({
      message: "No Changes made",
      before,
      after,
    }),
    headers: {
      "content-type": "application/json",
    },
  };
};
