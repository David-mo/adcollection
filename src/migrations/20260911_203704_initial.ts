import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ads_highlight_metric" AS ENUM('audience-grab', 'watchability', 'ad-clarity');
  CREATE TYPE "public"."enum_ads_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ads_v_version_highlight_metric" AS ENUM('audience-grab', 'watchability', 'ad-clarity');
  CREATE TYPE "public"."enum__ads_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "ads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"thumbnail_title" varchar,
  	"name" varchar,
  	"slug" varchar,
  	"caption" varchar,
  	"video_id" integer,
  	"thumbnail_id" integer,
  	"gif_id" integer,
  	"made_with_inbeat" boolean DEFAULT false,
  	"original_url" varchar,
  	"company_name" varchar,
  	"company_website_url" varchar,
  	"company_website_display" varchar,
  	"brand_handle_name" varchar,
  	"brand_handle_url" varchar,
  	"sound_name" varchar,
  	"sound_url" varchar,
  	"profile_picture_id" integer,
  	"creator_handle" varchar,
  	"creator_profile_url" varchar,
  	"platform_id" integer,
  	"category_id" integer,
  	"rating_audience_grab" numeric,
  	"rating_watchability" numeric,
  	"rating_clarity" numeric,
  	"overall_score" numeric,
  	"highlight" varchar,
  	"highlight_metric" "enum_ads_highlight_metric",
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_ads_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"subcategories_id" integer,
  	"content_types_id" integer
  );
  
  CREATE TABLE "_ads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_thumbnail_title" varchar,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_caption" varchar,
  	"version_video_id" integer,
  	"version_thumbnail_id" integer,
  	"version_gif_id" integer,
  	"version_made_with_inbeat" boolean DEFAULT false,
  	"version_original_url" varchar,
  	"version_company_name" varchar,
  	"version_company_website_url" varchar,
  	"version_company_website_display" varchar,
  	"version_brand_handle_name" varchar,
  	"version_brand_handle_url" varchar,
  	"version_sound_name" varchar,
  	"version_sound_url" varchar,
  	"version_profile_picture_id" integer,
  	"version_creator_handle" varchar,
  	"version_creator_profile_url" varchar,
  	"version_platform_id" integer,
  	"version_category_id" integer,
  	"version_rating_audience_grab" numeric,
  	"version_rating_watchability" numeric,
  	"version_rating_clarity" numeric,
  	"version_overall_score" numeric,
  	"version_highlight" varchar,
  	"version_highlight_metric" "enum__ads_v_version_highlight_metric",
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__ads_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_ads_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"subcategories_id" integer,
  	"content_types_id" integer
  );
  
  CREATE TABLE "platforms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subcategories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ads_id" integer,
  	"platforms_id" integer,
  	"categories_id" integer,
  	"subcategories_id" integer,
  	"content_types_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "ads" ADD CONSTRAINT "ads_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_gif_id_media_id_fk" FOREIGN KEY ("gif_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_profile_picture_id_media_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads_rels" ADD CONSTRAINT "ads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads_rels" ADD CONSTRAINT "ads_rels_subcategories_fk" FOREIGN KEY ("subcategories_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads_rels" ADD CONSTRAINT "ads_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_parent_id_ads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_gif_id_media_id_fk" FOREIGN KEY ("version_gif_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_profile_picture_id_media_id_fk" FOREIGN KEY ("version_profile_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_platform_id_platforms_id_fk" FOREIGN KEY ("version_platform_id") REFERENCES "public"."platforms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v_rels" ADD CONSTRAINT "_ads_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ads_v_rels" ADD CONSTRAINT "_ads_v_rels_subcategories_fk" FOREIGN KEY ("subcategories_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ads_v_rels" ADD CONSTRAINT "_ads_v_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ads_fk" FOREIGN KEY ("ads_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_platforms_fk" FOREIGN KEY ("platforms_id") REFERENCES "public"."platforms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subcategories_fk" FOREIGN KEY ("subcategories_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "ads_slug_idx" ON "ads" USING btree ("slug");
  CREATE INDEX "ads_video_idx" ON "ads" USING btree ("video_id");
  CREATE INDEX "ads_thumbnail_idx" ON "ads" USING btree ("thumbnail_id");
  CREATE INDEX "ads_gif_idx" ON "ads" USING btree ("gif_id");
  CREATE INDEX "ads_profile_picture_idx" ON "ads" USING btree ("profile_picture_id");
  CREATE INDEX "ads_platform_idx" ON "ads" USING btree ("platform_id");
  CREATE INDEX "ads_category_idx" ON "ads" USING btree ("category_id");
  CREATE INDEX "ads_updated_at_idx" ON "ads" USING btree ("updated_at");
  CREATE INDEX "ads_created_at_idx" ON "ads" USING btree ("created_at");
  CREATE INDEX "ads__status_idx" ON "ads" USING btree ("_status");
  CREATE INDEX "ads_rels_order_idx" ON "ads_rels" USING btree ("order");
  CREATE INDEX "ads_rels_parent_idx" ON "ads_rels" USING btree ("parent_id");
  CREATE INDEX "ads_rels_path_idx" ON "ads_rels" USING btree ("path");
  CREATE INDEX "ads_rels_subcategories_id_idx" ON "ads_rels" USING btree ("subcategories_id");
  CREATE INDEX "ads_rels_content_types_id_idx" ON "ads_rels" USING btree ("content_types_id");
  CREATE INDEX "_ads_v_parent_idx" ON "_ads_v" USING btree ("parent_id");
  CREATE INDEX "_ads_v_version_version_slug_idx" ON "_ads_v" USING btree ("version_slug");
  CREATE INDEX "_ads_v_version_version_video_idx" ON "_ads_v" USING btree ("version_video_id");
  CREATE INDEX "_ads_v_version_version_thumbnail_idx" ON "_ads_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_ads_v_version_version_gif_idx" ON "_ads_v" USING btree ("version_gif_id");
  CREATE INDEX "_ads_v_version_version_profile_picture_idx" ON "_ads_v" USING btree ("version_profile_picture_id");
  CREATE INDEX "_ads_v_version_version_platform_idx" ON "_ads_v" USING btree ("version_platform_id");
  CREATE INDEX "_ads_v_version_version_category_idx" ON "_ads_v" USING btree ("version_category_id");
  CREATE INDEX "_ads_v_version_version_updated_at_idx" ON "_ads_v" USING btree ("version_updated_at");
  CREATE INDEX "_ads_v_version_version_created_at_idx" ON "_ads_v" USING btree ("version_created_at");
  CREATE INDEX "_ads_v_version_version__status_idx" ON "_ads_v" USING btree ("version__status");
  CREATE INDEX "_ads_v_created_at_idx" ON "_ads_v" USING btree ("created_at");
  CREATE INDEX "_ads_v_updated_at_idx" ON "_ads_v" USING btree ("updated_at");
  CREATE INDEX "_ads_v_latest_idx" ON "_ads_v" USING btree ("latest");
  CREATE INDEX "_ads_v_rels_order_idx" ON "_ads_v_rels" USING btree ("order");
  CREATE INDEX "_ads_v_rels_parent_idx" ON "_ads_v_rels" USING btree ("parent_id");
  CREATE INDEX "_ads_v_rels_path_idx" ON "_ads_v_rels" USING btree ("path");
  CREATE INDEX "_ads_v_rels_subcategories_id_idx" ON "_ads_v_rels" USING btree ("subcategories_id");
  CREATE INDEX "_ads_v_rels_content_types_id_idx" ON "_ads_v_rels" USING btree ("content_types_id");
  CREATE UNIQUE INDEX "platforms_slug_idx" ON "platforms" USING btree ("slug");
  CREATE INDEX "platforms_updated_at_idx" ON "platforms" USING btree ("updated_at");
  CREATE INDEX "platforms_created_at_idx" ON "platforms" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "subcategories_slug_idx" ON "subcategories" USING btree ("slug");
  CREATE INDEX "subcategories_updated_at_idx" ON "subcategories" USING btree ("updated_at");
  CREATE INDEX "subcategories_created_at_idx" ON "subcategories" USING btree ("created_at");
  CREATE UNIQUE INDEX "content_types_slug_idx" ON "content_types" USING btree ("slug");
  CREATE INDEX "content_types_updated_at_idx" ON "content_types" USING btree ("updated_at");
  CREATE INDEX "content_types_created_at_idx" ON "content_types" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_ads_id_idx" ON "payload_locked_documents_rels" USING btree ("ads_id");
  CREATE INDEX "payload_locked_documents_rels_platforms_id_idx" ON "payload_locked_documents_rels" USING btree ("platforms_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_subcategories_id_idx" ON "payload_locked_documents_rels" USING btree ("subcategories_id");
  CREATE INDEX "payload_locked_documents_rels_content_types_id_idx" ON "payload_locked_documents_rels" USING btree ("content_types_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ads" CASCADE;
  DROP TABLE "ads_rels" CASCADE;
  DROP TABLE "_ads_v" CASCADE;
  DROP TABLE "_ads_v_rels" CASCADE;
  DROP TABLE "platforms" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "subcategories" CASCADE;
  DROP TABLE "content_types" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_ads_highlight_metric";
  DROP TYPE "public"."enum_ads_status";
  DROP TYPE "public"."enum__ads_v_version_highlight_metric";
  DROP TYPE "public"."enum__ads_v_version_status";`)
}
