import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1754173385249 implements MigrationInterface {
  name = 'Initial1754173385249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_address" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "street" text NOT NULL, "number" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "postal_code" text NOT NULL, "complement" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_address"`);
  }
}
