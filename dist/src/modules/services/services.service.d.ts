import { IServices } from "./services.interface";
export declare const services: {
    getAllServicesFromDB: () => Promise<({
        technicianProfile: {
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            bio: string | null;
            experience: number | null;
            userId: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number | null;
        location: string | null;
        rating: number | null;
        technicianProfileId: string;
    })[]>;
    createServicesInDB: (payload: IServices, userId: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number | null;
        location: string | null;
        rating: number | null;
        technicianProfileId: string;
    }>;
    getAllTechniciansFromDB: (query: any) => Promise<({
        services: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number | null;
            location: string | null;
            rating: number | null;
            technicianProfileId: string;
        }[];
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profilePhoto: string | null;
        bio: string | null;
        experience: number | null;
        userId: string;
    })[]>;
};
//# sourceMappingURL=services.service.d.ts.map