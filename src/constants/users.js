export const USER_ROLES = {
  user: "user",
  manager: "manager",
};

export const userRoleLabels = {
  [USER_ROLES.user]: "User",
  [USER_ROLES.manager]: "Manager",
};

export const userRoleChoices = Object.entries(userRoleLabels).map(
  ([id, name]) => ({
    id,
    name,
  })
);
