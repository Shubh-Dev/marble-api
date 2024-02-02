/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

console.log("create_products_table start");
export const up = async (knex) => {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.text("description");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTable("products");
};

console.log("create_products_table end");