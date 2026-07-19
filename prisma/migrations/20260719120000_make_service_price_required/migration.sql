-- Update existing rows with NULL prices to a safe default before enforcing NOT NULL
UPDATE "Service"
SET "price" = 0
WHERE "price" IS NULL;

-- Enforce the non-null constraint on the price column
ALTER TABLE "Service"
ALTER COLUMN "price" SET DEFAULT 0;

ALTER TABLE "Service"
ALTER COLUMN "price" SET NOT NULL;
