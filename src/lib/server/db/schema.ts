import { pgTable, serial, integer, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const experience = pgTable('experience', {
	id: serial('id').primaryKey(),
	company: text('company').notNull(),
	link: text('link').notNull(),
	title: text('title').notNull(),
	dates: text('dates').notNull(),
	description: jsonb('description').$type<string[]>().notNull(),
	logo: text('logo').notNull(),
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const project = pgTable('project', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	link: text('link').notNull(),
	categories: jsonb('categories').$type<string[]>().notNull(),
	groupCategory: text('group_category').notNull().default('webAndFullStack'), // webAndFullStack | dataAndBackend | systemsAndLogic | mobileAndTools
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const academic = pgTable('academic', {
	id: serial('id').primaryKey(),
	year: text('year').notNull(),
	icon: text('icon').notNull().default('graduationCap'),
	content: text('content').notNull(),
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const contact = pgTable('contact', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	value: text('value').notNull(),
	link: text('link').notNull(),
	icon: text('icon').notNull().default('mail'),
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export * from './auth.schema';
