import type { Access } from "payload";

export const anyoneCanRead: Access = () => true;

export const onlyLoggedIn: Access = ({ req }) => Boolean(req.user);

export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
