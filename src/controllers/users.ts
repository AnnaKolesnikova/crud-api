import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { Users } from "../models/userModel";
import * as errors from "../utils/errorRes";
import { successResponse } from "../utils/successRes";
import { getData } from "../data";

const allUsers = new Users();

export const getAllUsers = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  try {
    const users = JSON.stringify(allUsers.users);
    successResponse(res, 200, users);
  } catch (err) {
    errors.serverError(res);
  }
};

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  try {
    const userId = req.url.split("/")[3];
    const uuid = validate(userId);
    if (uuid) {
      const user = allUsers.getById(userId);
      if (user) {
        successResponse(res, 200, JSON.stringify(user));
      } else {
        errors.invalidUserId(res);
      }
    }
  } catch (err) {
    errors.serverError(res);
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const body = await getData(req);
    if (body) {
      const data = JSON.parse(body);
      const checkFields =
        "username" in data && "age" in data && "hobbies" in data;
      if (checkFields) {
        const user = JSON.stringify(allUsers.create(data));
        successResponse(res, 201, user);
      } else {
        errors.reqBodyError(res);
      }
    }
  } catch (err) {
    errors.serverError(res);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const userId = req.url.split("/")[3];
    const userExists = allUsers.getById(userId);
    if (!userExists) {
      errors.invalidUserId(res);
      return;
    }
    const body = await getData(req);
    if (body) {
      const data = JSON.parse(body);
      const checkFields =
        "username" in data && "age" in data && "hobbies" in data;

      if (checkFields) {
        const user = JSON.stringify(allUsers.update(userId, data));
        successResponse(res, 200, user);
      } else {
        errors.reqBodyError(res);
      }
    }
  } catch (err) {
    errors.serverError(res);
  }
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const userId = req.url.split("/")[3];
    const userExists = allUsers.getById(userId);
    if (!userExists) {
      errors.invalidUserId(res);
      return;
    }
    allUsers.delete(userId);
    successResponse(res, 204);
  } catch (err) {
    errors.serverError(res);
  }
};
