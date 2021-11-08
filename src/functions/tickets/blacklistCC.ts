import { APIGatewayProxyHandler } from "aws-lambda";

import { api } from "../../utils/API";

interface ICWCallback {
  Entity: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { Entity } = JSON.parse(event.body) as ICWCallback;

  if (!Entity) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "NO ENTITY",
      }),
      headers: {
        "content-type": "application/json",
      },
    };
  }

  const { automaticEmailCc, id } = JSON.parse(Entity);

  if (!automaticEmailCc || !id || automaticEmailCc === "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "NO CC's",
      }),
      headers: {
        "content-type": "application/json",
      },
    };
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

  if (before !== after) {
    try {
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
    } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "CW API HAS FAILED",
        }),
        headers: {
          "content-type": "application/json",
        },
      };
    }
  }

  return {
    statusCode: 200,
    body:
      before === after
        ? JSON.stringify({
            message: "no changes",
            before,
            after,
          })
        : JSON.stringify({
            message: "blacklisted",
            before,
            after,
          }),
    headers: {
      "content-type": "application/json",
    },
  };
};
