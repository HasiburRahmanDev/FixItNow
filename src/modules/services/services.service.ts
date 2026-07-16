import { create } from "node:domain";
import { prisma } from "../../lib/prisma";
import { IServices } from "./services.interface";

const createServicesInDB = async (payload: IServices, userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianProfileId: technicianProfile.id,
    },
  });

  return result;
};

const getAllServicesFromDB = async () => {
  const result = await prisma.service.findMany({
    include: {
      technicianProfile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getAllTechniciansFromDB = async (query: any) => {
  const { name, experience } = query;

  const where: any = {};

  if (name) {
    where.user = {
      name: {
        contains: name,
        mode: "insensitive",
      },
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
          email: true,
        },
      },
      services: true,
    },
  });

  return result;
};

export const services = {
  getAllServicesFromDB,
  createServicesInDB,
  getAllTechniciansFromDB,
};
