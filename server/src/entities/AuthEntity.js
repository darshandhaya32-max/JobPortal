const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Auth",
  tableName: "authentication",
  columns: {
    id: { primary: true, type: "int", generated: true },
    username: { type: "varchar" },
    email: { type: "varchar" },
    password: { type: "varchar" },
    user: { type: "varchar" },
  },
  relations:{
    jobPost:{
       target: "JobPost",
      type: "one-to-many",
      inverseSide: "authentication",
    },
  },
});

