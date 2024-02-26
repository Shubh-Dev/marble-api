/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.alterTable("candidates", (table) => {
    table.dropColumn("skills");
  });

  await knex.schema.alterTable("candidates", (table) => {
    table.string("skills").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.alterTable("candidates", (table) => {
    table.dropColumn("skills");
  });

  await knex.schema.alterTable("candidates", (table) => {
    table.json("skills").nullable();
  });
};
