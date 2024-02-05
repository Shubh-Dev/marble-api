/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("candidates", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone_no").nullable();
    table.integer("years_of_experience").nullable();
    table.json("skills").nullable();
    table.integer("current_salary").nullable();
    table.text("github_link").nullable();
    table.text("linkedin_link").nullable();
    table.binary("resume").nullable();
    table.text("notes").nullable();
    table.timestamps(true, true);

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTable("candidates");
};
