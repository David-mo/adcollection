import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sales_collections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"sharing_enabled" boolean DEFAULT false,
  	"share_url" varchar,
  	"share_token" varchar NOT NULL,
  	"private_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sales_collections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ads_id" integer
  );
  
  ALTER TABLE "ads" ALTER COLUMN "made_with_inbeat" SET DEFAULT true;
  ALTER TABLE "_ads_v" ALTER COLUMN "version_made_with_inbeat" SET DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sales_collections_id" integer;
  ALTER TABLE "sales_collections_rels" ADD CONSTRAINT "sales_collections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sales_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sales_collections_rels" ADD CONSTRAINT "sales_collections_rels_ads_fk" FOREIGN KEY ("ads_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sales_collections_share_url_idx" ON "sales_collections" USING btree ("share_url");
  CREATE UNIQUE INDEX "sales_collections_share_token_idx" ON "sales_collections" USING btree ("share_token");
  CREATE INDEX "sales_collections_updated_at_idx" ON "sales_collections" USING btree ("updated_at");
  CREATE INDEX "sales_collections_created_at_idx" ON "sales_collections" USING btree ("created_at");
  CREATE INDEX "sales_collections_rels_order_idx" ON "sales_collections_rels" USING btree ("order");
  CREATE INDEX "sales_collections_rels_parent_idx" ON "sales_collections_rels" USING btree ("parent_id");
  CREATE INDEX "sales_collections_rels_path_idx" ON "sales_collections_rels" USING btree ("path");
  CREATE INDEX "sales_collections_rels_ads_id_idx" ON "sales_collections_rels" USING btree ("ads_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sales_collections_fk" FOREIGN KEY ("sales_collections_id") REFERENCES "public"."sales_collections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sales_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("sales_collections_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sales_collections_fk";
  DROP INDEX "payload_locked_documents_rels_sales_collections_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sales_collections_id";
  ALTER TABLE "sales_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sales_collections_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sales_collections_rels" CASCADE;
  DROP TABLE "sales_collections" CASCADE;
  ALTER TABLE "ads" ALTER COLUMN "made_with_inbeat" SET DEFAULT false;
  ALTER TABLE "_ads_v" ALTER COLUMN "version_made_with_inbeat" SET DEFAULT false;`)
}
