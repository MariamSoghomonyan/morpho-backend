-- CreateTable
CREATE TABLE "academyPageContacts" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name_label" TEXT NOT NULL,
    "email_label" TEXT NOT NULL,
    "phone_label" TEXT NOT NULL,
    "course_label" TEXT NOT NULL,
    "courses" JSONB NOT NULL,
    "message_label" TEXT NOT NULL,
    "submit_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academyPageContacts_pkey" PRIMARY KEY ("id")
);
