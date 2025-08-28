const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "JobPost",
  tableName: "job_posts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: { type: "varchar" },
    content: { type: "varchar" },
    author: { type: "varchar" },
  },
  relations: {
    applications: {
      target: "Apply",
      type: "one-to-many",
      inverseSide: "jobPost", 
    },
    authentication:{
      target: "Auth",       
      type: "many-to-one",
      joinColumn: { name: "authorId" },
      onDelete: "CASCADE",
      eager: true,  
    }
  },
});
