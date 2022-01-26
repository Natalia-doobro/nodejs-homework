const MIN_AGE = 14;
const MAX_AGE = 80;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

const MESSAGE = {
  ERROR: "Not found",
  DELETED: "contact deleted",
  CONFLICT_EMAIL: "Email in use",
  LOGIN_UNAUTHORIZED: "Email or password is wrong",
  AUTHORIZATION: "Not authorized",
}

const SUBSCRIPTIO = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
}

const CLOUD_FOLDER_AVATARS = 'Avatars';

module.exports = {
  MIN_AGE,
  MAX_AGE,
  HttpCode,
  MESSAGE,
  SUBSCRIPTIO,
  CLOUD_FOLDER_AVATARS
}