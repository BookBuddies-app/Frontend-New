import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  avatar: text("avatar"),
  role: text("role").notNull().default("user"), // user, cafe_owner, admin
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const cafes = pgTable("cafes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  district: integer("district").notNull(), // 1-22 for Tehran districts
  address: text("address").notNull(),
  phone: text("phone"),
  description: text("description"),
  imageUrl: text("image_url"),
  ownerId: varchar("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const clubs = pgTable("clubs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  cafeId: varchar("cafe_id").notNull().references(() => cafes.id),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookTitle: text("book_title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // رمان کلاسیک, شعر معاصر, etc.
  date: timestamp("date").notNull(),
  time: text("time").notNull(), // Persian time format
  capacity: integer("capacity").notNull(),
  imageUrl: text("image_url"),
  clubId: varchar("club_id").notNull().references(() => clubs.id),
  cafeId: varchar("cafe_id").notNull().references(() => cafes.id),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  userId: varchar("user_id").references(() => users.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const clubMembers = pgTable("club_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clubId: varchar("club_id").notNull().references(() => clubs.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").default(sql`now()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  fullName: z.string().min(1, "نام و نام خانوادگی الزامی است"),
});

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

export const insertCafeSchema = createInsertSchema(cafes).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "نام کافه الزامی است"),
  district: z.number().min(1).max(22, "منطقه باید بین ۱ تا ۲۲ باشد"),
  address: z.string().min(1, "آدرس الزامی است"),
});

export const insertClubSchema = createInsertSchema(clubs).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "نام باشگاه الزامی است"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
}).extend({
  bookTitle: z.string().min(1, "نام کتاب الزامی است"),
  author: z.string().min(1, "نام نویسنده الزامی است"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  capacity: z.number().min(1, "ظرفیت باید حداقل ۱ نفر باشد"),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
}).extend({
  fullName: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().min(11, "شماره موبایل معتبر وارد کنید"),
});

// Search schemas
export const bookSearchSchema = z.object({
  query: z.string().min(1, "جستجو نمی‌تواند خالی باشد"),
  category: z.string().optional(),
});

export const locationSearchSchema = z.object({
  district: z.number().min(1).max(22).optional(),
  date: z.string().optional(),
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;

export type InsertCafe = z.infer<typeof insertCafeSchema>;
export type Cafe = typeof cafes.$inferSelect;

export type InsertClub = z.infer<typeof insertClubSchema>;
export type Club = typeof clubs.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export type ClubMember = typeof clubMembers.$inferSelect;

export type BookSearch = z.infer<typeof bookSearchSchema>;
export type LocationSearch = z.infer<typeof locationSearchSchema>;
