import { z } from 'zod';

const ApiBaseResponseSchema = z.object({});

const ApiPaginatedBaseResponseSchema = ApiBaseResponseSchema.extend({
    pageCount: z.number(),
    totalCount: z.number(),
});

export const getApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) => {
    return ApiBaseResponseSchema.augment({
        data: schema,
    });
};

export const getApiPaginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) => {
    return ApiPaginatedBaseResponseSchema.augment({
        data: z.array(schema),
    });
};

export type ApiPaginatedResponse<T> = z.infer<typeof ApiPaginatedBaseResponseSchema> & {
    data: T[];
}
