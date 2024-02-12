import { ServerResponse } from "http";

export const successResponse = (
  res: ServerResponse,
  status: number,
  data?: any
): void => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(data);
};
