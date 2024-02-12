import { ServerResponse } from "http";

export const notFound = (res: ServerResponse): void => {
  res.statusCode = 404;
  res.end();
};

export const serverError = (res: ServerResponse) => {
  res.statusCode = 500;
  res.end();
};

export const invalidUserId = (res: ServerResponse) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: false, message: "Non-existent user!" }));
};

export const reqBodyError = (res: ServerResponse): void => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: false, message: "Invalid request body!" }));
};
