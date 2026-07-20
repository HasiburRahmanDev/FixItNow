
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  

// config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT,
  app_url: process.env.APP_URL,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  stripe_product_id: process.env.STRIPE_PRODUCT_ID,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
};

// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// src/modules/users/users.route.ts
import { Router } from "express";

// src/modules/users/users.controller.ts
import httpStatus from "http-status";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Booking {\n  id        String        @id @default(uuid())\n  name      String\n  bookingAt DateTime?\n  address   String\n  status    BookingStatus @default(PENDING)\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  serviceId String\n  service   Service @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  payment   Payment?\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  description String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  //   services    Service[]\n}\n\nenum ActiveStatus {\n  BAN\n  UNBAN\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  ADMIN\n}\n\nenum BookingStatus {\n  PENDING\n  ACCEPTED\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id        String  @id @default(uuid())\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  stripeSessionId String\n  amount          Int\n  provider        String\n  status          String\n  paidAt          DateTime?\n  createdAt       DateTime  @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  price       Float?\n  location    String?\n  rating      Int?\n  //   categoryId  String\n  //   category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  createdAt           DateTime          @default(now())\n  updatedAt           DateTime          @updatedAt\n  bookings            Booking[]\n}\n\nmodel TechnicianProfile {\n  id           String  @id @default(uuid())\n  profilePhoto String?\n  bio          String?\n  experience   Int?\n\n  userId    String   @unique\n  user      User     @relation(fields: [userId], references: [id])\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  services Service[]\n\n  @@map("technicianProfiles")\n}\n\nmodel User {\n  id               String       @id @default(ulid())\n  name             String       @db.VarChar(255)\n  email            String       @unique\n  password         String\n  status           ActiveStatus @default(UNBAN)\n  role             Role         @default(CUSTOMER)\n  stripeCustomerId String?      @unique\n  createdAt        DateTime     @default(now())\n  updatedAt        DateTime     @updatedAt\n\n  profile  TechnicianProfile?\n  bookings Booking[]\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"bookingAt","kind":"scalar","type":"DateTime"},{"name":"address","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"payment","kind":"object","type":"Payment","relationName":"BookingToPayment"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"stripeSessionId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Int"},{"name":"provider","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"location","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToService"}],"dbName":null},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"services","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"}],"dbName":"technicianProfiles"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ActiveStatus"},{"name":"role","kind":"enum","type":"Role"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"profile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","orderBy","cursor","technicianProfile","bookings","_count","services","profile","customer","service","booking","payment","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","data","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","create","update","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","having","_min","_max","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","_avg","_sum","Payment.groupBy","Payment.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","ActiveStatus","status","Role","role","stripeCustomerId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","profilePhoto","bio","experience","userId","description","price","location","rating","technicianProfileId","bookingId","stripeSessionId","amount","provider","paidAt","bookingAt","address","BookingStatus","customerId","serviceId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "4AI6YA8JAAC_AQAgCgAA1wEAIAwAANgBACB1AADVAQAwdgAACQAQdwAA1QEAMHgBAAAAAXkBALIBACF9AADWAaIBIoEBQAC2AQAhggFAALYBACGfAUAAzQEAIaABAQCyAQAhogEBALIBACGjAQEAsgEAIQEAAAABACAMAQAAvwEAIAcAAMABACB1AAC9AQAwdgAAAwAQdwAAvQEAMHgBALIBACGBAUAAtgEAIYIBQAC2AQAhkQEBALUBACGSAQEAtQEAIZMBAgC-AQAhlAEBALIBACEBAAAAAwAgDgQAANsBACAFAAC4AQAgdQAA2QEAMHYAAAUAEHcAANkBADB4AQCyAQAheQEAsgEAIYEBQAC2AQAhggFAALYBACGVAQEAtQEAIZYBCADaAQAhlwEBALUBACGYAQIAvgEAIZkBAQCyAQAhBgQAAKMCACAFAACkAgAglQEAANwBACCWAQAA3AEAIJcBAADcAQAgmAEAANwBACAOBAAA2wEAIAUAALgBACB1AADZAQAwdgAABQAQdwAA2QEAMHgBAAAAAXkBALIBACGBAUAAtgEAIYIBQAC2AQAhlQEBALUBACGWAQgA2gEAIZcBAQC1AQAhmAECAL4BACGZAQEAsgEAIQMAAAAFACACAAAGADADAAAHACAPCQAAvwEAIAoAANcBACAMAADYAQAgdQAA1QEAMHYAAAkAEHcAANUBADB4AQCyAQAheQEAsgEAIX0AANYBogEigQFAALYBACGCAUAAtgEAIZ8BQADNAQAhoAEBALIBACGiAQEAsgEAIaMBAQCyAQAhBAkAAKwCACAKAADDAgAgDAAAxAIAIJ8BAADcAQAgAwAAAAkAIAIAAAoAMAMAAAEAIAEAAAAJACABAAAABQAgAwAAAAkAIAIAAAoAMAMAAAEAIAEAAAAJACAMCwAAzgEAIHUAAMsBADB2AAAQABB3AADLAQAweAEAsgEAIX0BALIBACGBAUAAtgEAIZoBAQCyAQAhmwEBALIBACGcAQIAzAEAIZ0BAQCyAQAhngFAAM0BACEBAAAAEAAgAQAAAAEAIAMAAAAJACACAAAKADADAAABACADAAAACQAgAgAACgAwAwAAAQAgAwAAAAkAIAIAAAoAMAMAAAEAIAwJAACdAgAgCgAA_QEAIAwAAP4BACB4AQAAAAF5AQAAAAF9AAAAogECgQFAAAAAAYIBQAAAAAGfAUAAAAABoAEBAAAAAaIBAQAAAAGjAQEAAAABARIAABYAIAl4AQAAAAF5AQAAAAF9AAAAogECgQFAAAAAAYIBQAAAAAGfAUAAAAABoAEBAAAAAaIBAQAAAAGjAQEAAAABARIAABgAMAESAAAYADAMCQAAmwIAIAoAAPQBACAMAAD1AQAgeAEA4AEAIXkBAOABACF9AADyAaIBIoEBQADkAQAhggFAAOQBACGfAUAA8QEAIaABAQDgAQAhogEBAOABACGjAQEA4AEAIQIAAAABACASAAAbACAJeAEA4AEAIXkBAOABACF9AADyAaIBIoEBQADkAQAhggFAAOQBACGfAUAA8QEAIaABAQDgAQAhogEBAOABACGjAQEA4AEAIQIAAAAJACASAAAdACACAAAACQAgEgAAHQAgAwAAAAEAIBkAABYAIBoAABsAIAEAAAABACABAAAACQAgBAYAAMACACAfAADCAgAgIAAAwQIAIJ8BAADcAQAgDHUAANEBADB2AAAkABB3AADRAQAweAEAoAEAIXkBAKABACF9AADSAaIBIoEBQACkAQAhggFAAKQBACGfAUAAxgEAIaABAQCgAQAhogEBAKABACGjAQEAoAEAIQMAAAAJACACAAAjADAeAAAkACADAAAACQAgAgAACgAwAwAAAQAgCHUAANABADB2AAAqABB3AADQAQAweAEAAAABeQEAAAABgQFAALYBACGCAUAAtgEAIZUBAQC1AQAhAQAAACcAIAEAAAAnACAIdQAA0AEAMHYAACoAEHcAANABADB4AQCyAQAheQEAsgEAIYEBQAC2AQAhggFAALYBACGVAQEAtQEAIQGVAQAA3AEAIAMAAAAqACACAAArADADAAAnACADAAAAKgAgAgAAKwAwAwAAJwAgAwAAACoAIAIAACsAMAMAACcAIAV4AQAAAAF5AQAAAAGBAUAAAAABggFAAAAAAZUBAQAAAAEBEgAALwAgBXgBAAAAAXkBAAAAAYEBQAAAAAGCAUAAAAABlQEBAAAAAQESAAAxADABEgAAMQAwBXgBAOABACF5AQDgAQAhgQFAAOQBACGCAUAA5AEAIZUBAQDjAQAhAgAAACcAIBIAADQAIAV4AQDgAQAheQEA4AEAIYEBQADkAQAhggFAAOQBACGVAQEA4wEAIQIAAAAqACASAAA2ACACAAAAKgAgEgAANgAgAwAAACcAIBkAAC8AIBoAADQAIAEAAAAnACABAAAAKgAgBAYAAL0CACAfAAC_AgAgIAAAvgIAIJUBAADcAQAgCHUAAM8BADB2AAA9ABB3AADPAQAweAEAoAEAIXkBAKABACGBAUAApAEAIYIBQACkAQAhlQEBAKMBACEDAAAAKgAgAgAAPAAwHgAAPQAgAwAAACoAIAIAACsAMAMAACcAIAwLAADOAQAgdQAAywEAMHYAABAAEHcAAMsBADB4AQAAAAF9AQCyAQAhgQFAALYBACGaAQEAAAABmwEBALIBACGcAQIAzAEAIZ0BAQCyAQAhngFAAM0BACEBAAAAQAAgAQAAAEAAIAILAAC8AgAgngEAANwBACADAAAAEAAgAgAAQwAwAwAAQAAgAwAAABAAIAIAAEMAMAMAAEAAIAMAAAAQACACAABDADADAABAACAJCwAAuwIAIHgBAAAAAX0BAAAAAYEBQAAAAAGaAQEAAAABmwEBAAAAAZwBAgAAAAGdAQEAAAABngFAAAAAAQESAABHACAIeAEAAAABfQEAAAABgQFAAAAAAZoBAQAAAAGbAQEAAAABnAECAAAAAZ0BAQAAAAGeAUAAAAABARIAAEkAMAESAABJADAJCwAAugIAIHgBAOABACF9AQDgAQAhgQFAAOQBACGaAQEA4AEAIZsBAQDgAQAhnAECAPsBACGdAQEA4AEAIZ4BQADxAQAhAgAAAEAAIBIAAEwAIAh4AQDgAQAhfQEA4AEAIYEBQADkAQAhmgEBAOABACGbAQEA4AEAIZwBAgD7AQAhnQEBAOABACGeAUAA8QEAIQIAAAAQACASAABOACACAAAAEAAgEgAATgAgAwAAAEAAIBkAAEcAIBoAAEwAIAEAAABAACABAAAAEAAgBgYAALUCACAfAAC4AgAgIAAAtwIAIEEAALYCACBCAAC5AgAgngEAANwBACALdQAAxAEAMHYAAFUAEHcAAMQBADB4AQCgAQAhfQEAoAEAIYEBQACkAQAhmgEBAKABACGbAQEAoAEAIZwBAgDFAQAhnQEBAKABACGeAUAAxgEAIQMAAAAQACACAABUADAeAABVACADAAAAEAAgAgAAQwAwAwAAQAAgAQAAAAcAIAEAAAAHACADAAAABQAgAgAABgAwAwAABwAgAwAAAAUAIAIAAAYAMAMAAAcAIAMAAAAFACACAAAGADADAAAHACALBAAAtAIAIAUAAJ8CACB4AQAAAAF5AQAAAAGBAUAAAAABggFAAAAAAZUBAQAAAAGWAQgAAAABlwEBAAAAAZgBAgAAAAGZAQEAAAABARIAAF0AIAl4AQAAAAF5AQAAAAGBAUAAAAABggFAAAAAAZUBAQAAAAGWAQgAAAABlwEBAAAAAZgBAgAAAAGZAQEAAAABARIAAF8AMAESAABfADALBAAAswIAIAUAAJICACB4AQDgAQAheQEA4AEAIYEBQADkAQAhggFAAOQBACGVAQEA4wEAIZYBCACQAgAhlwEBAOMBACGYAQIAhAIAIZkBAQDgAQAhAgAAAAcAIBIAAGIAIAl4AQDgAQAheQEA4AEAIYEBQADkAQAhggFAAOQBACGVAQEA4wEAIZYBCACQAgAhlwEBAOMBACGYAQIAhAIAIZkBAQDgAQAhAgAAAAUAIBIAAGQAIAIAAAAFACASAABkACADAAAABwAgGQAAXQAgGgAAYgAgAQAAAAcAIAEAAAAFACAJBgAArgIAIB8AALECACAgAACwAgAgQQAArwIAIEIAALICACCVAQAA3AEAIJYBAADcAQAglwEAANwBACCYAQAA3AEAIAx1AADBAQAwdgAAawAQdwAAwQEAMHgBAKABACF5AQCgAQAhgQFAAKQBACGCAUAApAEAIZUBAQCjAQAhlgEIAMIBACGXAQEAowEAIZgBAgC6AQAhmQEBAKABACEDAAAABQAgAgAAagAwHgAAawAgAwAAAAUAIAIAAAYAMAMAAAcAIAwBAAC_AQAgBwAAwAEAIHUAAL0BADB2AAADABB3AAC9AQAweAEAAAABgQFAALYBACGCAUAAtgEAIZEBAQC1AQAhkgEBALUBACGTAQIAvgEAIZQBAQAAAAEBAAAAbgAgAQAAAG4AIAUBAACsAgAgBwAArQIAIJEBAADcAQAgkgEAANwBACCTAQAA3AEAIAMAAAADACACAABxADADAABuACADAAAAAwAgAgAAcQAwAwAAbgAgAwAAAAMAIAIAAHEAMAMAAG4AIAkBAACrAgAgBwAAoAIAIHgBAAAAAYEBQAAAAAGCAUAAAAABkQEBAAAAAZIBAQAAAAGTAQIAAAABlAEBAAAAAQESAAB1ACAHeAEAAAABgQFAAAAAAYIBQAAAAAGRAQEAAAABkgEBAAAAAZMBAgAAAAGUAQEAAAABARIAAHcAMAESAAB3ADAJAQAAqgIAIAcAAIUCACB4AQDgAQAhgQFAAOQBACGCAUAA5AEAIZEBAQDjAQAhkgEBAOMBACGTAQIAhAIAIZQBAQDgAQAhAgAAAG4AIBIAAHoAIAd4AQDgAQAhgQFAAOQBACGCAUAA5AEAIZEBAQDjAQAhkgEBAOMBACGTAQIAhAIAIZQBAQDgAQAhAgAAAAMAIBIAAHwAIAIAAAADACASAAB8ACADAAAAbgAgGQAAdQAgGgAAegAgAQAAAG4AIAEAAAADACAIBgAApQIAIB8AAKgCACAgAACnAgAgQQAApgIAIEIAAKkCACCRAQAA3AEAIJIBAADcAQAgkwEAANwBACAKdQAAuQEAMHYAAIMBABB3AAC5AQAweAEAoAEAIYEBQACkAQAhggFAAKQBACGRAQEAowEAIZIBAQCjAQAhkwECALoBACGUAQEAoAEAIQMAAAADACACAACCAQAwHgAAgwEAIAMAAAADACACAABxADADAABuACAOBQAAuAEAIAgAALcBACB1AACxAQAwdgAAiQEAEHcAALEBADB4AQAAAAF5AQCyAQAhegEAAAABewEAsgEAIX0AALMBfSJ_AAC0AX8igAEBAAAAAYEBQAC2AQAhggFAALYBACEBAAAAhgEAIAEAAACGAQAgDgUAALgBACAIAAC3AQAgdQAAsQEAMHYAAIkBABB3AACxAQAweAEAsgEAIXkBALIBACF6AQCyAQAhewEAsgEAIX0AALMBfSJ_AAC0AX8igAEBALUBACGBAUAAtgEAIYIBQAC2AQAhAwUAAKQCACAIAACjAgAggAEAANwBACADAAAAiQEAIAIAAIoBADADAACGAQAgAwAAAIkBACACAACKAQAwAwAAhgEAIAMAAACJAQAgAgAAigEAMAMAAIYBACALBQAAogIAIAgAAKECACB4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF9AAAAfQJ_AAAAfwKAAQEAAAABgQFAAAAAAYIBQAAAAAEBEgAAjgEAIAl4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF9AAAAfQJ_AAAAfwKAAQEAAAABgQFAAAAAAYIBQAAAAAEBEgAAkAEAMAESAACQAQAwCwUAAOYBACAIAADlAQAgeAEA4AEAIXkBAOABACF6AQDgAQAhewEA4AEAIX0AAOEBfSJ_AADiAX8igAEBAOMBACGBAUAA5AEAIYIBQADkAQAhAgAAAIYBACASAACTAQAgCXgBAOABACF5AQDgAQAhegEA4AEAIXsBAOABACF9AADhAX0ifwAA4gF_IoABAQDjAQAhgQFAAOQBACGCAUAA5AEAIQIAAACJAQAgEgAAlQEAIAIAAACJAQAgEgAAlQEAIAMAAACGAQAgGQAAjgEAIBoAAJMBACABAAAAhgEAIAEAAACJAQAgBAYAAN0BACAfAADfAQAgIAAA3gEAIIABAADcAQAgDHUAAJ8BADB2AACcAQAQdwAAnwEAMHgBAKABACF5AQCgAQAhegEAoAEAIXsBAKABACF9AAChAX0ifwAAogF_IoABAQCjAQAhgQFAAKQBACGCAUAApAEAIQMAAACJAQAgAgAAmwEAMB4AAJwBACADAAAAiQEAIAIAAIoBADADAACGAQAgDHUAAJ8BADB2AACcAQAQdwAAnwEAMHgBAKABACF5AQCgAQAhegEAoAEAIXsBAKABACF9AAChAX0ifwAAogF_IoABAQCjAQAhgQFAAKQBACGCAUAApAEAIQ4GAACmAQAgHwAAsAEAICAAALABACCDAQEAAAABhAEBAAAABIUBAQAAAASGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigEBAK8BACGLAQEAAAABjAEBAAAAAY0BAQAAAAEHBgAApgEAIB8AAK4BACAgAACuAQAggwEAAAB9AoQBAAAAfQiFAQAAAH0IigEAAK0BfSIHBgAApgEAIB8AAKwBACAgAACsAQAggwEAAAB_AoQBAAAAfwiFAQAAAH8IigEAAKsBfyIOBgAAqQEAIB8AAKoBACAgAACqAQAggwEBAAAAAYQBAQAAAAWFAQEAAAAFhgEBAAAAAYcBAQAAAAGIAQEAAAABiQEBAAAAAYoBAQCoAQAhiwEBAAAAAYwBAQAAAAGNAQEAAAABCwYAAKYBACAfAACnAQAgIAAApwEAIIMBQAAAAAGEAUAAAAAEhQFAAAAABIYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQAAAAAGKAUAApQEAIQsGAACmAQAgHwAApwEAICAAAKcBACCDAUAAAAABhAFAAAAABIUBQAAAAASGAUAAAAABhwFAAAAAAYgBQAAAAAGJAUAAAAABigFAAKUBACEIgwECAAAAAYQBAgAAAASFAQIAAAAEhgECAAAAAYcBAgAAAAGIAQIAAAABiQECAAAAAYoBAgCmAQAhCIMBQAAAAAGEAUAAAAAEhQFAAAAABIYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQAAAAAGKAUAApwEAIQ4GAACpAQAgHwAAqgEAICAAAKoBACCDAQEAAAABhAEBAAAABYUBAQAAAAWGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigEBAKgBACGLAQEAAAABjAEBAAAAAY0BAQAAAAEIgwECAAAAAYQBAgAAAAWFAQIAAAAFhgECAAAAAYcBAgAAAAGIAQIAAAABiQECAAAAAYoBAgCpAQAhC4MBAQAAAAGEAQEAAAAFhQEBAAAABYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQEAqgEAIYsBAQAAAAGMAQEAAAABjQEBAAAAAQcGAACmAQAgHwAArAEAICAAAKwBACCDAQAAAH8ChAEAAAB_CIUBAAAAfwiKAQAAqwF_IgSDAQAAAH8ChAEAAAB_CIUBAAAAfwiKAQAArAF_IgcGAACmAQAgHwAArgEAICAAAK4BACCDAQAAAH0ChAEAAAB9CIUBAAAAfQiKAQAArQF9IgSDAQAAAH0ChAEAAAB9CIUBAAAAfQiKAQAArgF9Ig4GAACmAQAgHwAAsAEAICAAALABACCDAQEAAAABhAEBAAAABIUBAQAAAASGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigEBAK8BACGLAQEAAAABjAEBAAAAAY0BAQAAAAELgwEBAAAAAYQBAQAAAASFAQEAAAAEhgEBAAAAAYcBAQAAAAGIAQEAAAABiQEBAAAAAYoBAQCwAQAhiwEBAAAAAYwBAQAAAAGNAQEAAAABDgUAALgBACAIAAC3AQAgdQAAsQEAMHYAAIkBABB3AACxAQAweAEAsgEAIXkBALIBACF6AQCyAQAhewEAsgEAIX0AALMBfSJ_AAC0AX8igAEBALUBACGBAUAAtgEAIYIBQAC2AQAhC4MBAQAAAAGEAQEAAAAEhQEBAAAABIYBAQAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQEAsAEAIYsBAQAAAAGMAQEAAAABjQEBAAAAAQSDAQAAAH0ChAEAAAB9CIUBAAAAfQiKAQAArgF9IgSDAQAAAH8ChAEAAAB_CIUBAAAAfwiKAQAArAF_IguDAQEAAAABhAEBAAAABYUBAQAAAAWGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigEBAKoBACGLAQEAAAABjAEBAAAAAY0BAQAAAAEIgwFAAAAAAYQBQAAAAASFAUAAAAAEhgFAAAAAAYcBQAAAAAGIAUAAAAABiQFAAAAAAYoBQACnAQAhDgEAAL8BACAHAADAAQAgdQAAvQEAMHYAAAMAEHcAAL0BADB4AQCyAQAhgQFAALYBACGCAUAAtgEAIZEBAQC1AQAhkgEBALUBACGTAQIAvgEAIZQBAQCyAQAhpAEAAAMAIKUBAAADACADjgEAAAkAII8BAAAJACCQAQAACQAgCnUAALkBADB2AACDAQAQdwAAuQEAMHgBAKABACGBAUAApAEAIYIBQACkAQAhkQEBAKMBACGSAQEAowEAIZMBAgC6AQAhlAEBAKABACENBgAAqQEAIB8AAKkBACAgAACpAQAgQQAAvAEAIEIAAKkBACCDAQIAAAABhAECAAAABYUBAgAAAAWGAQIAAAABhwECAAAAAYgBAgAAAAGJAQIAAAABigECALsBACENBgAAqQEAIB8AAKkBACAgAACpAQAgQQAAvAEAIEIAAKkBACCDAQIAAAABhAECAAAABYUBAgAAAAWGAQIAAAABhwECAAAAAYgBAgAAAAGJAQIAAAABigECALsBACEIgwEIAAAAAYQBCAAAAAWFAQgAAAAFhgEIAAAAAYcBCAAAAAGIAQgAAAABiQEIAAAAAYoBCAC8AQAhDAEAAL8BACAHAADAAQAgdQAAvQEAMHYAAAMAEHcAAL0BADB4AQCyAQAhgQFAALYBACGCAUAAtgEAIZEBAQC1AQAhkgEBALUBACGTAQIAvgEAIZQBAQCyAQAhCIMBAgAAAAGEAQIAAAAFhQECAAAABYYBAgAAAAGHAQIAAAABiAECAAAAAYkBAgAAAAGKAQIAqQEAIRAFAAC4AQAgCAAAtwEAIHUAALEBADB2AACJAQAQdwAAsQEAMHgBALIBACF5AQCyAQAhegEAsgEAIXsBALIBACF9AACzAX0ifwAAtAF_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_AQAgGgAAggIAIKYBAACAAgAgpwEAAIECACCqAQAAAwAgqwEAAAMAIKwBAABuACALGQAA5wEAMBoAAOwBADCmAQAA6AEAMKcBAADpAQAwqAEAAOoBACCpAQAA6wEAMKoBAADrAQAwqwEAAOsBADCsAQAA6wEAMK0BAADtAQAwrgEAAO4BADAKCgAA_QEAIAwAAP4BACB4AQAAAAF5AQAAAAF9AAAAogECgQFAAAAAAYIBQAAAAAGfAUAAAAABoAEBAAAAAaMBAQAAAAECAAAAAQAgGQAA_AEAIAMAAAABACAZAAD8AQAgGgAA8wEAIAESAADgAgAwDwkAAL8BACAKAADXAQAgDAAA2AEAIHUAANUBADB2AAAJABB3AADVAQAweAEAAAABeQEAsgEAIX0AANYBogEigQFAALYBACGCAUAAtgEAIZ8BQADNAQAhoAEBALIBACGiAQEAsgEAIaMBAQCyAQAhAgAAAAEAIBIAAPMBACACAAAA7wEAIBIAAPABACAMdQAA7gEAMHYAAO8BABB3AADuAQAweAEAsgEAIXkBALIBACF9AADWAaIBIoEBQAC2AQAhggFAALYBACGfAUAAzQEAIaABAQCyAQAhogEBALIBACGjAQEAsgEAIQx1AADuAQAwdgAA7wEAEHcAAO4BADB4AQCyAQAheQEAsgEAIX0AANYBogEigQFAALYBACGCAUAAtgEAIZ8BQADNAQAhoAEBALIBACGiAQEAsgEAIaMBAQCyAQAhCHgBAOABACF5AQDgAQAhfQAA8gGiASKBAUAA5AEAIYIBQADkAQAhnwFAAPEBACGgAQEA4AEAIaMBAQDgAQAhAakBQAAAAAEBqQEAAACiAQIKCgAA9AEAIAwAAPUBACB4AQDgAQAheQEA4AEAIX0AAPIBogEigQFAAOQBACGCAUAA5AEAIZ8BQADxAQAhoAEBAOABACGjAQEA4AEAIQUZAADbAgAgGgAA3gIAIKYBAADcAgAgpwEAAN0CACCsAQAABwAgBxkAAPYBACAaAAD5AQAgpgEAAPcBACCnAQAA-AEAIKoBAAAQACCrAQAAEAAgrAEAAEAAIAd4AQAAAAF9AQAAAAGBAUAAAAABmwEBAAAAAZwBAgAAAAGdAQEAAAABngFAAAAAAQIAAABAACAZAAD2AQAgAwAAABAAIBkAAPYBACAaAAD6AQAgCQAAABAAIBIAAPoBACB4AQDgAQAhfQEA4AEAIYEBQADkAQAhmwEBAOABACGcAQIA-wEAIZ0BAQDgAQAhngFAAPEBACEHeAEA4AEAIX0BAOABACGBAUAA5AEAIZsBAQDgAQAhnAECAPsBACGdAQEA4AEAIZ4BQADxAQAhBakBAgAAAAGvAQIAAAABsAECAAAAAbEBAgAAAAGyAQIAAAABCgoAAP0BACAMAAD-AQAgeAEAAAABeQEAAAABfQAAAKIBAoEBQAAAAAGCAUAAAAABnwFAAAAAAaABAQAAAAGjAQEAAAABAxkAANsCACCmAQAA3AIAIKwBAAAHACADGQAA9gEAIKYBAAD3AQAgrAEAAEAAIAcHAACgAgAgeAEAAAABgQFAAAAAAYIBQAAAAAGRAQEAAAABkgEBAAAAAZMBAgAAAAECAAAAbgAgGQAA_wEAIAMAAAADACAZAAD_AQAgGgAAgwIAIAkAAAADACAHAACFAgAgEgAAgwIAIHgBAOABACGBAUAA5AEAIYIBQADkAQAhkQEBAOMBACGSAQEA4wEAIZMBAgCEAgAhBwcAAIUCACB4AQDgAQAhgQFAAOQBACGCAUAA5AEAIZEBAQDjAQAhkgEBAOMBACGTAQIAhAIAIQWpAQIAAAABrwECAAAAAbABAgAAAAGxAQIAAAABsgECAAAAAQsZAACGAgAwGgAAiwIAMKYBAACHAgAwpwEAAIgCADCoAQAAiQIAIKkBAACKAgAwqgEAAIoCADCrAQAAigIAMKwBAACKAgAwrQEAAIwCADCuAQAAjQIAMAkFAACfAgAgeAEAAAABeQEAAAABgQFAAAAAAYIBQAAAAAGVAQEAAAABlgEIAAAAAZcBAQAAAAGYAQIAAAABAgAAAAcAIBkAAJ4CACADAAAABwAgGQAAngIAIBoAAJECACABEgAA2gIAMA4EAADbAQAgBQAAuAEAIHUAANkBADB2AAAFABB3AADZAQAweAEAAAABeQEAsgEAIYEBQAC2AQAhggFAALYBACGVAQEAtQEAIZYBCADaAQAhlwEBALUBACGYAQIAvgEAIZkBAQCyAQAhAgAAAAcAIBIAAJECACACAAAAjgIAIBIAAI8CACAMdQAAjQIAMHYAAI4CABB3AACNAgAweAEAsgEAIXkBALIBACGBAUAAtgEAIYIBQAC2AQAhlQEBALUBACGWAQgA2gEAIZcBAQC1AQAhmAECAL4BACGZAQEAsgEAIQx1AACNAgAwdgAAjgIAEHcAAI0CADB4AQCyAQAheQEAsgEAIYEBQAC2AQAhggFAALYBACGVAQEAtQEAIZYBCADaAQAhlwEBALUBACGYAQIAvgEAIZkBAQCyAQAhCHgBAOABACF5AQDgAQAhgQFAAOQBACGCAUAA5AEAIZUBAQDjAQAhlgEIAJACACGXAQEA4wEAIZgBAgCEAgAhBakBCAAAAAGvAQgAAAABsAEIAAAAAbEBCAAAAAGyAQgAAAABCQUAAJICACB4AQDgAQAheQEA4AEAIYEBQADkAQAhggFAAOQBACGVAQEA4wEAIZYBCACQAgAhlwEBAOMBACGYAQIAhAIAIQsZAACTAgAwGgAAlwIAMKYBAACUAgAwpwEAAJUCADCoAQAAlgIAIKkBAADrAQAwqgEAAOsBADCrAQAA6wEAMKwBAADrAQAwrQEAAJgCADCuAQAA7gEAMAoJAACdAgAgDAAA_gEAIHgBAAAAAXkBAAAAAX0AAACiAQKBAUAAAAABggFAAAAAAZ8BQAAAAAGgAQEAAAABogEBAAAAAQIAAAABACAZAACcAgAgAwAAAAEAIBkAAJwCACAaAACaAgAgARIAANkCADACAAAAAQAgEgAAmgIAIAIAAADvAQAgEgAAmQIAIAh4AQDgAQAheQEA4AEAIX0AAPIBogEigQFAAOQBACGCAUAA5AEAIZ8BQADxAQAhoAEBAOABACGiAQEA4AEAIQoJAACbAgAgDAAA9QEAIHgBAOABACF5AQDgAQAhfQAA8gGiASKBAUAA5AEAIYIBQADkAQAhnwFAAPEBACGgAQEA4AEAIaIBAQDgAQAhBRkAANQCACAaAADXAgAgpgEAANUCACCnAQAA1gIAIKwBAACGAQAgCgkAAJ0CACAMAAD-AQAgeAEAAAABeQEAAAABfQAAAKIBAoEBQAAAAAGCAUAAAAABnwFAAAAAAaABAQAAAAGiAQEAAAABAxkAANQCACCmAQAA1QIAIKwBAACGAQAgCQUAAJ8CACB4AQAAAAF5AQAAAAGBAUAAAAABggFAAAAAAZUBAQAAAAGWAQgAAAABlwEBAAAAAZgBAgAAAAEEGQAAkwIAMKYBAACUAgAwqAEAAJYCACCsAQAA6wEAMAQZAACGAgAwpgEAAIcCADCoAQAAiQIAIKwBAACKAgAwAxkAAP8BACCmAQAAgAIAIKwBAABuACAEGQAA5wEAMKYBAADoAQAwqAEAAOoBACCsAQAA6wEAMAUBAACsAgAgBwAArQIAIJEBAADcAQAgkgEAANwBACCTAQAA3AEAIAAAAAAAAAUZAADPAgAgGgAA0gIAIKYBAADQAgAgpwEAANECACCsAQAAhgEAIAMZAADPAgAgpgEAANACACCsAQAAhgEAIAMFAACkAgAgCAAAowIAIIABAADcAQAgAAAAAAAABRkAAMoCACAaAADNAgAgpgEAAMsCACCnAQAAzAIAIKwBAABuACADGQAAygIAIKYBAADLAgAgrAEAAG4AIAAAAAAABRkAAMUCACAaAADIAgAgpgEAAMYCACCnAQAAxwIAIKwBAAABACADGQAAxQIAIKYBAADGAgAgrAEAAAEAIAQJAACsAgAgCgAAwwIAIAwAAMQCACCfAQAA3AEAIAAAAAAAAAYEAACjAgAgBQAApAIAIJUBAADcAQAglgEAANwBACCXAQAA3AEAIJgBAADcAQAgAgsAALwCACCeAQAA3AEAIAsJAACdAgAgCgAA_QEAIHgBAAAAAXkBAAAAAX0AAACiAQKBAUAAAAABggFAAAAAAZ8BQAAAAAGgAQEAAAABogEBAAAAAaMBAQAAAAECAAAAAQAgGQAAxQIAIAMAAAAJACAZAADFAgAgGgAAyQIAIA0AAAAJACAJAACbAgAgCgAA9AEAIBIAAMkCACB4AQDgAQAheQEA4AEAIX0AAPIBogEigQFAAOQBACGCAUAA5AEAIZ8BQADxAQAhoAEBAOABACGiAQEA4AEAIaMBAQDgAQAhCwkAAJsCACAKAAD0AQAgeAEA4AEAIXkBAOABACF9AADyAaIBIoEBQADkAQAhggFAAOQBACGfAUAA8QEAIaABAQDgAQAhogEBAOABACGjAQEA4AEAIQgBAACrAgAgeAEAAAABgQFAAAAAAYIBQAAAAAGRAQEAAAABkgEBAAAAAZMBAgAAAAGUAQEAAAABAgAAAG4AIBkAAMoCACADAAAAAwAgGQAAygIAIBoAAM4CACAKAAAAAwAgAQAAqgIAIBIAAM4CACB4AQDgAQAhgQFAAOQBACGCAUAA5AEAIZEBAQDjAQAhkgEBAOMBACGTAQIAhAIAIZQBAQDgAQAhCAEAAKoCACB4AQDgAQAhgQFAAOQBACGCAUAA5AEAIZEBAQDjAQAhkgEBAOMBACGTAQIAhAIAIZQBAQDgAQAhCgUAAKICACB4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF9AAAAfQJ_AAAAfwKAAQEAAAABgQFAAAAAAYIBQAAAAAECAAAAhgEAIBkAAM8CACADAAAAiQEAIBkAAM8CACAaAADTAgAgDAAAAIkBACAFAADmAQAgEgAA0wIAIHgBAOABACF5AQDgAQAhegEA4AEAIXsBAOABACF9AADhAX0ifwAA4gF_IoABAQDjAQAhgQFAAOQBACGCAUAA5AEAIQoFAADmAQAgeAEA4AEAIXkBAOABACF6AQDgAQAhewEA4AEAIX0AAOEBfSJ_AADiAX8igAEBAOMBACGBAUAA5AEAIYIBQADkAQAhCggAAKECACB4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF9AAAAfQJ_AAAAfwKAAQEAAAABgQFAAAAAAYIBQAAAAAECAAAAhgEAIBkAANQCACADAAAAiQEAIBkAANQCACAaAADYAgAgDAAAAIkBACAIAADlAQAgEgAA2AIAIHgBAOABACF5AQDgAQAhegEA4AEAIXsBAOABACF9AADhAX0ifwAA4gF_IoABAQDjAQAhgQFAAOQBACGCAUAA5AEAIQoIAADlAQAgeAEA4AEAIXkBAOABACF6AQDgAQAhewEA4AEAIX0AAOEBfSJ_AADiAX8igAEBAOMBACGBAUAA5AEAIYIBQADkAQAhCHgBAAAAAXkBAAAAAX0AAACiAQKBAUAAAAABggFAAAAAAZ8BQAAAAAGgAQEAAAABogEBAAAAAQh4AQAAAAF5AQAAAAGBAUAAAAABggFAAAAAAZUBAQAAAAGWAQgAAAABlwEBAAAAAZgBAgAAAAEKBAAAtAIAIHgBAAAAAXkBAAAAAYEBQAAAAAGCAUAAAAABlQEBAAAAAZYBCAAAAAGXAQEAAAABmAECAAAAAZkBAQAAAAECAAAABwAgGQAA2wIAIAMAAAAFACAZAADbAgAgGgAA3wIAIAwAAAAFACAEAACzAgAgEgAA3wIAIHgBAOABACF5AQDgAQAhgQFAAOQBACGCAUAA5AEAIZUBAQDjAQAhlgEIAJACACGXAQEA4wEAIZgBAgCEAgAhmQEBAOABACEKBAAAswIAIHgBAOABACF5AQDgAQAhgQFAAOQBACGCAUAA5AEAIZUBAQDjAQAhlgEIAJACACGXAQEA4wEAIZgBAgCEAgAhmQEBAOABACEIeAEAAAABeQEAAAABfQAAAKIBAoEBQAAAAAGCAUAAAAABnwFAAAAAAaABAQAAAAGjAQEAAAABAwkAAgoABAwRCAMFDgEGAAcIBAMDAQACBgAGBwgEAwQAAwULAQYABQEFDAABBw0AAQUPAAELAAEAAgkAAgoABAIJAAIKAAQDBgANHwAOIAAPAAAAAwYADR8ADiAADwAAAAMGABUfABYgABcAAAADBgAVHwAWIAAXAQsAAQELAAEFBgAcHwAfIAAgQQAdQgAeAAAAAAAFBgAcHwAfIAAgQQAdQgAeAQQAAwEEAAMFBgAlHwAoIAApQQAmQgAnAAAAAAAFBgAlHwAoIAApQQAmQgAnAQEAAgEBAAIFBgAuHwAxIAAyQQAvQgAwAAAAAAAFBgAuHwAxIAAyQQAvQgAwAAADBgA3HwA4IAA5AAAAAwYANx8AOCAAOQ0CAQ4SAQ8TARAUAREVARMXARQZCRUaChYcARceCRgfCxsgARwhAR0iCSElDCImECMoESQpESUsESYtEScuESgwESkyCSozEis1ESw3CS04Ey45ES86ETA7CTE-FDI_GDNBCDRCCDVECDZFCDdGCDhICDlKCTpLGTtNCDxPCT1QGj5RCD9SCEBTCUNWG0RXIUVYBEZZBEdaBEhbBElcBEpeBEtgCUxhIk1jBE5lCU9mI1BnBFFoBFJpCVNsJFRtKlVvA1ZwA1dyA1hzA1l0A1p2A1t4CVx5K117A159CV9-LGB_A2GAAQNigQEJY4QBLWSFATNlhwECZogBAmeLAQJojAECaY0BAmqPAQJrkQEJbJIBNG2UAQJulgEJb5cBNXCYAQJxmQECcpoBCXOdATZ0ngE6"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/users/users.service.ts
import bcrypt from "bcryptjs";
var registerUserIntoDB = async (payload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist) {
    throw new Error("user with this email already exist");
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(config_default.bcrypt_salt_rounds)
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto
        }
      }
    }
  });
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email
    },
    omit: { password: true },
    include: {
      profile: true
    }
  });
  return user;
};
var updateProfileInDB = async (userId, payload) => {
  const { name, profilePhoto, bio, experience } = payload;
  const updatedProfile = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      profile: {
        update: {
          profilePhoto,
          bio,
          experience
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return updatedProfile;
};
var userService = {
  registerUserIntoDB,
  updateProfileInDB
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/modules/users/users.controller.ts
var userRegister = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user Registered successful",
      data: { user }
    });
  }
);
var updateProfile = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await userService.updateProfileInDB(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user updated successfully",
      data: { result }
    });
  }
);
var userController = {
  userRegister,
  updateProfile
};

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/middlewares/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new Error(
        "You are not logged in. please log into access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { email, name, id, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("Forbidden, you don't have access to this resource");
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.status === "BAN") {
      throw new Error("Your account is Banned. please contact support");
    }
    req.user = {
      email,
      name,
      id,
      role
    };
    next();
  });
};

// src/modules/users/users.route.ts
var router = Router();
router.post("/register", userController.userRegister);
router.put(
  "/my-profile",
  auth(Role.TECHNICIAN, Role.ADMIN, Role.CUSTOMER),
  userController.updateProfile
);
var userRoutes = router;

// src/modules/auth/auth.route.ts
import { Router as Router2 } from "express";

// src/modules/auth/auth.service.ts
import bcrypt2 from "bcryptjs";
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  });
  if (user.status == "BAN") {
    throw new Error("You account is banned. please contact the admin");
  }
  const isPasswordMatched = await bcrypt2.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("password is incorrect");
  }
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return { user, accessToken, refreshToken: refreshToken3 };
};
var getMyProfile = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return user;
};
var refreshToken = async (refreshTOken) => {
  const verifyRefreshToken = jwtUtils.verifyToken(
    refreshTOken,
    config_default.jwt_refresh_secret
  );
  if (!verifyRefreshToken.success) {
    throw new Error(verifyRefreshToken.error);
  }
  const { id } = verifyRefreshToken.data;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  });
  if (user.status === "BAN") {
    throw new Error("User is banned!");
  }
  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  return { accessToken };
};
var authService = {
  loginUser,
  getMyProfile,
  refreshToken
};

// src/modules/auth/auth.controller.ts
import httpStatus2 from "http-status";
var loginUser2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { user, accessToken, refreshToken: refreshToken3 } = await authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken3, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "user logged in successfully",
      data: {
        user,
        accessToken,
        refreshToken: refreshToken3
      }
    });
  }
);
var getMyProfile2 = catchAsync(
  async (req, res, next) => {
    const profile = await authService.getMyProfile(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "user profile fetched successfully",
      data: {
        profile
      }
    });
  }
);
var refreshToken2 = catchAsync(
  async (req, res, next) => {
    const refreshToken3 = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken3);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "token refreshed successfully",
      data: {
        accessToken
      }
    });
  }
);
var authController = {
  loginUser: loginUser2,
  getMyProfile: getMyProfile2,
  refreshToken: refreshToken2
};

// src/modules/auth/auth.route.ts
var router2 = Router2();
router2.post("/login", authController.loginUser);
router2.get(
  "/me",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  authController.getMyProfile
);
router2.post("/refresh-token", authController.refreshToken);
var authRoutes = router2;

// src/modules/services/services.route.ts
import { Router as Router3 } from "express";

// src/modules/services/services.service.ts
var createServicesInDB = async (payload, userId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId
    }
  });
  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }
  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianProfileId: technicianProfile.id
    }
  });
  return result;
};
var getAllServicesFromDB = async () => {
  const result = await prisma.service.findMany({
    include: {
      technicianProfile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getAllTechniciansFromDB = async (query) => {
  const { name, experience } = query;
  const where = {};
  if (name) {
    where.user = {
      name: {
        contains: name,
        mode: "insensitive"
      }
    };
  }
  if (experience) {
    where.experience = Number(experience);
  }
  const result = await prisma.technicianProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      services: true
    }
  });
  return result;
};
var services = {
  getAllServicesFromDB,
  createServicesInDB,
  getAllTechniciansFromDB
};

// src/modules/services/services.controller.ts
import httpStatus3 from "http-status";
var createServices = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const id = req.user?.id;
    const result = await services.createServicesInDB(payload, id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus3.CREATED,
      message: "services created successfully",
      data: { result }
    });
  }
);
var getAllServices = catchAsync(
  async (req, res, next) => {
    const result = await services.getAllServicesFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Services retrieved successfully",
      data: { result }
    });
  }
);
var getAllTechnicians = catchAsync(
  async (req, res, next) => {
    const result = await services.getAllTechniciansFromDB(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Technicians retrieved successfully",
      data: { result }
    });
  }
);
var serviceController = {
  getAllServices,
  createServices,
  getAllTechnicians
};

// src/modules/services/services.route.ts
var router3 = Router3();
router3.post(
  "/services",
  auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),
  serviceController.createServices
);
router3.get("/all-services", serviceController.getAllServices);
router3.get("/technicians", serviceController.getAllTechnicians);
var serviceRoutes = router3;

// src/modules/bookings/booking.route.ts
import { Router as Router4 } from "express";

// src/modules/bookings/booking.service.ts
var createBookingInDB = async (payload, userId) => {
  const result = await prisma.booking.create({
    data: {
      name: payload.name,
      bookingAt: payload.bookingAt,
      address: payload.address,
      serviceId: payload.serviceId,
      customerId: userId
    },
    include: {
      service: true
    }
  });
  return result;
};
var getMyBookingsFromDB = async () => {
  return prisma.booking.findMany({
    include: {
      service: {
        include: {
          technicianProfile: {
            include: {
              user: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getBookingByIdFromDB = async (bookingId, userId) => {
  const result = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerId: userId
    },
    include: {
      service: {
        include: {
          // category: true,
          technicianProfile: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });
  return result;
};
var bookingService = {
  createBookingInDB,
  getMyBookingsFromDB,
  getBookingByIdFromDB
};

// src/modules/bookings/booking.controller.ts
var createBooking = catchAsync(
  async (req, res, next) => {
    const result = await bookingService.createBookingInDB(
      req.body,
      req.user.id
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
      data: result
    });
  }
);
var getMyBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getMyBookingsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: result
  });
});
var getBookingById = catchAsync(async (req, res) => {
  const result = await bookingService.getBookingByIdFromDB(
    req.params.id,
    req.user.id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: { result }
  });
});
var bookingController = {
  createBooking,
  getMyBookings,
  getBookingById
};

// src/modules/bookings/booking.route.ts
var router4 = Router4();
router4.post("/bookings", auth(Role.CUSTOMER), bookingController.createBooking);
router4.get("/bookings", bookingController.getMyBookings);
router4.get(
  "/bookings/:id",
  auth(Role.CUSTOMER),
  bookingController.getBookingById
);
var bookingRoutes = router4;

// src/modules/payments/payment.route.ts
import { Router as Router5 } from "express";

// src/lib/stripe.ts
import Stripe from "stripe";
var stripe = new Stripe(config_default.stripe_secret_key);

// src/modules/payments/payment.service.ts
var createPayment = async (bookingId, userId) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { customer: true, service: true }
  });
  if (booking.service?.price == null) {
    throw new Error("Service price is not set");
  }
  const session = await stripe.checkout.sessions.create({
    customer_email: booking.customer.email,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: { name: `Service: ${booking.service.name}` },
          unit_amount: 100
        },
        quantity: 1
      }
    ],
    success_url: `${config_default.app_url}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config_default.app_url}/payments/cancel`,
    metadata: { bookingId, userId }
  });
  await prisma.payment.create({
    data: {
      bookingId,
      stripeSessionId: session.id,
      amount: booking.service.price,
      provider: "STRIPE",
      status: "PENDING"
    }
  });
  return { url: session.url };
};
var handleWebhook = async (payload, signature) => {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    config_default.stripe_webhook_secret
  );
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      await prisma.payment.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: "COMPLETED", paidAt: /* @__PURE__ */ new Date() }
      });
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED" }
      });
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
var getPayments = async (userId) => {
  return prisma.payment.findMany({
    where: {
      booking: {
        customerId: userId
        // 👈 filter by foreign key
      }
    },
    include: {
      booking: {
        include: {
          customer: true,
          service: true
        }
      }
    }
  });
};
var getPaymentById = async (id, userId) => {
  return prisma.payment.findFirstOrThrow({
    where: { id, booking: { customerId: userId } },
    include: { booking: true }
  });
};
var paymentService = {
  createPayment,
  handleWebhook,
  getPayments,
  getPaymentById
};

// src/modules/payments/payment.controller.ts
import httpStatus4 from "http-status";
var createPayment2 = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;
  const result = await paymentService.createPayment(
    bookingId,
    userId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.CREATED,
    message: "Payment session created",
    data: result
  });
});
var handleWebhook2 = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    await paymentService.handleWebhook(req.body, sig);
    res.status(200).send({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
var getPayments2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await paymentService.getPayments(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Payment history fetched",
    data: result
  });
});
var getPaymentById2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await paymentService.getPaymentById(id, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Payment details fetched",
    data: result
  });
});
var paymentController = {
  createPayment: createPayment2,
  handleWebhook: handleWebhook2,
  getPayments: getPayments2,
  getPaymentById: getPaymentById2
};

// src/modules/payments/payment.route.ts
var router5 = Router5();
router5.post(
  "/create/:bookingId",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.createPayment
);
router5.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.getPayments
);
router5.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.getPaymentById
);
var paymentRoutes = router5;

// src/middlewares/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "page Not found",
    path: req.originalUrl,
    date: Date()
  });
};

// src/middlewares/globalError.ts
import httpStatus5 from "http-status";
var globalErrorHandler = (err, req, res, next) => {
  res.status(httpStatus5.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus5.INTERNAL_SERVER_ERROR,
    message: err.message,
    error: err.stack
  });
};

// src/app.ts
var app = express();
app.use(
  cors({
    origin: config_default.app_url,
    credentials: true
  })
);
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/", serviceRoutes);
app.use("/api/", bookingRoutes);
app.use("/api/payment/", paymentRoutes);
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/server.ts
var PORT = config_default.port;
var server_default = app_default;
export {
  server_default as default
};
//# sourceMappingURL=server.js.map