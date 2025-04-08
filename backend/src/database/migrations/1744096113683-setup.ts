import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1744096113683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" character varying NOT NULL,
                "email" character varying UNIQUE NOT NULL,
                "password" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            );

            CREATE TABLE "todo" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
                "title" character varying NOT NULL,
                "description" character varying,
                "completed" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid,
                CONSTRAINT "FK_todo_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user";
            DROP TABLE "todo";
        `);
  }
}
