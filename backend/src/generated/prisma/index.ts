import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','firstName','lastName','password','phone','bio','image','social','meta','createdAt','updatedAt','deletedAt']);

export const EmailSettingsScalarFieldEnumSchema = z.enum(['id','smtpHost','smtpPort','smtpUser','smtpPassword','fromEmail','fromName','useTLS','createdAt','updatedAt','userId']);

export const AddressScalarFieldEnumSchema = z.enum(['id','street','city','state','zipCode','country','createdAt','updatedAt','deletedAt','userId']);

export const InvitationEmailScalarFieldEnumSchema = z.enum(['id','to','subject','body','status','error','isSeen','newsletterTypeId','createdAt','updatedAt','userId']);

export const SubscriberScalarFieldEnumSchema = z.enum(['id','email','name','phone','createdAt','updatedAt','deletedAt','status','userId','newsletterTypeId']);

export const NewsletterTypeScalarFieldEnumSchema = z.enum(['id','title','description','key','createdAt','updatedAt','deletedAt','status','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const SubscriberStatusSchema = z.enum(['ACTIVE','INACTIVE','UNSUBSCRIBED','BLOCKED']);

export type SubscriberStatusType = `${z.infer<typeof SubscriberStatusSchema>}`

export const NewsletterTypeStatusSchema = z.enum(['ACTIVE','INACTIVE']);

export type NewsletterTypeStatusType = `${z.infer<typeof NewsletterTypeStatusSchema>}`

export const DeliveryStatusSchema = z.enum(['SENT','FAILED','PENDING']);

export type DeliveryStatusType = `${z.infer<typeof DeliveryStatusSchema>}`

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
  social: JsonValueSchema.nullable(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// EMAIL SETTINGS SCHEMA
/////////////////////////////////////////

export const EmailSettingsSchema = z.object({
  id: z.string().uuid(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().nullable(),
  useTLS: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type EmailSettings = z.infer<typeof EmailSettingsSchema>

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

export const AddressSchema = z.object({
  id: z.string().uuid(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  userId: z.string(),
})

export type Address = z.infer<typeof AddressSchema>

/////////////////////////////////////////
// INVITATION EMAIL SCHEMA
/////////////////////////////////////////

export const InvitationEmailSchema = z.object({
  status: DeliveryStatusSchema,
  id: z.string().uuid(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  error: z.string().nullable(),
  isSeen: z.boolean(),
  newsletterTypeId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type InvitationEmail = z.infer<typeof InvitationEmailSchema>

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
  key: z.string(),
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
  address: z.union([z.boolean(),z.lazy(() => AddressArgsSchema)]).optional(),
  subscriber: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeFindManyArgsSchema)]).optional(),
  invitationEmail: z.union([z.boolean(),z.lazy(() => InvitationEmailFindManyArgsSchema)]).optional(),
  emailSettings: z.union([z.boolean(),z.lazy(() => EmailSettingsArgsSchema)]).optional(),
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
  invitationEmail: z.boolean().optional(),
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
  social: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressArgsSchema)]).optional(),
  subscriber: z.union([z.boolean(),z.lazy(() => SubscriberFindManyArgsSchema)]).optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeFindManyArgsSchema)]).optional(),
  invitationEmail: z.union([z.boolean(),z.lazy(() => InvitationEmailFindManyArgsSchema)]).optional(),
  emailSettings: z.union([z.boolean(),z.lazy(() => EmailSettingsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMAIL SETTINGS
//------------------------------------------------------

export const EmailSettingsIncludeSchema: z.ZodType<Prisma.EmailSettingsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const EmailSettingsArgsSchema: z.ZodType<Prisma.EmailSettingsDefaultArgs> = z.object({
  select: z.lazy(() => EmailSettingsSelectSchema).optional(),
  include: z.lazy(() => EmailSettingsIncludeSchema).optional(),
}).strict();

export const EmailSettingsSelectSchema: z.ZodType<Prisma.EmailSettingsSelect> = z.object({
  id: z.boolean().optional(),
  smtpHost: z.boolean().optional(),
  smtpPort: z.boolean().optional(),
  smtpUser: z.boolean().optional(),
  smtpPassword: z.boolean().optional(),
  fromEmail: z.boolean().optional(),
  fromName: z.boolean().optional(),
  useTLS: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ADDRESS
//------------------------------------------------------

export const AddressIncludeSchema: z.ZodType<Prisma.AddressInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AddressArgsSchema: z.ZodType<Prisma.AddressDefaultArgs> = z.object({
  select: z.lazy(() => AddressSelectSchema).optional(),
  include: z.lazy(() => AddressIncludeSchema).optional(),
}).strict();

export const AddressSelectSchema: z.ZodType<Prisma.AddressSelect> = z.object({
  id: z.boolean().optional(),
  street: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  country: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INVITATION EMAIL
//------------------------------------------------------

export const InvitationEmailIncludeSchema: z.ZodType<Prisma.InvitationEmailInclude> = z.object({
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InvitationEmailArgsSchema: z.ZodType<Prisma.InvitationEmailDefaultArgs> = z.object({
  select: z.lazy(() => InvitationEmailSelectSchema).optional(),
  include: z.lazy(() => InvitationEmailIncludeSchema).optional(),
}).strict();

export const InvitationEmailSelectSchema: z.ZodType<Prisma.InvitationEmailSelect> = z.object({
  id: z.boolean().optional(),
  to: z.boolean().optional(),
  subject: z.boolean().optional(),
  body: z.boolean().optional(),
  status: z.boolean().optional(),
  error: z.boolean().optional(),
  isSeen: z.boolean().optional(),
  newsletterTypeId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  newsletterType: z.union([z.boolean(),z.lazy(() => NewsletterTypeArgsSchema)]).optional(),
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
  invitationEmails: z.union([z.boolean(),z.lazy(() => InvitationEmailFindManyArgsSchema)]).optional(),
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
  invitationEmails: z.boolean().optional(),
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
  invitationEmails: z.union([z.boolean(),z.lazy(() => InvitationEmailFindManyArgsSchema)]).optional(),
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
  social: z.lazy(() => JsonNullableFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  address: z.union([ z.lazy(() => AddressNullableScalarRelationFilterSchema),z.lazy(() => AddressWhereInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeListRelationFilterSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailListRelationFilterSchema).optional(),
  emailSettings: z.union([ z.lazy(() => EmailSettingsNullableScalarRelationFilterSchema),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional().nullable(),
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
  social: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.lazy(() => AddressOrderByWithRelationInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberOrderByRelationAggregateInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeOrderByRelationAggregateInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailOrderByRelationAggregateInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsOrderByWithRelationInputSchema).optional()
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
  social: z.lazy(() => JsonNullableFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  address: z.union([ z.lazy(() => AddressNullableScalarRelationFilterSchema),z.lazy(() => AddressWhereInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeListRelationFilterSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailListRelationFilterSchema).optional(),
  emailSettings: z.union([ z.lazy(() => EmailSettingsNullableScalarRelationFilterSchema),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional().nullable(),
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
  social: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  social: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EmailSettingsWhereInputSchema: z.ZodType<Prisma.EmailSettingsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailSettingsWhereInputSchema),z.lazy(() => EmailSettingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailSettingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailSettingsWhereInputSchema),z.lazy(() => EmailSettingsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  smtpHost: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  smtpPort: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  smtpUser: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  smtpPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  useTLS: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const EmailSettingsOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailSettingsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  smtpHost: z.lazy(() => SortOrderSchema).optional(),
  smtpPort: z.lazy(() => SortOrderSchema).optional(),
  smtpUser: z.lazy(() => SortOrderSchema).optional(),
  smtpPassword: z.lazy(() => SortOrderSchema).optional(),
  fromEmail: z.lazy(() => SortOrderSchema).optional(),
  fromName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  useTLS: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const EmailSettingsWhereUniqueInputSchema: z.ZodType<Prisma.EmailSettingsWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => EmailSettingsWhereInputSchema),z.lazy(() => EmailSettingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailSettingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailSettingsWhereInputSchema),z.lazy(() => EmailSettingsWhereInputSchema).array() ]).optional(),
  smtpHost: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  smtpPort: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  smtpUser: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  smtpPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromEmail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  useTLS: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const EmailSettingsOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailSettingsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  smtpHost: z.lazy(() => SortOrderSchema).optional(),
  smtpPort: z.lazy(() => SortOrderSchema).optional(),
  smtpUser: z.lazy(() => SortOrderSchema).optional(),
  smtpPassword: z.lazy(() => SortOrderSchema).optional(),
  fromEmail: z.lazy(() => SortOrderSchema).optional(),
  fromName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  useTLS: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailSettingsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EmailSettingsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailSettingsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailSettingsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EmailSettingsSumOrderByAggregateInputSchema).optional()
}).strict();

export const EmailSettingsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailSettingsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailSettingsScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailSettingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailSettingsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailSettingsScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailSettingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  smtpHost: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  smtpPort: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  smtpUser: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  smtpPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fromEmail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fromName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  useTLS: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AddressWhereInputSchema: z.ZodType<Prisma.AddressWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  zipCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AddressOrderByWithRelationInputSchema: z.ZodType<Prisma.AddressOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AddressWhereUniqueInputSchema: z.ZodType<Prisma.AddressWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  street: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  zipCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AddressOrderByWithAggregationInputSchema: z.ZodType<Prisma.AddressOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AddressCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AddressMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AddressMinOrderByAggregateInputSchema).optional()
}).strict();

export const AddressScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AddressScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AddressScalarWhereWithAggregatesInputSchema),z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressScalarWhereWithAggregatesInputSchema),z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  zipCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const InvitationEmailWhereInputSchema: z.ZodType<Prisma.InvitationEmailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationEmailWhereInputSchema),z.lazy(() => InvitationEmailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationEmailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationEmailWhereInputSchema),z.lazy(() => InvitationEmailWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumDeliveryStatusFilterSchema),z.lazy(() => DeliveryStatusSchema) ]).optional(),
  error: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  newsletterType: z.union([ z.lazy(() => NewsletterTypeNullableScalarRelationFilterSchema),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const InvitationEmailOrderByWithRelationInputSchema: z.ZodType<Prisma.InvitationEmailOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  error: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const InvitationEmailWhereUniqueInputSchema: z.ZodType<Prisma.InvitationEmailWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => InvitationEmailWhereInputSchema),z.lazy(() => InvitationEmailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationEmailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationEmailWhereInputSchema),z.lazy(() => InvitationEmailWhereInputSchema).array() ]).optional(),
  to: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumDeliveryStatusFilterSchema),z.lazy(() => DeliveryStatusSchema) ]).optional(),
  error: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  newsletterType: z.union([ z.lazy(() => NewsletterTypeNullableScalarRelationFilterSchema),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const InvitationEmailOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationEmailOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  error: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvitationEmailCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationEmailMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationEmailMinOrderByAggregateInputSchema).optional()
}).strict();

export const InvitationEmailScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvitationEmailScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationEmailScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationEmailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationEmailScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationEmailScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationEmailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumDeliveryStatusWithAggregatesFilterSchema),z.lazy(() => DeliveryStatusSchema) ]).optional(),
  error: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isSeen: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailListRelationFilterSchema).optional()
}).strict();

export const NewsletterTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.NewsletterTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberOrderByRelationAggregateInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailOrderByRelationAggregateInputSchema).optional()
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
  subscribers: z.lazy(() => SubscriberListRelationFilterSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailListRelationFilterSchema).optional()
}).strict());

export const NewsletterTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NewsletterTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
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
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsCreateNestedOneWithoutUserInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUpdateOneWithoutUserNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EmailSettingsCreateInputSchema: z.ZodType<Prisma.EmailSettingsCreateInput> = z.object({
  id: z.string().uuid().optional(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional().nullable(),
  useTLS: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEmailSettingsInputSchema)
}).strict();

export const EmailSettingsUncheckedCreateInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional().nullable(),
  useTLS: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const EmailSettingsUpdateInputSchema: z.ZodType<Prisma.EmailSettingsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEmailSettingsNestedInputSchema).optional()
}).strict();

export const EmailSettingsUncheckedUpdateInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailSettingsCreateManyInputSchema: z.ZodType<Prisma.EmailSettingsCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional().nullable(),
  useTLS: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const EmailSettingsUpdateManyMutationInputSchema: z.ZodType<Prisma.EmailSettingsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailSettingsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressCreateInputSchema: z.ZodType<Prisma.AddressCreateInput> = z.object({
  id: z.string().uuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema)
}).strict();

export const AddressUncheckedCreateInputSchema: z.ZodType<Prisma.AddressUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  userId: z.string()
}).strict();

export const AddressUpdateInputSchema: z.ZodType<Prisma.AddressUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressCreateManyInputSchema: z.ZodType<Prisma.AddressCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  userId: z.string()
}).strict();

export const AddressUpdateManyMutationInputSchema: z.ZodType<Prisma.AddressUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AddressUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailCreateInputSchema: z.ZodType<Prisma.InvitationEmailCreateInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedOneWithoutInvitationEmailsInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationEmailInputSchema)
}).strict();

export const InvitationEmailUncheckedCreateInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  newsletterTypeId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const InvitationEmailUpdateInputSchema: z.ZodType<Prisma.InvitationEmailUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateOneWithoutInvitationEmailsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationEmailNestedInputSchema).optional()
}).strict();

export const InvitationEmailUncheckedUpdateInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailCreateManyInputSchema: z.ZodType<Prisma.InvitationEmailCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  newsletterTypeId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const InvitationEmailUpdateManyMutationInputSchema: z.ZodType<Prisma.InvitationEmailUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsletterTypeInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUpdateInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutNewsletterTypeNestedInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeCreateManyInputSchema: z.ZodType<Prisma.NewsletterTypeCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
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
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsletterTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
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

export const AddressNullableScalarRelationFilterSchema: z.ZodType<Prisma.AddressNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AddressWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AddressWhereInputSchema).optional().nullable()
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

export const InvitationEmailListRelationFilterSchema: z.ZodType<Prisma.InvitationEmailListRelationFilter> = z.object({
  every: z.lazy(() => InvitationEmailWhereInputSchema).optional(),
  some: z.lazy(() => InvitationEmailWhereInputSchema).optional(),
  none: z.lazy(() => InvitationEmailWhereInputSchema).optional()
}).strict();

export const EmailSettingsNullableScalarRelationFilterSchema: z.ZodType<Prisma.EmailSettingsNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailSettingsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EmailSettingsWhereInputSchema).optional().nullable()
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

export const InvitationEmailOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationEmailOrderByRelationAggregateInput> = z.object({
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
  social: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
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

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
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

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const EmailSettingsCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailSettingsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  smtpHost: z.lazy(() => SortOrderSchema).optional(),
  smtpPort: z.lazy(() => SortOrderSchema).optional(),
  smtpUser: z.lazy(() => SortOrderSchema).optional(),
  smtpPassword: z.lazy(() => SortOrderSchema).optional(),
  fromEmail: z.lazy(() => SortOrderSchema).optional(),
  fromName: z.lazy(() => SortOrderSchema).optional(),
  useTLS: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailSettingsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EmailSettingsAvgOrderByAggregateInput> = z.object({
  smtpPort: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailSettingsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailSettingsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  smtpHost: z.lazy(() => SortOrderSchema).optional(),
  smtpPort: z.lazy(() => SortOrderSchema).optional(),
  smtpUser: z.lazy(() => SortOrderSchema).optional(),
  smtpPassword: z.lazy(() => SortOrderSchema).optional(),
  fromEmail: z.lazy(() => SortOrderSchema).optional(),
  fromName: z.lazy(() => SortOrderSchema).optional(),
  useTLS: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailSettingsMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmailSettingsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  smtpHost: z.lazy(() => SortOrderSchema).optional(),
  smtpPort: z.lazy(() => SortOrderSchema).optional(),
  smtpUser: z.lazy(() => SortOrderSchema).optional(),
  smtpPassword: z.lazy(() => SortOrderSchema).optional(),
  fromEmail: z.lazy(() => SortOrderSchema).optional(),
  fromName: z.lazy(() => SortOrderSchema).optional(),
  useTLS: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailSettingsSumOrderByAggregateInputSchema: z.ZodType<Prisma.EmailSettingsSumOrderByAggregateInput> = z.object({
  smtpPort: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const AddressCountOrderByAggregateInputSchema: z.ZodType<Prisma.AddressCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AddressMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AddressMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AddressMinOrderByAggregateInputSchema: z.ZodType<Prisma.AddressMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDeliveryStatusFilterSchema: z.ZodType<Prisma.EnumDeliveryStatusFilter> = z.object({
  equals: z.lazy(() => DeliveryStatusSchema).optional(),
  in: z.lazy(() => DeliveryStatusSchema).array().optional(),
  notIn: z.lazy(() => DeliveryStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => NestedEnumDeliveryStatusFilterSchema) ]).optional(),
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

export const NewsletterTypeNullableScalarRelationFilterSchema: z.ZodType<Prisma.NewsletterTypeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NewsletterTypeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NewsletterTypeWhereInputSchema).optional().nullable()
}).strict();

export const InvitationEmailCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationEmailCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  error: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationEmailMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationEmailMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  error: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationEmailMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationEmailMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  error: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  newsletterTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDeliveryStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDeliveryStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DeliveryStatusSchema).optional(),
  in: z.lazy(() => DeliveryStatusSchema).array().optional(),
  notIn: z.lazy(() => DeliveryStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => NestedEnumDeliveryStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryStatusFilterSchema).optional()
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

export const EnumSubscriberStatusFilterSchema: z.ZodType<Prisma.EnumSubscriberStatusFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusFilterSchema) ]).optional(),
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
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

export const AddressCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional()
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

export const InvitationEmailCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmailSettingsCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailSettingsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EmailSettingsWhereUniqueInputSchema).optional()
}).strict();

export const AddressUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional()
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

export const InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailSettingsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EmailSettingsWhereUniqueInputSchema).optional()
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

export const AddressUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AddressUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AddressUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AddressWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AddressWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AddressUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]).optional(),
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

export const InvitationEmailUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvitationEmailUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmailSettingsUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EmailSettingsUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailSettingsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EmailSettingsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmailSettingsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailSettingsUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EmailSettingsUpdateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AddressUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AddressUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AddressWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AddressWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AddressUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]).optional(),
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

export const InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailSettingsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EmailSettingsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmailSettingsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmailSettingsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailSettingsUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EmailSettingsUpdateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEmailSettingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmailSettingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEmailSettingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutEmailSettingsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEmailSettingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmailSettingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEmailSettingsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEmailSettingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEmailSettingsInputSchema),z.lazy(() => UserUpdateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmailSettingsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAddressNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAddressInputSchema),z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]).optional(),
}).strict();

export const NewsletterTypeCreateNestedOneWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeCreateNestedOneWithoutInvitationEmailsInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutInvitationEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsletterTypeCreateOrConnectWithoutInvitationEmailsInputSchema).optional(),
  connect: z.lazy(() => NewsletterTypeWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationEmailInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationEmailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationEmailInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumDeliveryStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDeliveryStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DeliveryStatusSchema).optional()
}).strict();

export const NewsletterTypeUpdateOneWithoutInvitationEmailsNestedInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateOneWithoutInvitationEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutInvitationEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NewsletterTypeCreateOrConnectWithoutInvitationEmailsInputSchema).optional(),
  upsert: z.lazy(() => NewsletterTypeUpsertWithoutInvitationEmailsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NewsletterTypeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NewsletterTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NewsletterTypeUpdateToOneWithWhereWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUpdateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutInvitationEmailsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutInvitationEmailNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationEmailNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationEmailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationEmailInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitationEmailInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitationEmailInputSchema),z.lazy(() => UserUpdateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationEmailInputSchema) ]).optional(),
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

export const InvitationEmailCreateNestedManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailCreateNestedManyWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => SubscriberCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriberCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriberWhereUniqueInputSchema),z.lazy(() => SubscriberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationEmailUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedCreateNestedManyWithoutNewsletterTypeInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
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

export const InvitationEmailUpdateManyWithoutNewsletterTypeNestedInputSchema: z.ZodType<Prisma.InvitationEmailUpdateManyWithoutNewsletterTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
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

export const InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema).array(),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationEmailWhereUniqueInputSchema),z.lazy(() => InvitationEmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
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

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
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

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumDeliveryStatusFilterSchema: z.ZodType<Prisma.NestedEnumDeliveryStatusFilter> = z.object({
  equals: z.lazy(() => DeliveryStatusSchema).optional(),
  in: z.lazy(() => DeliveryStatusSchema).array().optional(),
  notIn: z.lazy(() => DeliveryStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => NestedEnumDeliveryStatusFilterSchema) ]).optional(),
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

export const NestedEnumDeliveryStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDeliveryStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DeliveryStatusSchema).optional(),
  in: z.lazy(() => DeliveryStatusSchema).array().optional(),
  notIn: z.lazy(() => DeliveryStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => NestedEnumDeliveryStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryStatusFilterSchema).optional()
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

export const NestedEnumSubscriberStatusFilterSchema: z.ZodType<Prisma.NestedEnumSubscriberStatusFilter> = z.object({
  equals: z.lazy(() => SubscriberStatusSchema).optional(),
  in: z.lazy(() => SubscriberStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriberStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriberStatusSchema),z.lazy(() => NestedEnumSubscriberStatusFilterSchema) ]).optional(),
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

export const AddressCreateWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AddressUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AddressCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]),
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
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  subscribers: z.lazy(() => SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  subscribers: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutUserInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NewsletterTypeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NewsletterTypeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NewsletterTypeCreateManyUserInputSchema),z.lazy(() => NewsletterTypeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvitationEmailCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedOneWithoutInvitationEmailsInputSchema).optional()
}).strict();

export const InvitationEmailUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  newsletterTypeId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvitationEmailCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InvitationEmailCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.InvitationEmailCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationEmailCreateManyUserInputSchema),z.lazy(() => InvitationEmailCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EmailSettingsCreateWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional().nullable(),
  useTLS: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EmailSettingsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  smtpHost: z.string(),
  smtpPort: z.number().int(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  fromEmail: z.string(),
  fromName: z.string().optional().nullable(),
  useTLS: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EmailSettingsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EmailSettingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AddressUpsertWithoutUserInputSchema: z.ZodType<Prisma.AddressUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => AddressWhereInputSchema).optional()
}).strict();

export const AddressUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AddressWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AddressUpdateWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AddressUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zipCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumNewsletterTypeStatusFilterSchema),z.lazy(() => NewsletterTypeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const InvitationEmailUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InvitationEmailUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationEmailUpdateWithoutUserInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const InvitationEmailUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationEmailScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationEmailUpdateManyMutationInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const InvitationEmailScalarWhereInputSchema: z.ZodType<Prisma.InvitationEmailScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationEmailScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationEmailScalarWhereInputSchema),z.lazy(() => InvitationEmailScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumDeliveryStatusFilterSchema),z.lazy(() => DeliveryStatusSchema) ]).optional(),
  error: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  newsletterTypeId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const EmailSettingsUpsertWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => EmailSettingsUpdateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EmailSettingsCreateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => EmailSettingsWhereInputSchema).optional()
}).strict();

export const EmailSettingsUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EmailSettingsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailSettingsUpdateWithoutUserInputSchema),z.lazy(() => EmailSettingsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EmailSettingsUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailSettingsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmailSettingsUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpHost: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  smtpUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  smtpPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromEmail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  useTLS: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserCreateWithoutEmailSettingsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEmailSettingsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEmailSettingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmailSettingsInputSchema) ]),
}).strict();

export const UserUpsertWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserUpsertWithoutEmailSettingsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmailSettingsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmailSettingsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEmailSettingsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEmailSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmailSettingsInputSchema) ]),
}).strict();

export const UserUpdateWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserUpdateWithoutEmailSettingsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEmailSettingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEmailSettingsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateWithoutAddressInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAddressInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const UserUpsertWithoutAddressInputSchema: z.ZodType<Prisma.UserUpsertWithoutAddressInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]),
}).strict();

export const UserUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const NewsletterTypeCreateWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeCreateWithoutInvitationEmailsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsletterTypeInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateWithoutInvitationEmailsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeCreateOrConnectWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeCreateOrConnectWithoutInvitationEmailsInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutInvitationEmailsInputSchema) ]),
}).strict();

export const UserCreateWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitationEmailInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationEmailInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationEmailInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationEmailInputSchema) ]),
}).strict();

export const NewsletterTypeUpsertWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeUpsertWithoutInvitationEmailsInput> = z.object({
  update: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutInvitationEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => NewsletterTypeCreateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedCreateWithoutInvitationEmailsInputSchema) ]),
  where: z.lazy(() => NewsletterTypeWhereInputSchema).optional()
}).strict();

export const NewsletterTypeUpdateToOneWithWhereWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateToOneWithWhereWithoutInvitationEmailsInput> = z.object({
  where: z.lazy(() => NewsletterTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NewsletterTypeUpdateWithoutInvitationEmailsInputSchema),z.lazy(() => NewsletterTypeUncheckedUpdateWithoutInvitationEmailsInputSchema) ]),
}).strict();

export const NewsletterTypeUpdateWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeUpdateWithoutInvitationEmailsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutNewsletterTypeNestedInputSchema).optional(),
  subscribers: z.lazy(() => SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateWithoutInvitationEmailsInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateWithoutInvitationEmailsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subscribers: z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationEmailInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationEmailInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationEmailInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationEmailInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitationEmailInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationEmailInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitationEmailInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitationEmailInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitationEmailInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressCreateNestedOneWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsCreateNestedOneWithoutUserInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSubscriberInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriberInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriberInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriberInputSchema) ]),
}).strict();

export const NewsletterTypeCreateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeCreateWithoutSubscribersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsletterTypeInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedCreateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedCreateWithoutSubscribersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional(),
  userId: z.string().optional().nullable(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutNewsletterTypeInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUpdateOneWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUpdateOneWithoutUserNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
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
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutNewsletterTypeNestedInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateWithoutSubscribersInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateWithoutSubscribersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsCreateNestedOneWithoutUserInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  address: z.lazy(() => AddressUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
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

export const InvitationEmailCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationEmailInputSchema)
}).strict();

export const InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedCreateWithoutNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const InvitationEmailCreateOrConnectWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailCreateOrConnectWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const InvitationEmailCreateManyNewsletterTypeInputEnvelopeSchema: z.ZodType<Prisma.InvitationEmailCreateManyNewsletterTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputSchema),z.lazy(() => InvitationEmailCreateManyNewsletterTypeInputSchema).array() ]),
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUpdateOneWithoutUserNestedInputSchema).optional()
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
  social: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriber: z.lazy(() => SubscriberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitationEmail: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  emailSettings: z.lazy(() => EmailSettingsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
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

export const InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUpsertWithWhereUniqueWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationEmailUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationEmailCreateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedCreateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUpdateWithWhereUniqueWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => InvitationEmailWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationEmailUpdateWithoutNewsletterTypeInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateWithoutNewsletterTypeInputSchema) ]),
}).strict();

export const InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUpdateManyWithWhereWithoutNewsletterTypeInput> = z.object({
  where: z.lazy(() => InvitationEmailScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationEmailUpdateManyMutationInputSchema),z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeInputSchema) ]),
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
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => NewsletterTypeStatusSchema).optional()
}).strict();

export const InvitationEmailCreateManyUserInputSchema: z.ZodType<Prisma.InvitationEmailCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  newsletterTypeId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
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
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  subscribers: z.lazy(() => SubscriberUpdateManyWithoutNewsletterTypeNestedInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  subscribers: z.lazy(() => SubscriberUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional(),
  invitationEmails: z.lazy(() => InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeNestedInputSchema).optional()
}).strict();

export const NewsletterTypeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NewsletterTypeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => NewsletterTypeStatusSchema),z.lazy(() => EnumNewsletterTypeStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailUpdateWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterType: z.lazy(() => NewsletterTypeUpdateOneWithoutInvitationEmailsNestedInputSchema).optional()
}).strict();

export const InvitationEmailUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  newsletterTypeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const InvitationEmailCreateManyNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailCreateManyNewsletterTypeInput> = z.object({
  id: z.string().uuid().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => DeliveryStatusSchema),
  error: z.string().optional().nullable(),
  isSeen: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
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

export const InvitationEmailUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationEmailNestedInputSchema).optional()
}).strict();

export const InvitationEmailUncheckedUpdateWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeInputSchema: z.ZodType<Prisma.InvitationEmailUncheckedUpdateManyWithoutNewsletterTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DeliveryStatusSchema),z.lazy(() => EnumDeliveryStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EmailSettingsFindFirstArgsSchema: z.ZodType<Prisma.EmailSettingsFindFirstArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereInputSchema.optional(),
  orderBy: z.union([ EmailSettingsOrderByWithRelationInputSchema.array(),EmailSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailSettingsScalarFieldEnumSchema,EmailSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailSettingsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailSettingsFindFirstOrThrowArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereInputSchema.optional(),
  orderBy: z.union([ EmailSettingsOrderByWithRelationInputSchema.array(),EmailSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailSettingsScalarFieldEnumSchema,EmailSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailSettingsFindManyArgsSchema: z.ZodType<Prisma.EmailSettingsFindManyArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereInputSchema.optional(),
  orderBy: z.union([ EmailSettingsOrderByWithRelationInputSchema.array(),EmailSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailSettingsScalarFieldEnumSchema,EmailSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailSettingsAggregateArgsSchema: z.ZodType<Prisma.EmailSettingsAggregateArgs> = z.object({
  where: EmailSettingsWhereInputSchema.optional(),
  orderBy: z.union([ EmailSettingsOrderByWithRelationInputSchema.array(),EmailSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailSettingsGroupByArgsSchema: z.ZodType<Prisma.EmailSettingsGroupByArgs> = z.object({
  where: EmailSettingsWhereInputSchema.optional(),
  orderBy: z.union([ EmailSettingsOrderByWithAggregationInputSchema.array(),EmailSettingsOrderByWithAggregationInputSchema ]).optional(),
  by: EmailSettingsScalarFieldEnumSchema.array(),
  having: EmailSettingsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailSettingsFindUniqueArgsSchema: z.ZodType<Prisma.EmailSettingsFindUniqueArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereUniqueInputSchema,
}).strict() ;

export const EmailSettingsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmailSettingsFindUniqueOrThrowArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereUniqueInputSchema,
}).strict() ;

export const AddressFindFirstArgsSchema: z.ZodType<Prisma.AddressFindFirstArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AddressFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AddressFindFirstOrThrowArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AddressFindManyArgsSchema: z.ZodType<Prisma.AddressFindManyArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AddressAggregateArgsSchema: z.ZodType<Prisma.AddressAggregateArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AddressGroupByArgsSchema: z.ZodType<Prisma.AddressGroupByArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithAggregationInputSchema.array(),AddressOrderByWithAggregationInputSchema ]).optional(),
  by: AddressScalarFieldEnumSchema.array(),
  having: AddressScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AddressFindUniqueArgsSchema: z.ZodType<Prisma.AddressFindUniqueArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict() ;

export const AddressFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AddressFindUniqueOrThrowArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict() ;

export const InvitationEmailFindFirstArgsSchema: z.ZodType<Prisma.InvitationEmailFindFirstArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereInputSchema.optional(),
  orderBy: z.union([ InvitationEmailOrderByWithRelationInputSchema.array(),InvitationEmailOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationEmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationEmailScalarFieldEnumSchema,InvitationEmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationEmailFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationEmailFindFirstOrThrowArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereInputSchema.optional(),
  orderBy: z.union([ InvitationEmailOrderByWithRelationInputSchema.array(),InvitationEmailOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationEmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationEmailScalarFieldEnumSchema,InvitationEmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationEmailFindManyArgsSchema: z.ZodType<Prisma.InvitationEmailFindManyArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereInputSchema.optional(),
  orderBy: z.union([ InvitationEmailOrderByWithRelationInputSchema.array(),InvitationEmailOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationEmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationEmailScalarFieldEnumSchema,InvitationEmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationEmailAggregateArgsSchema: z.ZodType<Prisma.InvitationEmailAggregateArgs> = z.object({
  where: InvitationEmailWhereInputSchema.optional(),
  orderBy: z.union([ InvitationEmailOrderByWithRelationInputSchema.array(),InvitationEmailOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationEmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationEmailGroupByArgsSchema: z.ZodType<Prisma.InvitationEmailGroupByArgs> = z.object({
  where: InvitationEmailWhereInputSchema.optional(),
  orderBy: z.union([ InvitationEmailOrderByWithAggregationInputSchema.array(),InvitationEmailOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationEmailScalarFieldEnumSchema.array(),
  having: InvitationEmailScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationEmailFindUniqueArgsSchema: z.ZodType<Prisma.InvitationEmailFindUniqueArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereUniqueInputSchema,
}).strict() ;

export const InvitationEmailFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvitationEmailFindUniqueOrThrowArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereUniqueInputSchema,
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

export const EmailSettingsCreateArgsSchema: z.ZodType<Prisma.EmailSettingsCreateArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  data: z.union([ EmailSettingsCreateInputSchema,EmailSettingsUncheckedCreateInputSchema ]),
}).strict() ;

export const EmailSettingsUpsertArgsSchema: z.ZodType<Prisma.EmailSettingsUpsertArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereUniqueInputSchema,
  create: z.union([ EmailSettingsCreateInputSchema,EmailSettingsUncheckedCreateInputSchema ]),
  update: z.union([ EmailSettingsUpdateInputSchema,EmailSettingsUncheckedUpdateInputSchema ]),
}).strict() ;

export const EmailSettingsCreateManyArgsSchema: z.ZodType<Prisma.EmailSettingsCreateManyArgs> = z.object({
  data: z.union([ EmailSettingsCreateManyInputSchema,EmailSettingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailSettingsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailSettingsCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailSettingsCreateManyInputSchema,EmailSettingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailSettingsDeleteArgsSchema: z.ZodType<Prisma.EmailSettingsDeleteArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  where: EmailSettingsWhereUniqueInputSchema,
}).strict() ;

export const EmailSettingsUpdateArgsSchema: z.ZodType<Prisma.EmailSettingsUpdateArgs> = z.object({
  select: EmailSettingsSelectSchema.optional(),
  include: EmailSettingsIncludeSchema.optional(),
  data: z.union([ EmailSettingsUpdateInputSchema,EmailSettingsUncheckedUpdateInputSchema ]),
  where: EmailSettingsWhereUniqueInputSchema,
}).strict() ;

export const EmailSettingsUpdateManyArgsSchema: z.ZodType<Prisma.EmailSettingsUpdateManyArgs> = z.object({
  data: z.union([ EmailSettingsUpdateManyMutationInputSchema,EmailSettingsUncheckedUpdateManyInputSchema ]),
  where: EmailSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmailSettingsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailSettingsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailSettingsUpdateManyMutationInputSchema,EmailSettingsUncheckedUpdateManyInputSchema ]),
  where: EmailSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmailSettingsDeleteManyArgsSchema: z.ZodType<Prisma.EmailSettingsDeleteManyArgs> = z.object({
  where: EmailSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AddressCreateArgsSchema: z.ZodType<Prisma.AddressCreateArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  data: z.union([ AddressCreateInputSchema,AddressUncheckedCreateInputSchema ]),
}).strict() ;

export const AddressUpsertArgsSchema: z.ZodType<Prisma.AddressUpsertArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
  create: z.union([ AddressCreateInputSchema,AddressUncheckedCreateInputSchema ]),
  update: z.union([ AddressUpdateInputSchema,AddressUncheckedUpdateInputSchema ]),
}).strict() ;

export const AddressCreateManyArgsSchema: z.ZodType<Prisma.AddressCreateManyArgs> = z.object({
  data: z.union([ AddressCreateManyInputSchema,AddressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AddressCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AddressCreateManyAndReturnArgs> = z.object({
  data: z.union([ AddressCreateManyInputSchema,AddressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AddressDeleteArgsSchema: z.ZodType<Prisma.AddressDeleteArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict() ;

export const AddressUpdateArgsSchema: z.ZodType<Prisma.AddressUpdateArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  data: z.union([ AddressUpdateInputSchema,AddressUncheckedUpdateInputSchema ]),
  where: AddressWhereUniqueInputSchema,
}).strict() ;

export const AddressUpdateManyArgsSchema: z.ZodType<Prisma.AddressUpdateManyArgs> = z.object({
  data: z.union([ AddressUpdateManyMutationInputSchema,AddressUncheckedUpdateManyInputSchema ]),
  where: AddressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AddressUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AddressUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AddressUpdateManyMutationInputSchema,AddressUncheckedUpdateManyInputSchema ]),
  where: AddressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AddressDeleteManyArgsSchema: z.ZodType<Prisma.AddressDeleteManyArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InvitationEmailCreateArgsSchema: z.ZodType<Prisma.InvitationEmailCreateArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  data: z.union([ InvitationEmailCreateInputSchema,InvitationEmailUncheckedCreateInputSchema ]),
}).strict() ;

export const InvitationEmailUpsertArgsSchema: z.ZodType<Prisma.InvitationEmailUpsertArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereUniqueInputSchema,
  create: z.union([ InvitationEmailCreateInputSchema,InvitationEmailUncheckedCreateInputSchema ]),
  update: z.union([ InvitationEmailUpdateInputSchema,InvitationEmailUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvitationEmailCreateManyArgsSchema: z.ZodType<Prisma.InvitationEmailCreateManyArgs> = z.object({
  data: z.union([ InvitationEmailCreateManyInputSchema,InvitationEmailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvitationEmailCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvitationEmailCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvitationEmailCreateManyInputSchema,InvitationEmailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvitationEmailDeleteArgsSchema: z.ZodType<Prisma.InvitationEmailDeleteArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  where: InvitationEmailWhereUniqueInputSchema,
}).strict() ;

export const InvitationEmailUpdateArgsSchema: z.ZodType<Prisma.InvitationEmailUpdateArgs> = z.object({
  select: InvitationEmailSelectSchema.optional(),
  include: InvitationEmailIncludeSchema.optional(),
  data: z.union([ InvitationEmailUpdateInputSchema,InvitationEmailUncheckedUpdateInputSchema ]),
  where: InvitationEmailWhereUniqueInputSchema,
}).strict() ;

export const InvitationEmailUpdateManyArgsSchema: z.ZodType<Prisma.InvitationEmailUpdateManyArgs> = z.object({
  data: z.union([ InvitationEmailUpdateManyMutationInputSchema,InvitationEmailUncheckedUpdateManyInputSchema ]),
  where: InvitationEmailWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InvitationEmailUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InvitationEmailUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InvitationEmailUpdateManyMutationInputSchema,InvitationEmailUncheckedUpdateManyInputSchema ]),
  where: InvitationEmailWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InvitationEmailDeleteManyArgsSchema: z.ZodType<Prisma.InvitationEmailDeleteManyArgs> = z.object({
  where: InvitationEmailWhereInputSchema.optional(),
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