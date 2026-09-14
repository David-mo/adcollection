import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ads" DROP CONSTRAINT "ads_gif_id_media_id_fk";
  
  ALTER TABLE "_ads_v" DROP CONSTRAINT "_ads_v_version_gif_id_media_id_fk";
  
  DROP INDEX "ads_gif_idx";
  DROP INDEX "_ads_v_version_version_gif_idx";
  ALTER TABLE "ads" DROP COLUMN "gif_id";
  ALTER TABLE "_ads_v" DROP COLUMN "version_gif_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ads" ADD COLUMN "gif_id" integer;
  ALTER TABLE "_ads_v" ADD COLUMN "version_gif_id" integer;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_gif_id_media_id_fk" FOREIGN KEY ("gif_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_gif_id_media_id_fk" FOREIGN KEY ("version_gif_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "ads_gif_idx" ON "ads" USING btree ("gif_id");
  CREATE INDEX "_ads_v_version_version_gif_idx" ON "_ads_v" USING btree ("version_gif_id");`)
}
