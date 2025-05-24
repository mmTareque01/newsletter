import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','firstName','lastName','password','phone','bio','image','createdAt','updatedAt','deletedAt']);

export const SocialMediaScalarFieldEnumSchema = z.enum(['id','facebook','twitter','instagram','linkedin','createdAt','updatedAt','deletedAt','userId']);

export const SubscriberScalarFieldEnumSchema = z.enum(['id','email','name','phone','createdAt','updatedAt','deletedAt','status','userId','newsletterTypeId']);

export const NewsletterTypeScalarFieldEnumSchema = z.enum(['id','title','description','key','createdAt','updatedAt','deletedAt','status','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SubscriberStatusSchema = z.enum(['ACTIVE','INACTIVE','UNSUBSCRIBED']);

export type SubscriberStatusType = `${z.infer<typeof SubscriberStatusSchema>}`

export const NewsletterTypeStatusSchema = z.enum(['ACTIVE','INACTIVE']);

export type NewsletterTypeStatusType = `${z.infer<typeof NewsletterTypeStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  password: z.string().nullable(),
  phone: z.string().nullable(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SOCIAL MEDIA SCHEMA
/////////////////////////////////////////

export const SocialMediaSchema = z.object({
  id: z.string().uuid(),
  facebook: z.string().nullable(),
  twitter: z.string().nullable(),
  instagram: z.string().nullable(),
  linkedin: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  userId: z.string(),
})

export type SocialMedia = z.infer<typeof SocialMediaSchema>

/////////////////////////////////////////
// SUBSCRIBER SCHEMA
/////////////////////////////////////////

export const SubscriberSchema = z.object({
  status: SubscriberStatusSchema,
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  userId: z.string().nullable(),
  newsletterTypeId: z.string().nullable(),
})

export type Subscriber = z.infer<typeof SubscriberSchema>

/////////////////////////////////////////
// NEWSLETTER TYPE SCHEMA
/////////////////////////////////////////

export const NewsletterTypeSchema = z.object({
  status: NewsletterTypeStatusSchema,
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  key: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  userId: z.string().nullable(),
})

export type NewsletterType = z.infer<typeof NewsletterTypeSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaArgsSchema)]).optional(),
  subscriber: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  subscriber: z.boolean().optional(),
  newsletterType: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  password: z.boolean().optional(),
  phone: z.boolean().optional(),
  bio: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  socialMedia: z.union([z.boolean(),z.lazy(() => SocialMediaArgsSchema)]).optional(),
  subscriber: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SOCIAL MEDIA
//------------------------------------------------------

export const SocialMediaIncludeSchema: z.ZodType<Prisma.SocialMediaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SocialMediaArgsSchema: z.ZodType<Prisma.SocialMediaDefaultArgs> = z.object({
  select: z.lazy(() => SocialMediaSelectSchema).optional(),
  include: z.lazy(() => SocialMediaIncludeSchema).optional(),
}).strict();

export const SocialMediaSelectSchema: z.ZodType<Prisma.SocialMediaSelect> = z.object({
  id: z.boolean().optional(),
  facebook: z.boolean().optional(),
  twitter: z.boolean().optional(),
  instagram: z.boolean().optional(),
  linkedin: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SUBSCRIBER
//------------------------------------------------------

export const SubscriberIncludeSchema: z.ZodType<Prisma.SubscriberInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeArgsSchema)]).optional(),
}).strict()

export const SubscriberArgsSchema: z.ZodType<Prisma.SubscriberDefaultArgs> = z.object({
  select: z.lazy(() => SubscriberSelectSchema).optional(),
  include: z.lazy(() => SubscriberIncludeSchema).optional(),
}).strict();

export const SubscriberSelectSchema: z.ZodType<Prisma.SubscriberSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  newsletterTypeId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeArgsSchema)]).optional(),
}).strict()

// NEWSLETTER TYPE
//------------------------------------------------------

export const NewsletterTypeIncludeSchema: z.ZodType<Prisma.NewsletterTypeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  subscribers: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsletterTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NewsletterTypeArgsSchema: z.ZodType<Prisma.NewsletterTypeDefaultArgs> = z.object({
  select: z.lazy(() => NewsletterTypeSelectSchema).optional(),
  include: z.lazy(() => NewsletterTypeIncludeSchema).optional(),
}).strict();

export const NewsletterTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.NewsletterTypeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NewsletterTypeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NewsletterTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.NewsletterTypeCountOutputTypeSelect> = z.object({
  subscribers: z.boolean().optional(),
}).strict();

export const NewsletterTypeSelectSchema: z.ZodType<Prisma.NewsletterTypeSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  key: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  subscribers: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsletterTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  socialMedia: z.union([ z.lazy(() => SocialMediaNullableScalarRelationFilterSchema),z.lazy(() => SocialMediaWhereInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  socialMedia: z.lazy(() => SocialMediaOrderByWithRelationInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberOrderByRelationAggregateInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  socialMedia: z.union([ z.lazy(() => SocialMediaNullableScalarRelationFilterSchema),z.lazy(() => SocialMediaWhereInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SocialMediaWhereInputSchema: z.ZodType<Prisma.SocialMediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  facebook: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SocialMediaOrderByWithRelationInputSchema: z.ZodType<Prisma.SocialMediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SocialMediaWhereUniqueInputSchema: z.ZodType<Prisma.SocialMediaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaWhereInputSchema),z.lazy(() => SocialMediaWhereInputSchema).array() ]).optional(),
  facebook: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SocialMediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.SocialMediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitter: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SocialMediaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SocialMediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SocialMediaMinOrderByAggregateInputSchema).optional()
}).strict();

export const SocialMediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SocialMediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => SocialMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  facebook: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitter: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SubscriberWhereInputSchema: z.ZodType<Prisma.SubscriberWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriberWhereInputSchema),z.lazy(() => SubscriberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriberWhereInputSchema),z.lazy(() => SubscriberWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumSubscriberStatusFilterSchema),z.lazy(() => SubscriberStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  newsletterType: z.union([ z.lazy(() => NewsletterTypeNullableScalarRelationFilterSchema),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriberOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriberOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeOrderByWithRelationInputSchema).optional()
}).strict();

export const SubscriberWhereUniqueInputSchema: z.ZodType<Prisma.SubscriberWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => SubscriberWhereInputSchema),z.lazy(() => SubscriberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriberWhereInputSchema),z.lazy(() => SubscriberWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumSubscriberStatusFilterSchema),z.lazy(() => SubscriberStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  newsletterType: z.union([ z.lazy(() => NewsletterTypeNullableScalarRelationFilterSchema),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional().nullable(),
}).strict());

export const SubscriberOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriberOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SubscriberCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriberMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubscriberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriberScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriberScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumSubscriberStatusWithAggregatesFilterSchema),z.lazy(() => SubscriberStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NewsletterTypeWhereInputSchema: z.ZodType<Prisma.NewsletterTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsletterTypeWhereInputSchema),z.lazy(() => NewsletterTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsletterTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsletterTypeWhereInputSchema),z.lazy(() => NewsletterTypeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  key: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberListRelationFilterSchema).optional()
}).strict();

export const NewsletterTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.NewsletterTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NewsletterTypeWhereUniqueInputSchema: z.ZodType<Prisma.NewsletterTypeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    key: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    key: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  key: z.string().optional(),
  AND: z.union([ z.lazy(() => NewsletterTypeWhereInputSchema),z.lazy(() => NewsletterTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsletterTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsletterTypeWhereInputSchema),z.lazy(() => NewsletterTypeWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberListRelationFilterSchema).optional()
}).strict());

export const NewsletterTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NewsletterTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NewsletterTypeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NewsletterTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NewsletterTypeMinOrderByAggregateInputSchema).optional()
}).strict();

export const NewsletterTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NewsletterTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NewsletterTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsletterTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsletterTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsletterTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsletterTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  key: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusWithAggregatesFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaCreateInputSchema: z.ZodType<Prisma.SocialMediaCreateInput> = z.object({
  id: z.string().uuid().optional(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSocialMediaInputSchema)
}).strict();

export const SocialMediaUncheckedCreateInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  userId: z.string()
}).strict();

export const SocialMediaUpdateInputSchema: z.ZodType<Prisma.SocialMediaUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSocialMediaNestedInputSchema).optional()
}).strict();

export const SocialMediaUncheckedUpdateInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SocialMediaCreateManyInputSchema: z.ZodType<Prisma.SocialMediaCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  userId: z.string()
}).strict();

export const SocialMediaUpdateManyMutationInputSchema: z.ZodType<Prisma.SocialMediaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriberCreateInputSchema: z.ZodType<Prisma.SubscriberCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriberInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedOneWithoutSubscribersInputSchema).optional()
}).strict();

export const SubscriberUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  newsletterTypeId: z.string().optional().nullable()
}).strict();

export const SubscriberUpdateInputSchema: z.ZodType<Prisma.SubscriberUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSubscriberNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateOneWithoutSubscribersNestedInputSchema).optional()
}).strict();

export const SubscriberUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriberCreateManyInputSchema: z.ZodType<Prisma.SubscriberCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  newsletterTypeId: z.string().optional().nullable()
}).strict();

export const SubscriberUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriberUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NewsletterTypeCreateInputSchema: z.ZodType<Prisma.NewsletterTypeCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsletterTypeInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUpdateInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutNewsletterTypeNestedInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeCreateManyInputSchema: z.ZodType<Prisma.NewsletterTypeCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const NewsletterTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsletterTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaNullableScalarRelationFilterSchema: z.ZodType<Prisma.SocialMediaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SocialMediaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SocialMediaWhereInputSchema).optional().nullable()
}).strict();

export const SubscriberListRelationFilterSchema: z.ZodType<Prisma.SubscriberListRelationFilter> = z.object({
  every: z.lazy(() => SubscriberWhereInputSchema).optional(),
  some: z.lazy(() => SubscriberWhereInputSchema).optional(),
  none: z.lazy(() => SubscriberWhereInputSchema).optional()
}).strict();

export const NewsletterTypeListRelationFilterSchema: z.ZodType<Prisma.NewsletterTypeListRelationFilter> = z.object({
  every: z.lazy(() => NewsletterTypeWhereInputSchema).optional(),
  some: z.lazy(() => NewsletterTypeWhereInputSchema).optional(),
  none: z.lazy(() => NewsletterTypeWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SubscriberOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubscriberOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsletterTypeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NewsletterTypeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SocialMediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SocialMediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SocialMediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.SocialMediaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facebook: z.lazy(() => SortOrderSchema).optional(),
  twitter: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSubscriberStatusFilterSchema: z.ZodType<Prisma.EnumSubscriberStatusFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusFilterSchema) ]).optional(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const NewsletterTypeNullableScalarRelationFilterSchema: z.ZodType<Prisma.NewsletterTypeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NewsletterTypeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NewsletterTypeWhereInputSchema).optional().nullable()
}).strict();

export const SubscriberCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriberCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriberMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriberMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriberMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSubscriberStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSubscriberStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriberStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriberStatusFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumNewsletterTypeStatusFilterSchema: z.ZodType<Prisma.EnumNewsletterTypeStatusFilter> = z.object({
  equals: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  in: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema) ]).optional(),
}).strict();

export const NewsletterTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NewsletterTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsletterTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NewsletterTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsletterTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NewsletterTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumNewsletterTypeStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNewsletterTypeStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  in: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => NestedEnumNewsletterTypeStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema).optional()
}).strict();

export const SocialMediaCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SocialMediaWhereUniqueInputSchema).optional()
}).strict();

export const SubscriberCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriberCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsletterTypeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema).array(),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsletterTypeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SocialMediaWhereUniqueInputSchema).optional()
}).strict();

export const SubscriberUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema).array(),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsletterTypeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const SocialMediaUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SocialMediaUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SocialMediaUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SocialMediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SocialMediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SocialMediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SubscriberUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriberUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SubscriberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsletterTypeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema).array(),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsletterTypeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsletterTypeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsletterTypeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsletterTypeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsletterTypeScalarWhereInputSchema),z.lazy(() => NewsletterTypeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SocialMediaUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SocialMediaCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SocialMediaUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SocialMediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SocialMediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SocialMediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SocialMediaUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SubscriberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema).array(),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsletterTypeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsletterTypeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsletterTypeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsletterTypeWhereUniqueInputSchema),z.lazy(() => NewsletterTypeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsletterTypeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsletterTypeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => NewsletterTypeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsletterTypeScalarWhereInputSchema),z.lazy(() => NewsletterTypeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSocialMediaInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSocialMediaNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSocialMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSocialMediaInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSocialMediaInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSocialMediaInputSchema),z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSubscriberInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriberInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriberInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NewsletterTypeCreateNestedOneWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeCreateNestedOneWithoutSubscribersInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsletterTypeCreateOrConnectWithoutSubscribersInputSchema).optional(),
  connect: z.lazy(() => NewsletterTypeWhereUniqueInputSchema).optional()
}).strict();

export const EnumSubscriberStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSubscriberStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubscriberStatusSchema).optional()
}).strict();

export const UserUpdateOneWithoutSubscriberNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutSubscriberNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriberInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriberInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriberInputSchema),z.lazy(() => UserUpdateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriberInputSchema) ]).optional(),
}).strict();

export const NewsletterTypeUpdateOneWithoutSubscribersNestedInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateOneWithoutSubscribersNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsletterTypeCreateOrConnectWithoutSubscribersInputSchema).optional(),
  upsert: z.lazy(() => NewsletterTypeUpsertWithoutSubscribersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NewsletterTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NewsletterTypeUpdateToOneWithWhereWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUpdateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutSubscribersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsletterTypeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNewsletterTypeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberCreateNestedManyWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNewsletterTypeStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NewsletterTypeStatusSchema).optional()
}).strict();

export const UserUpdateOneWithoutNewsletterTypeNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutNewsletterTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsletterTypeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNewsletterTypeInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNewsletterTypeInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNewsletterTypeInputSchema),z.lazy(() => UserUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsletterTypeInputSchema) ]).optional(),
}).strict();

export const SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema: z.ZodType<Prisma.SubscriberUpdateManyWithoutNewsletterTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriberUpdateManyWithWhereWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpdateManyWithWhereWithoutNewsletterTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriberUpdateManyWithWhereWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUpdateManyWithWhereWithoutNewsletterTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumSubscriberStatusFilterSchema: z.ZodType<Prisma.NestedEnumSubscriberStatusFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSubscriberStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSubscriberStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriberStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriberStatusFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumNewsletterTypeStatusFilterSchema: z.ZodType<Prisma.NestedEnumNewsletterTypeStatusFilter> = z.object({
  equals: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  in: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumNewsletterTypeStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNewsletterTypeStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  in: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsletterTypeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => NestedEnumNewsletterTypeStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNewsletterTypeStatusFilterSchema).optional()
}).strict();

export const SocialMediaCreateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const SocialMediaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const SocialMediaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SubscriberCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriberCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedOneWithoutSubscribersInputSchema).optional()
}).strict();

export const SubscriberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  newsletterTypeId: z.string().optional().nullable()
}).strict();

export const SubscriberCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SubscriberCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SubscriberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SubscriberCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscriberCreateManyUserInputSchema),z.lazy(() => SubscriberCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NewsletterTypeCreateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  subscribers: z.lazy(() => SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  subscribers: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NewsletterTypeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NewsletterTypeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NewsletterTypeCreateManyUserInputSchema),z.lazy(() => NewsletterTypeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SocialMediaUpsertWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SocialMediaCreateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SocialMediaWhereInputSchema).optional()
}).strict();

export const SocialMediaUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SocialMediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SocialMediaUpdateWithoutUserInputSchema),z.lazy(() => SocialMediaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SocialMediaUpdateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SocialMediaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SocialMediaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facebook: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitter: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriberUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscriberUpdateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriberCreateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SubscriberUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscriberUpdateWithoutUserInputSchema),z.lazy(() => SubscriberUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SubscriberUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscriberUpdateManyMutationInputSchema),z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SubscriberScalarWhereInputSchema: z.ZodType<Prisma.SubscriberScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriberScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriberScalarWhereInputSchema),z.lazy(() => SubscriberScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumSubscriberStatusFilterSchema),z.lazy(() => SubscriberStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NewsletterTypeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NewsletterTypeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const NewsletterTypeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => NewsletterTypeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NewsletterTypeUpdateManyMutationInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const NewsletterTypeScalarWhereInputSchema: z.ZodType<Prisma.NewsletterTypeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsletterTypeScalarWhereInputSchema),z.lazy(() => NewsletterTypeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsletterTypeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsletterTypeScalarWhereInputSchema),z.lazy(() => NewsletterTypeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  key: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateWithoutSocialMediaInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSocialMediaInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]),
}).strict();

export const UserUpsertWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpsertWithoutSocialMediaInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutSocialMediaInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSocialMediaInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSocialMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSocialMediaInputSchema) ]),
}).strict();

export const UserUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSocialMediaInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSocialMediaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSubscriberInputSchema: z.ZodType<Prisma.UserCreateWithoutSubscriberInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedOneWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSubscriberInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriberInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSubscriberInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriberInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriberInputSchema) ]),
}).strict();

export const NewsletterTypeCreateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeCreateWithoutSubscribersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateWithoutSubscribersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const NewsletterTypeCreateOrConnectWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeCreateOrConnectWithoutSubscribersInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema) ]),
}).strict();

export const UserUpsertWithoutSubscriberInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriberInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriberInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriberInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSubscriberInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriberInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriberInputSchema) ]),
}).strict();

export const UserUpdateWithoutSubscriberInputSchema: z.ZodType<Prisma.UserUpdateWithoutSubscriberInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUpdateOneWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSubscriberInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriberInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUpsertWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUpsertWithoutSubscribersInput> = z.object({
  update: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutSubscribersInputSchema) ]),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema) ]),
  where: z.lazy(() => NewsletterTypeWhereInputSchema).optional()
}).strict();

export const NewsletterTypeUpdateToOneWithWhereWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateToOneWithWhereWithoutSubscribersInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutSubscribersInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutSubscribersInputSchema) ]),
}).strict();

export const NewsletterTypeUpdateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateWithoutSubscribersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateWithoutSubscribersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const SubscriberCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriberInputSchema).optional()
}).strict();

export const SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberCreateOrConnectWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const SubscriberCreateManyNewsletterTypeInputEnvelopeSchema: z.ZodType<Prisma.SubscriberCreateManyNewsletterTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscriberCreateManyNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateManyNewsletterTypeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserUpsertWithoutNewsletterTypeInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const UserUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  socialMedia: z.lazy(() => SocialMediaUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUpsertWithWhereUniqueWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscriberUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUpdateWithWhereUniqueWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => SubscriberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscriberUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const SubscriberUpdateManyWithWhereWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUpdateManyWithWhereWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => SubscriberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscriberUpdateManyMutationInputSchema),z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const SubscriberCreateManyUserInputSchema: z.ZodType<Prisma.SubscriberCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  newsletterTypeId: z.string().optional().nullable()
}).strict();

export const NewsletterTypeCreateManyUserInputSchema: z.ZodType<Prisma.NewsletterTypeCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional()
}).strict();

export const SubscriberUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateOneWithoutSubscribersNestedInputSchema).optional()
}).strict();

export const SubscriberUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriberUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NewsletterTypeUpdateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  subscribers: z.lazy(() => SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  subscribers: z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriberCreateManyNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberCreateManyNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => SubscriberStatusSchema).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const SubscriberUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSubscriberNestedInputSchema).optional()
}).strict();

export const SubscriberUncheckedUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscriberUncheckedUpdateManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUncheckedUpdateManyWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => EnumSubscriberStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaFindFirstArgsSchema: z.ZodType<Prisma.SocialMediaFindFirstArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SocialMediaFindFirstOrThrowArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaFindManyArgsSchema: z.ZodType<Prisma.SocialMediaFindManyArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SocialMediaScalarFieldEnumSchema,SocialMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SocialMediaAggregateArgsSchema: z.ZodType<Prisma.SocialMediaAggregateArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithRelationInputSchema.array(),SocialMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: SocialMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SocialMediaGroupByArgsSchema: z.ZodType<Prisma.SocialMediaGroupByArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  orderBy: z.union([ SocialMediaOrderByWithAggregationInputSchema.array(),SocialMediaOrderByWithAggregationInputSchema ]).optional(),
  by: SocialMediaScalarFieldEnumSchema.array(),
  having: SocialMediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SocialMediaFindUniqueArgsSchema: z.ZodType<Prisma.SocialMediaFindUniqueArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SocialMediaFindUniqueOrThrowArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SubscriberFindFirstArgsSchema: z.ZodType<Prisma.SubscriberFindFirstArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereInputSchema.optional(),
  orderBy: z.union([ SubscriberOrderByWithRelationInputSchema.array(),SubscriberOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriberScalarFieldEnumSchema,SubscriberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriberFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriberFindFirstOrThrowArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereInputSchema.optional(),
  orderBy: z.union([ SubscriberOrderByWithRelationInputSchema.array(),SubscriberOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriberScalarFieldEnumSchema,SubscriberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriberFindManyArgsSchema: z.ZodType<Prisma.SubscriberFindManyArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereInputSchema.optional(),
  orderBy: z.union([ SubscriberOrderByWithRelationInputSchema.array(),SubscriberOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriberScalarFieldEnumSchema,SubscriberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriberAggregateArgsSchema: z.ZodType<Prisma.SubscriberAggregateArgs> = z.object({
  where: SubscriberWhereInputSchema.optional(),
  orderBy: z.union([ SubscriberOrderByWithRelationInputSchema.array(),SubscriberOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriberGroupByArgsSchema: z.ZodType<Prisma.SubscriberGroupByArgs> = z.object({
  where: SubscriberWhereInputSchema.optional(),
  orderBy: z.union([ SubscriberOrderByWithAggregationInputSchema.array(),SubscriberOrderByWithAggregationInputSchema ]).optional(),
  by: SubscriberScalarFieldEnumSchema.array(),
  having: SubscriberScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriberFindUniqueArgsSchema: z.ZodType<Prisma.SubscriberFindUniqueArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereUniqueInputSchema,
}).strict() ;

export const SubscriberFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriberFindUniqueOrThrowArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereUniqueInputSchema,
}).strict() ;

export const NewsletterTypeFindFirstArgsSchema: z.ZodType<Prisma.NewsletterTypeFindFirstArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereInputSchema.optional(),
  orderBy: z.union([ NewsletterTypeOrderByWithRelationInputSchema.array(),NewsletterTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsletterTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsletterTypeScalarFieldEnumSchema,NewsletterTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsletterTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NewsletterTypeFindFirstOrThrowArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereInputSchema.optional(),
  orderBy: z.union([ NewsletterTypeOrderByWithRelationInputSchema.array(),NewsletterTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsletterTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsletterTypeScalarFieldEnumSchema,NewsletterTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsletterTypeFindManyArgsSchema: z.ZodType<Prisma.NewsletterTypeFindManyArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereInputSchema.optional(),
  orderBy: z.union([ NewsletterTypeOrderByWithRelationInputSchema.array(),NewsletterTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsletterTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsletterTypeScalarFieldEnumSchema,NewsletterTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsletterTypeAggregateArgsSchema: z.ZodType<Prisma.NewsletterTypeAggregateArgs> = z.object({
  where: NewsletterTypeWhereInputSchema.optional(),
  orderBy: z.union([ NewsletterTypeOrderByWithRelationInputSchema.array(),NewsletterTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsletterTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsletterTypeGroupByArgsSchema: z.ZodType<Prisma.NewsletterTypeGroupByArgs> = z.object({
  where: NewsletterTypeWhereInputSchema.optional(),
  orderBy: z.union([ NewsletterTypeOrderByWithAggregationInputSchema.array(),NewsletterTypeOrderByWithAggregationInputSchema ]).optional(),
  by: NewsletterTypeScalarFieldEnumSchema.array(),
  having: NewsletterTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsletterTypeFindUniqueArgsSchema: z.ZodType<Prisma.NewsletterTypeFindUniqueArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereUniqueInputSchema,
}).strict() ;

export const NewsletterTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NewsletterTypeFindUniqueOrThrowArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaCreateArgsSchema: z.ZodType<Prisma.SocialMediaCreateArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  data: z.union([ SocialMediaCreateInputSchema,SocialMediaUncheckedCreateInputSchema ]),
}).strict() ;

export const SocialMediaUpsertArgsSchema: z.ZodType<Prisma.SocialMediaUpsertArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
  create: z.union([ SocialMediaCreateInputSchema,SocialMediaUncheckedCreateInputSchema ]),
  update: z.union([ SocialMediaUpdateInputSchema,SocialMediaUncheckedUpdateInputSchema ]),
}).strict() ;

export const SocialMediaCreateManyArgsSchema: z.ZodType<Prisma.SocialMediaCreateManyArgs> = z.object({
  data: z.union([ SocialMediaCreateManyInputSchema,SocialMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SocialMediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SocialMediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ SocialMediaCreateManyInputSchema,SocialMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SocialMediaDeleteArgsSchema: z.ZodType<Prisma.SocialMediaDeleteArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaUpdateArgsSchema: z.ZodType<Prisma.SocialMediaUpdateArgs> = z.object({
  select: SocialMediaSelectSchema.optional(),
  include: SocialMediaIncludeSchema.optional(),
  data: z.union([ SocialMediaUpdateInputSchema,SocialMediaUncheckedUpdateInputSchema ]),
  where: SocialMediaWhereUniqueInputSchema,
}).strict() ;

export const SocialMediaUpdateManyArgsSchema: z.ZodType<Prisma.SocialMediaUpdateManyArgs> = z.object({
  data: z.union([ SocialMediaUpdateManyMutationInputSchema,SocialMediaUncheckedUpdateManyInputSchema ]),
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SocialMediaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SocialMediaUpdateManyMutationInputSchema,SocialMediaUncheckedUpdateManyInputSchema ]),
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SocialMediaDeleteManyArgsSchema: z.ZodType<Prisma.SocialMediaDeleteManyArgs> = z.object({
  where: SocialMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriberCreateArgsSchema: z.ZodType<Prisma.SubscriberCreateArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  data: z.union([ SubscriberCreateInputSchema,SubscriberUncheckedCreateInputSchema ]),
}).strict() ;

export const SubscriberUpsertArgsSchema: z.ZodType<Prisma.SubscriberUpsertArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereUniqueInputSchema,
  create: z.union([ SubscriberCreateInputSchema,SubscriberUncheckedCreateInputSchema ]),
  update: z.union([ SubscriberUpdateInputSchema,SubscriberUncheckedUpdateInputSchema ]),
}).strict() ;

export const SubscriberCreateManyArgsSchema: z.ZodType<Prisma.SubscriberCreateManyArgs> = z.object({
  data: z.union([ SubscriberCreateManyInputSchema,SubscriberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriberCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriberCreateManyInputSchema,SubscriberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriberDeleteArgsSchema: z.ZodType<Prisma.SubscriberDeleteArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  where: SubscriberWhereUniqueInputSchema,
}).strict() ;

export const SubscriberUpdateArgsSchema: z.ZodType<Prisma.SubscriberUpdateArgs> = z.object({
  select: SubscriberSelectSchema.optional(),
  include: SubscriberIncludeSchema.optional(),
  data: z.union([ SubscriberUpdateInputSchema,SubscriberUncheckedUpdateInputSchema ]),
  where: SubscriberWhereUniqueInputSchema,
}).strict() ;

export const SubscriberUpdateManyArgsSchema: z.ZodType<Prisma.SubscriberUpdateManyArgs> = z.object({
  data: z.union([ SubscriberUpdateManyMutationInputSchema,SubscriberUncheckedUpdateManyInputSchema ]),
  where: SubscriberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriberUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriberUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriberUpdateManyMutationInputSchema,SubscriberUncheckedUpdateManyInputSchema ]),
  where: SubscriberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriberDeleteManyArgsSchema: z.ZodType<Prisma.SubscriberDeleteManyArgs> = z.object({
  where: SubscriberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsletterTypeCreateArgsSchema: z.ZodType<Prisma.NewsletterTypeCreateArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  data: z.union([ NewsletterTypeCreateInputSchema,NewsletterTypeUncheckedCreateInputSchema ]),
}).strict() ;

export const NewsletterTypeUpsertArgsSchema: z.ZodType<Prisma.NewsletterTypeUpsertArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereUniqueInputSchema,
  create: z.union([ NewsletterTypeCreateInputSchema,NewsletterTypeUncheckedCreateInputSchema ]),
  update: z.union([ NewsletterTypeUpdateInputSchema,NewsletterTypeUncheckedUpdateInputSchema ]),
}).strict() ;

export const NewsletterTypeCreateManyArgsSchema: z.ZodType<Prisma.NewsletterTypeCreateManyArgs> = z.object({
  data: z.union([ NewsletterTypeCreateManyInputSchema,NewsletterTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsletterTypeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsletterTypeCreateManyAndReturnArgs> = z.object({
  data: z.union([ NewsletterTypeCreateManyInputSchema,NewsletterTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsletterTypeDeleteArgsSchema: z.ZodType<Prisma.NewsletterTypeDeleteArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  where: NewsletterTypeWhereUniqueInputSchema,
}).strict() ;

export const NewsletterTypeUpdateArgsSchema: z.ZodType<Prisma.NewsletterTypeUpdateArgs> = z.object({
  select: NewsletterTypeSelectSchema.optional(),
  include: NewsletterTypeIncludeSchema.optional(),
  data: z.union([ NewsletterTypeUpdateInputSchema,NewsletterTypeUncheckedUpdateInputSchema ]),
  where: NewsletterTypeWhereUniqueInputSchema,
}).strict() ;

export const NewsletterTypeUpdateManyArgsSchema: z.ZodType<Prisma.NewsletterTypeUpdateManyArgs> = z.object({
  data: z.union([ NewsletterTypeUpdateManyMutationInputSchema,NewsletterTypeUncheckedUpdateManyInputSchema ]),
  where: NewsletterTypeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsletterTypeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsletterTypeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NewsletterTypeUpdateManyMutationInputSchema,NewsletterTypeUncheckedUpdateManyInputSchema ]),
  where: NewsletterTypeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsletterTypeDeleteManyArgsSchema: z.ZodType<Prisma.NewsletterTypeDeleteManyArgs> = z.object({
  where: NewsletterTypeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;