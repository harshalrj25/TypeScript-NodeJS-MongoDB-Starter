import Role from "./models/role.model";
import { ROLE_LIST } from "./utils/constant";
import logger from "./utils/logger";
// create roles collection to mongodb
export const createRolesInDB = () => {
  Role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      ROLE_LIST.forEach((role) => {
        new Role({
          name: role,
        }).save((err) => {
          if (err) {
            logger.error("error", err);
          }
          logger.debug(`added ${role} to roles collection`);
        });
      });
    }
  });
};
