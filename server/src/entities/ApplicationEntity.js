const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Apply",
  tableName: "application",
  columns: {
    id: { primary: true, type: "int", generated: true },
    firstname: { type: "varchar" },
    lastname: { type: "varchar" },
    qualification: { type: "varchar" },
    yop: { type: "varchar" },
  },
  relations: {
    jobPost: {
      target: "JobPost",       
      type: "many-to-one",
      joinColumn: { name: "internId" },
      onDelete: "CASCADE",
      eager: true,               
    },
  },
});
