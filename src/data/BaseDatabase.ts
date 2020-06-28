import knex from "knex";
import Knex from "knex";

export abstract class BaseDataBase{
  private static connection: knex | null = null;
  protected getConnection(): Knex{
    if(!BaseDataBase.connection) {
      BaseDataBase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || "3306"),
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_DATABASE_NAME
        },
      });
    }
    return BaseDataBase.connection;
  }
  public static async destroyConnection(): Promise<void> {
    if (BaseDataBase.connection) {
      await BaseDataBase.connection.destroy();
      BaseDataBase.connection = null;
    }
  }
}