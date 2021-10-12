import Role from "./models/role.model";
import { ROLE_LIST } from "./utils/constant";
// create roles collection to mongodb
export const createRolesInDB = () => {
  Role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      ROLE_LIST.forEach((role) => {
        new Role({
          name: role,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log(`added ${role} to roles collection`);
        });
      });
    }
  });
};
