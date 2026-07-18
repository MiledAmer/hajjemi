
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * Account shared by both roles. Auth strategy (NextAuth, custom JWT, etc.)
 * is intentionally not modeled here — this repo has no auth wired up yet
 * (see CLAUDE.md); bolt the provider-specific tables on separately once
 * that's decided instead of guessing now.
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model BarberProfile
 * One-to-one extension of User for the BARBER role — the shop's public
 * profile plus everything needed to run it (services, hours, bookings,
 * subscription).
 */
export type BarberProfile = $Result.DefaultSelection<Prisma.$BarberProfilePayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model BarberAvailability
 * A recurring weekly opening window. Deliberately simple (one row per
 * day/range) rather than a full exception calendar — split/holiday hours
 * can be layered on later if the product needs them.
 */
export type BarberAvailability = $Result.DefaultSelection<Prisma.$BarberAvailabilityPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model AppointmentService
 * Explicit many-to-many join between Appointment and Service (an
 * appointment usually bundles several services, as in the profile
 * screen's multi-select booking flow). Line items snapshot name/price/
 * duration so appointment history stays accurate even if the underlying
 * Service is later edited or removed.
 */
export type AppointmentService = $Result.DefaultSelection<Prisma.$AppointmentServicePayload>
/**
 * Model Review
 * One review per appointment, written by the client after the fact.
 * barberId is denormalized from appointment.barberId so "all reviews for
 * this barber" doesn't require joining through Appointment.
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Subscription
 * Plan history/billing record for a barber. Kept separate from
 * BarberProfile.planType so upgrades/downgrades/cancellations have an
 * audit trail instead of overwriting a single column.
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  CLIENT: 'CLIENT',
  BARBER: 'BARBER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Governorate: {
  TUNIS: 'TUNIS',
  ARIANA: 'ARIANA',
  BEN_AROUS: 'BEN_AROUS',
  MANOUBA: 'MANOUBA',
  NABEUL: 'NABEUL',
  ZAGHOUAN: 'ZAGHOUAN',
  BIZERTE: 'BIZERTE',
  BEJA: 'BEJA',
  JENDOUBA: 'JENDOUBA',
  KEF: 'KEF',
  SILIANA: 'SILIANA',
  SOUSSE: 'SOUSSE',
  MONASTIR: 'MONASTIR',
  MAHDIA: 'MAHDIA',
  SFAX: 'SFAX',
  KAIROUAN: 'KAIROUAN',
  KASSERINE: 'KASSERINE',
  SIDI_BOUZID: 'SIDI_BOUZID',
  GABES: 'GABES',
  MEDENINE: 'MEDENINE',
  TATAOUINE: 'TATAOUINE',
  GAFSA: 'GAFSA',
  TOZEUR: 'TOZEUR',
  KEBILI: 'KEBILI'
};

export type Governorate = (typeof Governorate)[keyof typeof Governorate]


export const ServiceCategory: {
  POPULAR: 'POPULAR',
  HAIRCUT: 'HAIRCUT',
  BEARD: 'BEARD',
  CARE: 'CARE',
  COLORING: 'COLORING'
};

export type ServiceCategory = (typeof ServiceCategory)[keyof typeof ServiceCategory]


export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const PlanType: {
  BASIC: 'BASIC',
  PRO: 'PRO'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  PAST_DUE: 'PAST_DUE'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Governorate = $Enums.Governorate

export const Governorate: typeof $Enums.Governorate

export type ServiceCategory = $Enums.ServiceCategory

export const ServiceCategory: typeof $Enums.ServiceCategory

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type PlanType = $Enums.PlanType

export const PlanType: typeof $Enums.PlanType

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barberProfile`: Exposes CRUD operations for the **BarberProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BarberProfiles
    * const barberProfiles = await prisma.barberProfile.findMany()
    * ```
    */
  get barberProfile(): Prisma.BarberProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barberAvailability`: Exposes CRUD operations for the **BarberAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BarberAvailabilities
    * const barberAvailabilities = await prisma.barberAvailability.findMany()
    * ```
    */
  get barberAvailability(): Prisma.BarberAvailabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointmentService`: Exposes CRUD operations for the **AppointmentService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppointmentServices
    * const appointmentServices = await prisma.appointmentService.findMany()
    * ```
    */
  get appointmentService(): Prisma.AppointmentServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    BarberProfile: 'BarberProfile',
    Service: 'Service',
    BarberAvailability: 'BarberAvailability',
    Appointment: 'Appointment',
    AppointmentService: 'AppointmentService',
    Review: 'Review',
    Subscription: 'Subscription'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "barberProfile" | "service" | "barberAvailability" | "appointment" | "appointmentService" | "review" | "subscription"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      BarberProfile: {
        payload: Prisma.$BarberProfilePayload<ExtArgs>
        fields: Prisma.BarberProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarberProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarberProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          findFirst: {
            args: Prisma.BarberProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarberProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          findMany: {
            args: Prisma.BarberProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>[]
          }
          create: {
            args: Prisma.BarberProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          createMany: {
            args: Prisma.BarberProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarberProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>[]
          }
          delete: {
            args: Prisma.BarberProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          update: {
            args: Prisma.BarberProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          deleteMany: {
            args: Prisma.BarberProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarberProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarberProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>[]
          }
          upsert: {
            args: Prisma.BarberProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberProfilePayload>
          }
          aggregate: {
            args: Prisma.BarberProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarberProfile>
          }
          groupBy: {
            args: Prisma.BarberProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarberProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarberProfileCountArgs<ExtArgs>
            result: $Utils.Optional<BarberProfileCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      BarberAvailability: {
        payload: Prisma.$BarberAvailabilityPayload<ExtArgs>
        fields: Prisma.BarberAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarberAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarberAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.BarberAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarberAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          findMany: {
            args: Prisma.BarberAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>[]
          }
          create: {
            args: Prisma.BarberAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          createMany: {
            args: Prisma.BarberAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarberAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.BarberAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          update: {
            args: Prisma.BarberAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.BarberAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarberAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarberAvailabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>[]
          }
          upsert: {
            args: Prisma.BarberAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.BarberAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarberAvailability>
          }
          groupBy: {
            args: Prisma.BarberAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarberAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarberAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<BarberAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      AppointmentService: {
        payload: Prisma.$AppointmentServicePayload<ExtArgs>
        fields: Prisma.AppointmentServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          findFirst: {
            args: Prisma.AppointmentServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          findMany: {
            args: Prisma.AppointmentServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>[]
          }
          create: {
            args: Prisma.AppointmentServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          createMany: {
            args: Prisma.AppointmentServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>[]
          }
          delete: {
            args: Prisma.AppointmentServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          update: {
            args: Prisma.AppointmentServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          deleteMany: {
            args: Prisma.AppointmentServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>[]
          }
          upsert: {
            args: Prisma.AppointmentServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentServicePayload>
          }
          aggregate: {
            args: Prisma.AppointmentServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointmentService>
          }
          groupBy: {
            args: Prisma.AppointmentServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentServiceCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentServiceCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    barberProfile?: BarberProfileOmit
    service?: ServiceOmit
    barberAvailability?: BarberAvailabilityOmit
    appointment?: AppointmentOmit
    appointmentService?: AppointmentServiceOmit
    review?: ReviewOmit
    subscription?: SubscriptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    appointmentsAsClient: number
    reviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointmentsAsClient?: boolean | UserCountOutputTypeCountAppointmentsAsClientArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsAsClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type BarberProfileCountOutputType
   */

  export type BarberProfileCountOutputType = {
    services: number
    availability: number
    appointments: number
    subscriptions: number
    reviews: number
  }

  export type BarberProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | BarberProfileCountOutputTypeCountServicesArgs
    availability?: boolean | BarberProfileCountOutputTypeCountAvailabilityArgs
    appointments?: boolean | BarberProfileCountOutputTypeCountAppointmentsArgs
    subscriptions?: boolean | BarberProfileCountOutputTypeCountSubscriptionsArgs
    reviews?: boolean | BarberProfileCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfileCountOutputType
     */
    select?: BarberProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeCountAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberAvailabilityWhereInput
  }

  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * BarberProfileCountOutputType without action
   */
  export type BarberProfileCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    appointmentServices: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointmentServices?: boolean | ServiceCountOutputTypeCountAppointmentServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAppointmentServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentServiceWhereInput
  }


  /**
   * Count Type AppointmentCountOutputType
   */

  export type AppointmentCountOutputType = {
    services: number
  }

  export type AppointmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | AppointmentCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * AppointmentCountOutputType without action
   */
  export type AppointmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentCountOutputType
     */
    select?: AppointmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppointmentCountOutputType without action
   */
  export type AppointmentCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentServiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    name: string | null
    avatarUrl: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    name: string | null
    avatarUrl: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    passwordHash: number
    name: number
    avatarUrl: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    passwordHash?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    phone: string | null
    passwordHash: string
    name: string
    avatarUrl: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barberProfile?: boolean | User$barberProfileArgs<ExtArgs>
    appointmentsAsClient?: boolean | User$appointmentsAsClientArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "passwordHash" | "name" | "avatarUrl" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barberProfile?: boolean | User$barberProfileArgs<ExtArgs>
    appointmentsAsClient?: boolean | User$appointmentsAsClientArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      /**
       * Present only when role = BARBER. Kept as a separate model instead of
       * nullable columns on User so client accounts don't carry a wagon of
       * barber-only fields (services, plan, availability, ...).
       */
      barberProfile: Prisma.$BarberProfilePayload<ExtArgs> | null
      /**
       * Bookings made by this user as a client.
       */
      appointmentsAsClient: Prisma.$AppointmentPayload<ExtArgs>[]
      /**
       * Reviews this user has authored (always as a client).
       */
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phone: string | null
      passwordHash: string
      name: string
      avatarUrl: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barberProfile<T extends User$barberProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$barberProfileArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appointmentsAsClient<T extends User$appointmentsAsClientArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsAsClientArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.barberProfile
   */
  export type User$barberProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    where?: BarberProfileWhereInput
  }

  /**
   * User.appointmentsAsClient
   */
  export type User$appointmentsAsClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model BarberProfile
   */

  export type AggregateBarberProfile = {
    _count: BarberProfileCountAggregateOutputType | null
    _avg: BarberProfileAvgAggregateOutputType | null
    _sum: BarberProfileSumAggregateOutputType | null
    _min: BarberProfileMinAggregateOutputType | null
    _max: BarberProfileMaxAggregateOutputType | null
  }

  export type BarberProfileAvgAggregateOutputType = {
    avgRating: number | null
    reviewCount: number | null
  }

  export type BarberProfileSumAggregateOutputType = {
    avgRating: number | null
    reviewCount: number | null
  }

  export type BarberProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    bio: string | null
    governorate: $Enums.Governorate | null
    address: string | null
    avatarUrl: string | null
    coverImageUrl: string | null
    avgRating: number | null
    reviewCount: number | null
    planType: $Enums.PlanType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarberProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    bio: string | null
    governorate: $Enums.Governorate | null
    address: string | null
    avatarUrl: string | null
    coverImageUrl: string | null
    avgRating: number | null
    reviewCount: number | null
    planType: $Enums.PlanType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BarberProfileCountAggregateOutputType = {
    id: number
    userId: number
    businessName: number
    bio: number
    governorate: number
    address: number
    avatarUrl: number
    coverImageUrl: number
    avgRating: number
    reviewCount: number
    planType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BarberProfileAvgAggregateInputType = {
    avgRating?: true
    reviewCount?: true
  }

  export type BarberProfileSumAggregateInputType = {
    avgRating?: true
    reviewCount?: true
  }

  export type BarberProfileMinAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    bio?: true
    governorate?: true
    address?: true
    avatarUrl?: true
    coverImageUrl?: true
    avgRating?: true
    reviewCount?: true
    planType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarberProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    bio?: true
    governorate?: true
    address?: true
    avatarUrl?: true
    coverImageUrl?: true
    avgRating?: true
    reviewCount?: true
    planType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BarberProfileCountAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    bio?: true
    governorate?: true
    address?: true
    avatarUrl?: true
    coverImageUrl?: true
    avgRating?: true
    reviewCount?: true
    planType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BarberProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberProfile to aggregate.
     */
    where?: BarberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberProfiles to fetch.
     */
    orderBy?: BarberProfileOrderByWithRelationInput | BarberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BarberProfiles
    **/
    _count?: true | BarberProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BarberProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BarberProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarberProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarberProfileMaxAggregateInputType
  }

  export type GetBarberProfileAggregateType<T extends BarberProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateBarberProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarberProfile[P]>
      : GetScalarType<T[P], AggregateBarberProfile[P]>
  }




  export type BarberProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberProfileWhereInput
    orderBy?: BarberProfileOrderByWithAggregationInput | BarberProfileOrderByWithAggregationInput[]
    by: BarberProfileScalarFieldEnum[] | BarberProfileScalarFieldEnum
    having?: BarberProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarberProfileCountAggregateInputType | true
    _avg?: BarberProfileAvgAggregateInputType
    _sum?: BarberProfileSumAggregateInputType
    _min?: BarberProfileMinAggregateInputType
    _max?: BarberProfileMaxAggregateInputType
  }

  export type BarberProfileGroupByOutputType = {
    id: string
    userId: string
    businessName: string
    bio: string | null
    governorate: $Enums.Governorate
    address: string | null
    avatarUrl: string | null
    coverImageUrl: string | null
    avgRating: number
    reviewCount: number
    planType: $Enums.PlanType
    createdAt: Date
    updatedAt: Date
    _count: BarberProfileCountAggregateOutputType | null
    _avg: BarberProfileAvgAggregateOutputType | null
    _sum: BarberProfileSumAggregateOutputType | null
    _min: BarberProfileMinAggregateOutputType | null
    _max: BarberProfileMaxAggregateOutputType | null
  }

  type GetBarberProfileGroupByPayload<T extends BarberProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarberProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarberProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarberProfileGroupByOutputType[P]>
            : GetScalarType<T[P], BarberProfileGroupByOutputType[P]>
        }
      >
    >


  export type BarberProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    bio?: boolean
    governorate?: boolean
    address?: boolean
    avatarUrl?: boolean
    coverImageUrl?: boolean
    avgRating?: boolean
    reviewCount?: boolean
    planType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | BarberProfile$servicesArgs<ExtArgs>
    availability?: boolean | BarberProfile$availabilityArgs<ExtArgs>
    appointments?: boolean | BarberProfile$appointmentsArgs<ExtArgs>
    subscriptions?: boolean | BarberProfile$subscriptionsArgs<ExtArgs>
    reviews?: boolean | BarberProfile$reviewsArgs<ExtArgs>
    _count?: boolean | BarberProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberProfile"]>

  export type BarberProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    bio?: boolean
    governorate?: boolean
    address?: boolean
    avatarUrl?: boolean
    coverImageUrl?: boolean
    avgRating?: boolean
    reviewCount?: boolean
    planType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberProfile"]>

  export type BarberProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    bio?: boolean
    governorate?: boolean
    address?: boolean
    avatarUrl?: boolean
    coverImageUrl?: boolean
    avgRating?: boolean
    reviewCount?: boolean
    planType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberProfile"]>

  export type BarberProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    businessName?: boolean
    bio?: boolean
    governorate?: boolean
    address?: boolean
    avatarUrl?: boolean
    coverImageUrl?: boolean
    avgRating?: boolean
    reviewCount?: boolean
    planType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BarberProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "businessName" | "bio" | "governorate" | "address" | "avatarUrl" | "coverImageUrl" | "avgRating" | "reviewCount" | "planType" | "createdAt" | "updatedAt", ExtArgs["result"]["barberProfile"]>
  export type BarberProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | BarberProfile$servicesArgs<ExtArgs>
    availability?: boolean | BarberProfile$availabilityArgs<ExtArgs>
    appointments?: boolean | BarberProfile$appointmentsArgs<ExtArgs>
    subscriptions?: boolean | BarberProfile$subscriptionsArgs<ExtArgs>
    reviews?: boolean | BarberProfile$reviewsArgs<ExtArgs>
    _count?: boolean | BarberProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BarberProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BarberProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BarberProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BarberProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      services: Prisma.$ServicePayload<ExtArgs>[]
      availability: Prisma.$BarberAvailabilityPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      businessName: string
      bio: string | null
      governorate: $Enums.Governorate
      address: string | null
      avatarUrl: string | null
      coverImageUrl: string | null
      /**
       * Denormalized rating snapshot, recomputed whenever a Review is
       * created/updated. Search/listing pages sort and filter by rating
       * constantly; aggregating live over the reviews table on every request
       * would be needlessly expensive for data that changes rarely.
       */
      avgRating: number
      reviewCount: number
      /**
       * Mirrors the barber's current Subscription for a cheap read on
       * profile/search pages, avoiding a join for the common case of "what
       * plan is this barber on". Subscription remains the source of truth
       * and billing history.
       */
      planType: $Enums.PlanType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["barberProfile"]>
    composites: {}
  }

  type BarberProfileGetPayload<S extends boolean | null | undefined | BarberProfileDefaultArgs> = $Result.GetResult<Prisma.$BarberProfilePayload, S>

  type BarberProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarberProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarberProfileCountAggregateInputType | true
    }

  export interface BarberProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BarberProfile'], meta: { name: 'BarberProfile' } }
    /**
     * Find zero or one BarberProfile that matches the filter.
     * @param {BarberProfileFindUniqueArgs} args - Arguments to find a BarberProfile
     * @example
     * // Get one BarberProfile
     * const barberProfile = await prisma.barberProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarberProfileFindUniqueArgs>(args: SelectSubset<T, BarberProfileFindUniqueArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BarberProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarberProfileFindUniqueOrThrowArgs} args - Arguments to find a BarberProfile
     * @example
     * // Get one BarberProfile
     * const barberProfile = await prisma.barberProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarberProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, BarberProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileFindFirstArgs} args - Arguments to find a BarberProfile
     * @example
     * // Get one BarberProfile
     * const barberProfile = await prisma.barberProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarberProfileFindFirstArgs>(args?: SelectSubset<T, BarberProfileFindFirstArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileFindFirstOrThrowArgs} args - Arguments to find a BarberProfile
     * @example
     * // Get one BarberProfile
     * const barberProfile = await prisma.barberProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarberProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, BarberProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BarberProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BarberProfiles
     * const barberProfiles = await prisma.barberProfile.findMany()
     * 
     * // Get first 10 BarberProfiles
     * const barberProfiles = await prisma.barberProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barberProfileWithIdOnly = await prisma.barberProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarberProfileFindManyArgs>(args?: SelectSubset<T, BarberProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BarberProfile.
     * @param {BarberProfileCreateArgs} args - Arguments to create a BarberProfile.
     * @example
     * // Create one BarberProfile
     * const BarberProfile = await prisma.barberProfile.create({
     *   data: {
     *     // ... data to create a BarberProfile
     *   }
     * })
     * 
     */
    create<T extends BarberProfileCreateArgs>(args: SelectSubset<T, BarberProfileCreateArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BarberProfiles.
     * @param {BarberProfileCreateManyArgs} args - Arguments to create many BarberProfiles.
     * @example
     * // Create many BarberProfiles
     * const barberProfile = await prisma.barberProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarberProfileCreateManyArgs>(args?: SelectSubset<T, BarberProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BarberProfiles and returns the data saved in the database.
     * @param {BarberProfileCreateManyAndReturnArgs} args - Arguments to create many BarberProfiles.
     * @example
     * // Create many BarberProfiles
     * const barberProfile = await prisma.barberProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BarberProfiles and only return the `id`
     * const barberProfileWithIdOnly = await prisma.barberProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarberProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, BarberProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BarberProfile.
     * @param {BarberProfileDeleteArgs} args - Arguments to delete one BarberProfile.
     * @example
     * // Delete one BarberProfile
     * const BarberProfile = await prisma.barberProfile.delete({
     *   where: {
     *     // ... filter to delete one BarberProfile
     *   }
     * })
     * 
     */
    delete<T extends BarberProfileDeleteArgs>(args: SelectSubset<T, BarberProfileDeleteArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BarberProfile.
     * @param {BarberProfileUpdateArgs} args - Arguments to update one BarberProfile.
     * @example
     * // Update one BarberProfile
     * const barberProfile = await prisma.barberProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarberProfileUpdateArgs>(args: SelectSubset<T, BarberProfileUpdateArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BarberProfiles.
     * @param {BarberProfileDeleteManyArgs} args - Arguments to filter BarberProfiles to delete.
     * @example
     * // Delete a few BarberProfiles
     * const { count } = await prisma.barberProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarberProfileDeleteManyArgs>(args?: SelectSubset<T, BarberProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BarberProfiles
     * const barberProfile = await prisma.barberProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarberProfileUpdateManyArgs>(args: SelectSubset<T, BarberProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberProfiles and returns the data updated in the database.
     * @param {BarberProfileUpdateManyAndReturnArgs} args - Arguments to update many BarberProfiles.
     * @example
     * // Update many BarberProfiles
     * const barberProfile = await prisma.barberProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BarberProfiles and only return the `id`
     * const barberProfileWithIdOnly = await prisma.barberProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarberProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, BarberProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BarberProfile.
     * @param {BarberProfileUpsertArgs} args - Arguments to update or create a BarberProfile.
     * @example
     * // Update or create a BarberProfile
     * const barberProfile = await prisma.barberProfile.upsert({
     *   create: {
     *     // ... data to create a BarberProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BarberProfile we want to update
     *   }
     * })
     */
    upsert<T extends BarberProfileUpsertArgs>(args: SelectSubset<T, BarberProfileUpsertArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BarberProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileCountArgs} args - Arguments to filter BarberProfiles to count.
     * @example
     * // Count the number of BarberProfiles
     * const count = await prisma.barberProfile.count({
     *   where: {
     *     // ... the filter for the BarberProfiles we want to count
     *   }
     * })
    **/
    count<T extends BarberProfileCountArgs>(
      args?: Subset<T, BarberProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarberProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BarberProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarberProfileAggregateArgs>(args: Subset<T, BarberProfileAggregateArgs>): Prisma.PrismaPromise<GetBarberProfileAggregateType<T>>

    /**
     * Group by BarberProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarberProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarberProfileGroupByArgs['orderBy'] }
        : { orderBy?: BarberProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarberProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarberProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BarberProfile model
   */
  readonly fields: BarberProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BarberProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarberProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends BarberProfile$servicesArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfile$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    availability<T extends BarberProfile$availabilityArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfile$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends BarberProfile$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfile$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends BarberProfile$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfile$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends BarberProfile$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfile$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BarberProfile model
   */
  interface BarberProfileFieldRefs {
    readonly id: FieldRef<"BarberProfile", 'String'>
    readonly userId: FieldRef<"BarberProfile", 'String'>
    readonly businessName: FieldRef<"BarberProfile", 'String'>
    readonly bio: FieldRef<"BarberProfile", 'String'>
    readonly governorate: FieldRef<"BarberProfile", 'Governorate'>
    readonly address: FieldRef<"BarberProfile", 'String'>
    readonly avatarUrl: FieldRef<"BarberProfile", 'String'>
    readonly coverImageUrl: FieldRef<"BarberProfile", 'String'>
    readonly avgRating: FieldRef<"BarberProfile", 'Float'>
    readonly reviewCount: FieldRef<"BarberProfile", 'Int'>
    readonly planType: FieldRef<"BarberProfile", 'PlanType'>
    readonly createdAt: FieldRef<"BarberProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"BarberProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BarberProfile findUnique
   */
  export type BarberProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter, which BarberProfile to fetch.
     */
    where: BarberProfileWhereUniqueInput
  }

  /**
   * BarberProfile findUniqueOrThrow
   */
  export type BarberProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter, which BarberProfile to fetch.
     */
    where: BarberProfileWhereUniqueInput
  }

  /**
   * BarberProfile findFirst
   */
  export type BarberProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter, which BarberProfile to fetch.
     */
    where?: BarberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberProfiles to fetch.
     */
    orderBy?: BarberProfileOrderByWithRelationInput | BarberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberProfiles.
     */
    cursor?: BarberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberProfiles.
     */
    distinct?: BarberProfileScalarFieldEnum | BarberProfileScalarFieldEnum[]
  }

  /**
   * BarberProfile findFirstOrThrow
   */
  export type BarberProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter, which BarberProfile to fetch.
     */
    where?: BarberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberProfiles to fetch.
     */
    orderBy?: BarberProfileOrderByWithRelationInput | BarberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberProfiles.
     */
    cursor?: BarberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberProfiles.
     */
    distinct?: BarberProfileScalarFieldEnum | BarberProfileScalarFieldEnum[]
  }

  /**
   * BarberProfile findMany
   */
  export type BarberProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter, which BarberProfiles to fetch.
     */
    where?: BarberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberProfiles to fetch.
     */
    orderBy?: BarberProfileOrderByWithRelationInput | BarberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BarberProfiles.
     */
    cursor?: BarberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberProfiles.
     */
    distinct?: BarberProfileScalarFieldEnum | BarberProfileScalarFieldEnum[]
  }

  /**
   * BarberProfile create
   */
  export type BarberProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a BarberProfile.
     */
    data: XOR<BarberProfileCreateInput, BarberProfileUncheckedCreateInput>
  }

  /**
   * BarberProfile createMany
   */
  export type BarberProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BarberProfiles.
     */
    data: BarberProfileCreateManyInput | BarberProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarberProfile createManyAndReturn
   */
  export type BarberProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * The data used to create many BarberProfiles.
     */
    data: BarberProfileCreateManyInput | BarberProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberProfile update
   */
  export type BarberProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a BarberProfile.
     */
    data: XOR<BarberProfileUpdateInput, BarberProfileUncheckedUpdateInput>
    /**
     * Choose, which BarberProfile to update.
     */
    where: BarberProfileWhereUniqueInput
  }

  /**
   * BarberProfile updateMany
   */
  export type BarberProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BarberProfiles.
     */
    data: XOR<BarberProfileUpdateManyMutationInput, BarberProfileUncheckedUpdateManyInput>
    /**
     * Filter which BarberProfiles to update
     */
    where?: BarberProfileWhereInput
    /**
     * Limit how many BarberProfiles to update.
     */
    limit?: number
  }

  /**
   * BarberProfile updateManyAndReturn
   */
  export type BarberProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * The data used to update BarberProfiles.
     */
    data: XOR<BarberProfileUpdateManyMutationInput, BarberProfileUncheckedUpdateManyInput>
    /**
     * Filter which BarberProfiles to update
     */
    where?: BarberProfileWhereInput
    /**
     * Limit how many BarberProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberProfile upsert
   */
  export type BarberProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the BarberProfile to update in case it exists.
     */
    where: BarberProfileWhereUniqueInput
    /**
     * In case the BarberProfile found by the `where` argument doesn't exist, create a new BarberProfile with this data.
     */
    create: XOR<BarberProfileCreateInput, BarberProfileUncheckedCreateInput>
    /**
     * In case the BarberProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarberProfileUpdateInput, BarberProfileUncheckedUpdateInput>
  }

  /**
   * BarberProfile delete
   */
  export type BarberProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
    /**
     * Filter which BarberProfile to delete.
     */
    where: BarberProfileWhereUniqueInput
  }

  /**
   * BarberProfile deleteMany
   */
  export type BarberProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberProfiles to delete
     */
    where?: BarberProfileWhereInput
    /**
     * Limit how many BarberProfiles to delete.
     */
    limit?: number
  }

  /**
   * BarberProfile.services
   */
  export type BarberProfile$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * BarberProfile.availability
   */
  export type BarberProfile$availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    where?: BarberAvailabilityWhereInput
    orderBy?: BarberAvailabilityOrderByWithRelationInput | BarberAvailabilityOrderByWithRelationInput[]
    cursor?: BarberAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarberAvailabilityScalarFieldEnum | BarberAvailabilityScalarFieldEnum[]
  }

  /**
   * BarberProfile.appointments
   */
  export type BarberProfile$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * BarberProfile.subscriptions
   */
  export type BarberProfile$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * BarberProfile.reviews
   */
  export type BarberProfile$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * BarberProfile without action
   */
  export type BarberProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberProfile
     */
    select?: BarberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberProfile
     */
    omit?: BarberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberProfileInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    durationMinutes: number | null
    priceMillimes: number | null
  }

  export type ServiceSumAggregateOutputType = {
    durationMinutes: number | null
    priceMillimes: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    barberId: string | null
    name: string | null
    description: string | null
    durationMinutes: number | null
    priceMillimes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    barberId: string | null
    name: string | null
    description: string | null
    durationMinutes: number | null
    priceMillimes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    barberId: number
    name: number
    description: number
    durationMinutes: number
    priceMillimes: number
    categories: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    durationMinutes?: true
    priceMillimes?: true
  }

  export type ServiceSumAggregateInputType = {
    durationMinutes?: true
    priceMillimes?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    barberId?: true
    name?: true
    description?: true
    durationMinutes?: true
    priceMillimes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    barberId?: true
    name?: true
    description?: true
    durationMinutes?: true
    priceMillimes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    barberId?: true
    name?: true
    description?: true
    durationMinutes?: true
    priceMillimes?: true
    categories?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    barberId: string
    name: string
    description: string | null
    durationMinutes: number
    priceMillimes: number
    categories: $Enums.ServiceCategory[]
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    name?: boolean
    description?: boolean
    durationMinutes?: boolean
    priceMillimes?: boolean
    categories?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
    appointmentServices?: boolean | Service$appointmentServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    name?: boolean
    description?: boolean
    durationMinutes?: boolean
    priceMillimes?: boolean
    categories?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    name?: boolean
    description?: boolean
    durationMinutes?: boolean
    priceMillimes?: boolean
    categories?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    barberId?: boolean
    name?: boolean
    description?: boolean
    durationMinutes?: boolean
    priceMillimes?: boolean
    categories?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barberId" | "name" | "description" | "durationMinutes" | "priceMillimes" | "categories" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
    appointmentServices?: boolean | Service$appointmentServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      barber: Prisma.$BarberProfilePayload<ExtArgs>
      appointmentServices: Prisma.$AppointmentServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barberId: string
      name: string
      description: string | null
      durationMinutes: number
      /**
       * Tunisian Dinar's minor unit is the millime (1 TND = 1000 millimes),
       * not a cent — stored as an integer to avoid float rounding on money.
       */
      priceMillimes: number
      categories: $Enums.ServiceCategory[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barber<T extends BarberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfileDefaultArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointmentServices<T extends Service$appointmentServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$appointmentServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly barberId: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly durationMinutes: FieldRef<"Service", 'Int'>
    readonly priceMillimes: FieldRef<"Service", 'Int'>
    readonly categories: FieldRef<"Service", 'ServiceCategory[]'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.appointmentServices
   */
  export type Service$appointmentServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    where?: AppointmentServiceWhereInput
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    cursor?: AppointmentServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentServiceScalarFieldEnum | AppointmentServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model BarberAvailability
   */

  export type AggregateBarberAvailability = {
    _count: BarberAvailabilityCountAggregateOutputType | null
    _avg: BarberAvailabilityAvgAggregateOutputType | null
    _sum: BarberAvailabilitySumAggregateOutputType | null
    _min: BarberAvailabilityMinAggregateOutputType | null
    _max: BarberAvailabilityMaxAggregateOutputType | null
  }

  export type BarberAvailabilityAvgAggregateOutputType = {
    startMinute: number | null
    endMinute: number | null
  }

  export type BarberAvailabilitySumAggregateOutputType = {
    startMinute: number | null
    endMinute: number | null
  }

  export type BarberAvailabilityMinAggregateOutputType = {
    id: string | null
    barberId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    startMinute: number | null
    endMinute: number | null
  }

  export type BarberAvailabilityMaxAggregateOutputType = {
    id: string | null
    barberId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    startMinute: number | null
    endMinute: number | null
  }

  export type BarberAvailabilityCountAggregateOutputType = {
    id: number
    barberId: number
    dayOfWeek: number
    startMinute: number
    endMinute: number
    _all: number
  }


  export type BarberAvailabilityAvgAggregateInputType = {
    startMinute?: true
    endMinute?: true
  }

  export type BarberAvailabilitySumAggregateInputType = {
    startMinute?: true
    endMinute?: true
  }

  export type BarberAvailabilityMinAggregateInputType = {
    id?: true
    barberId?: true
    dayOfWeek?: true
    startMinute?: true
    endMinute?: true
  }

  export type BarberAvailabilityMaxAggregateInputType = {
    id?: true
    barberId?: true
    dayOfWeek?: true
    startMinute?: true
    endMinute?: true
  }

  export type BarberAvailabilityCountAggregateInputType = {
    id?: true
    barberId?: true
    dayOfWeek?: true
    startMinute?: true
    endMinute?: true
    _all?: true
  }

  export type BarberAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberAvailability to aggregate.
     */
    where?: BarberAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberAvailabilities to fetch.
     */
    orderBy?: BarberAvailabilityOrderByWithRelationInput | BarberAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarberAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BarberAvailabilities
    **/
    _count?: true | BarberAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BarberAvailabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BarberAvailabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarberAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarberAvailabilityMaxAggregateInputType
  }

  export type GetBarberAvailabilityAggregateType<T extends BarberAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateBarberAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarberAvailability[P]>
      : GetScalarType<T[P], AggregateBarberAvailability[P]>
  }




  export type BarberAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberAvailabilityWhereInput
    orderBy?: BarberAvailabilityOrderByWithAggregationInput | BarberAvailabilityOrderByWithAggregationInput[]
    by: BarberAvailabilityScalarFieldEnum[] | BarberAvailabilityScalarFieldEnum
    having?: BarberAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarberAvailabilityCountAggregateInputType | true
    _avg?: BarberAvailabilityAvgAggregateInputType
    _sum?: BarberAvailabilitySumAggregateInputType
    _min?: BarberAvailabilityMinAggregateInputType
    _max?: BarberAvailabilityMaxAggregateInputType
  }

  export type BarberAvailabilityGroupByOutputType = {
    id: string
    barberId: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
    _count: BarberAvailabilityCountAggregateOutputType | null
    _avg: BarberAvailabilityAvgAggregateOutputType | null
    _sum: BarberAvailabilitySumAggregateOutputType | null
    _min: BarberAvailabilityMinAggregateOutputType | null
    _max: BarberAvailabilityMaxAggregateOutputType | null
  }

  type GetBarberAvailabilityGroupByPayload<T extends BarberAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarberAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarberAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarberAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], BarberAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type BarberAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    dayOfWeek?: boolean
    startMinute?: boolean
    endMinute?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberAvailability"]>

  export type BarberAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    dayOfWeek?: boolean
    startMinute?: boolean
    endMinute?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberAvailability"]>

  export type BarberAvailabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    dayOfWeek?: boolean
    startMinute?: boolean
    endMinute?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberAvailability"]>

  export type BarberAvailabilitySelectScalar = {
    id?: boolean
    barberId?: boolean
    dayOfWeek?: boolean
    startMinute?: boolean
    endMinute?: boolean
  }

  export type BarberAvailabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barberId" | "dayOfWeek" | "startMinute" | "endMinute", ExtArgs["result"]["barberAvailability"]>
  export type BarberAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type BarberAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type BarberAvailabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }

  export type $BarberAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BarberAvailability"
    objects: {
      barber: Prisma.$BarberProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barberId: string
      dayOfWeek: $Enums.DayOfWeek
      /**
       * Minutes since midnight (0-1439) — cheaper to compare/index than
       * TIME/string parsing, and avoids timezone ambiguity entirely.
       */
      startMinute: number
      endMinute: number
    }, ExtArgs["result"]["barberAvailability"]>
    composites: {}
  }

  type BarberAvailabilityGetPayload<S extends boolean | null | undefined | BarberAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$BarberAvailabilityPayload, S>

  type BarberAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarberAvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarberAvailabilityCountAggregateInputType | true
    }

  export interface BarberAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BarberAvailability'], meta: { name: 'BarberAvailability' } }
    /**
     * Find zero or one BarberAvailability that matches the filter.
     * @param {BarberAvailabilityFindUniqueArgs} args - Arguments to find a BarberAvailability
     * @example
     * // Get one BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarberAvailabilityFindUniqueArgs>(args: SelectSubset<T, BarberAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BarberAvailability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarberAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a BarberAvailability
     * @example
     * // Get one BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarberAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, BarberAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityFindFirstArgs} args - Arguments to find a BarberAvailability
     * @example
     * // Get one BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarberAvailabilityFindFirstArgs>(args?: SelectSubset<T, BarberAvailabilityFindFirstArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityFindFirstOrThrowArgs} args - Arguments to find a BarberAvailability
     * @example
     * // Get one BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarberAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, BarberAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BarberAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BarberAvailabilities
     * const barberAvailabilities = await prisma.barberAvailability.findMany()
     * 
     * // Get first 10 BarberAvailabilities
     * const barberAvailabilities = await prisma.barberAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barberAvailabilityWithIdOnly = await prisma.barberAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarberAvailabilityFindManyArgs>(args?: SelectSubset<T, BarberAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BarberAvailability.
     * @param {BarberAvailabilityCreateArgs} args - Arguments to create a BarberAvailability.
     * @example
     * // Create one BarberAvailability
     * const BarberAvailability = await prisma.barberAvailability.create({
     *   data: {
     *     // ... data to create a BarberAvailability
     *   }
     * })
     * 
     */
    create<T extends BarberAvailabilityCreateArgs>(args: SelectSubset<T, BarberAvailabilityCreateArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BarberAvailabilities.
     * @param {BarberAvailabilityCreateManyArgs} args - Arguments to create many BarberAvailabilities.
     * @example
     * // Create many BarberAvailabilities
     * const barberAvailability = await prisma.barberAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarberAvailabilityCreateManyArgs>(args?: SelectSubset<T, BarberAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BarberAvailabilities and returns the data saved in the database.
     * @param {BarberAvailabilityCreateManyAndReturnArgs} args - Arguments to create many BarberAvailabilities.
     * @example
     * // Create many BarberAvailabilities
     * const barberAvailability = await prisma.barberAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BarberAvailabilities and only return the `id`
     * const barberAvailabilityWithIdOnly = await prisma.barberAvailability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarberAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, BarberAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BarberAvailability.
     * @param {BarberAvailabilityDeleteArgs} args - Arguments to delete one BarberAvailability.
     * @example
     * // Delete one BarberAvailability
     * const BarberAvailability = await prisma.barberAvailability.delete({
     *   where: {
     *     // ... filter to delete one BarberAvailability
     *   }
     * })
     * 
     */
    delete<T extends BarberAvailabilityDeleteArgs>(args: SelectSubset<T, BarberAvailabilityDeleteArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BarberAvailability.
     * @param {BarberAvailabilityUpdateArgs} args - Arguments to update one BarberAvailability.
     * @example
     * // Update one BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarberAvailabilityUpdateArgs>(args: SelectSubset<T, BarberAvailabilityUpdateArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BarberAvailabilities.
     * @param {BarberAvailabilityDeleteManyArgs} args - Arguments to filter BarberAvailabilities to delete.
     * @example
     * // Delete a few BarberAvailabilities
     * const { count } = await prisma.barberAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarberAvailabilityDeleteManyArgs>(args?: SelectSubset<T, BarberAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BarberAvailabilities
     * const barberAvailability = await prisma.barberAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarberAvailabilityUpdateManyArgs>(args: SelectSubset<T, BarberAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberAvailabilities and returns the data updated in the database.
     * @param {BarberAvailabilityUpdateManyAndReturnArgs} args - Arguments to update many BarberAvailabilities.
     * @example
     * // Update many BarberAvailabilities
     * const barberAvailability = await prisma.barberAvailability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BarberAvailabilities and only return the `id`
     * const barberAvailabilityWithIdOnly = await prisma.barberAvailability.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarberAvailabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, BarberAvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BarberAvailability.
     * @param {BarberAvailabilityUpsertArgs} args - Arguments to update or create a BarberAvailability.
     * @example
     * // Update or create a BarberAvailability
     * const barberAvailability = await prisma.barberAvailability.upsert({
     *   create: {
     *     // ... data to create a BarberAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BarberAvailability we want to update
     *   }
     * })
     */
    upsert<T extends BarberAvailabilityUpsertArgs>(args: SelectSubset<T, BarberAvailabilityUpsertArgs<ExtArgs>>): Prisma__BarberAvailabilityClient<$Result.GetResult<Prisma.$BarberAvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BarberAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityCountArgs} args - Arguments to filter BarberAvailabilities to count.
     * @example
     * // Count the number of BarberAvailabilities
     * const count = await prisma.barberAvailability.count({
     *   where: {
     *     // ... the filter for the BarberAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends BarberAvailabilityCountArgs>(
      args?: Subset<T, BarberAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarberAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BarberAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarberAvailabilityAggregateArgs>(args: Subset<T, BarberAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetBarberAvailabilityAggregateType<T>>

    /**
     * Group by BarberAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAvailabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarberAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarberAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: BarberAvailabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarberAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarberAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BarberAvailability model
   */
  readonly fields: BarberAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BarberAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarberAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barber<T extends BarberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfileDefaultArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BarberAvailability model
   */
  interface BarberAvailabilityFieldRefs {
    readonly id: FieldRef<"BarberAvailability", 'String'>
    readonly barberId: FieldRef<"BarberAvailability", 'String'>
    readonly dayOfWeek: FieldRef<"BarberAvailability", 'DayOfWeek'>
    readonly startMinute: FieldRef<"BarberAvailability", 'Int'>
    readonly endMinute: FieldRef<"BarberAvailability", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BarberAvailability findUnique
   */
  export type BarberAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which BarberAvailability to fetch.
     */
    where: BarberAvailabilityWhereUniqueInput
  }

  /**
   * BarberAvailability findUniqueOrThrow
   */
  export type BarberAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which BarberAvailability to fetch.
     */
    where: BarberAvailabilityWhereUniqueInput
  }

  /**
   * BarberAvailability findFirst
   */
  export type BarberAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which BarberAvailability to fetch.
     */
    where?: BarberAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberAvailabilities to fetch.
     */
    orderBy?: BarberAvailabilityOrderByWithRelationInput | BarberAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberAvailabilities.
     */
    cursor?: BarberAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberAvailabilities.
     */
    distinct?: BarberAvailabilityScalarFieldEnum | BarberAvailabilityScalarFieldEnum[]
  }

  /**
   * BarberAvailability findFirstOrThrow
   */
  export type BarberAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which BarberAvailability to fetch.
     */
    where?: BarberAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberAvailabilities to fetch.
     */
    orderBy?: BarberAvailabilityOrderByWithRelationInput | BarberAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberAvailabilities.
     */
    cursor?: BarberAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberAvailabilities.
     */
    distinct?: BarberAvailabilityScalarFieldEnum | BarberAvailabilityScalarFieldEnum[]
  }

  /**
   * BarberAvailability findMany
   */
  export type BarberAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which BarberAvailabilities to fetch.
     */
    where?: BarberAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberAvailabilities to fetch.
     */
    orderBy?: BarberAvailabilityOrderByWithRelationInput | BarberAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BarberAvailabilities.
     */
    cursor?: BarberAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberAvailabilities.
     */
    distinct?: BarberAvailabilityScalarFieldEnum | BarberAvailabilityScalarFieldEnum[]
  }

  /**
   * BarberAvailability create
   */
  export type BarberAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a BarberAvailability.
     */
    data: XOR<BarberAvailabilityCreateInput, BarberAvailabilityUncheckedCreateInput>
  }

  /**
   * BarberAvailability createMany
   */
  export type BarberAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BarberAvailabilities.
     */
    data: BarberAvailabilityCreateManyInput | BarberAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarberAvailability createManyAndReturn
   */
  export type BarberAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to create many BarberAvailabilities.
     */
    data: BarberAvailabilityCreateManyInput | BarberAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberAvailability update
   */
  export type BarberAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a BarberAvailability.
     */
    data: XOR<BarberAvailabilityUpdateInput, BarberAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which BarberAvailability to update.
     */
    where: BarberAvailabilityWhereUniqueInput
  }

  /**
   * BarberAvailability updateMany
   */
  export type BarberAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BarberAvailabilities.
     */
    data: XOR<BarberAvailabilityUpdateManyMutationInput, BarberAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which BarberAvailabilities to update
     */
    where?: BarberAvailabilityWhereInput
    /**
     * Limit how many BarberAvailabilities to update.
     */
    limit?: number
  }

  /**
   * BarberAvailability updateManyAndReturn
   */
  export type BarberAvailabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to update BarberAvailabilities.
     */
    data: XOR<BarberAvailabilityUpdateManyMutationInput, BarberAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which BarberAvailabilities to update
     */
    where?: BarberAvailabilityWhereInput
    /**
     * Limit how many BarberAvailabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberAvailability upsert
   */
  export type BarberAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the BarberAvailability to update in case it exists.
     */
    where: BarberAvailabilityWhereUniqueInput
    /**
     * In case the BarberAvailability found by the `where` argument doesn't exist, create a new BarberAvailability with this data.
     */
    create: XOR<BarberAvailabilityCreateInput, BarberAvailabilityUncheckedCreateInput>
    /**
     * In case the BarberAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarberAvailabilityUpdateInput, BarberAvailabilityUncheckedUpdateInput>
  }

  /**
   * BarberAvailability delete
   */
  export type BarberAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which BarberAvailability to delete.
     */
    where: BarberAvailabilityWhereUniqueInput
  }

  /**
   * BarberAvailability deleteMany
   */
  export type BarberAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberAvailabilities to delete
     */
    where?: BarberAvailabilityWhereInput
    /**
     * Limit how many BarberAvailabilities to delete.
     */
    limit?: number
  }

  /**
   * BarberAvailability without action
   */
  export type BarberAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberAvailability
     */
    select?: BarberAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberAvailability
     */
    omit?: BarberAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    totalPriceMillimes: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    totalPriceMillimes: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    barberId: string | null
    startAt: Date | null
    endAt: Date | null
    status: $Enums.AppointmentStatus | null
    totalPriceMillimes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    barberId: string | null
    startAt: Date | null
    endAt: Date | null
    status: $Enums.AppointmentStatus | null
    totalPriceMillimes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    clientId: number
    barberId: number
    startAt: number
    endAt: number
    status: number
    totalPriceMillimes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    totalPriceMillimes?: true
  }

  export type AppointmentSumAggregateInputType = {
    totalPriceMillimes?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    clientId?: true
    barberId?: true
    startAt?: true
    endAt?: true
    status?: true
    totalPriceMillimes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    clientId?: true
    barberId?: true
    startAt?: true
    endAt?: true
    status?: true
    totalPriceMillimes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    clientId?: true
    barberId?: true
    startAt?: true
    endAt?: true
    status?: true
    totalPriceMillimes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    clientId: string
    barberId: string
    startAt: Date
    endAt: Date
    status: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    barberId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    totalPriceMillimes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
    services?: boolean | Appointment$servicesArgs<ExtArgs>
    review?: boolean | Appointment$reviewArgs<ExtArgs>
    _count?: boolean | AppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    barberId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    totalPriceMillimes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    barberId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    totalPriceMillimes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    clientId?: boolean
    barberId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    totalPriceMillimes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "barberId" | "startAt" | "endAt" | "status" | "totalPriceMillimes" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
    services?: boolean | Appointment$servicesArgs<ExtArgs>
    review?: boolean | Appointment$reviewArgs<ExtArgs>
    _count?: boolean | AppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      barber: Prisma.$BarberProfilePayload<ExtArgs>
      services: Prisma.$AppointmentServicePayload<ExtArgs>[]
      review: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      barberId: string
      startAt: Date
      endAt: Date
      status: $Enums.AppointmentStatus
      /**
       * Snapshot of the sum of its line items at booking time — service
       * prices can change later, but a confirmed booking's total shouldn't.
       */
      totalPriceMillimes: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    barber<T extends BarberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfileDefaultArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends Appointment$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends Appointment$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly clientId: FieldRef<"Appointment", 'String'>
    readonly barberId: FieldRef<"Appointment", 'String'>
    readonly startAt: FieldRef<"Appointment", 'DateTime'>
    readonly endAt: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly totalPriceMillimes: FieldRef<"Appointment", 'Int'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.services
   */
  export type Appointment$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    where?: AppointmentServiceWhereInput
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    cursor?: AppointmentServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentServiceScalarFieldEnum | AppointmentServiceScalarFieldEnum[]
  }

  /**
   * Appointment.review
   */
  export type Appointment$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model AppointmentService
   */

  export type AggregateAppointmentService = {
    _count: AppointmentServiceCountAggregateOutputType | null
    _avg: AppointmentServiceAvgAggregateOutputType | null
    _sum: AppointmentServiceSumAggregateOutputType | null
    _min: AppointmentServiceMinAggregateOutputType | null
    _max: AppointmentServiceMaxAggregateOutputType | null
  }

  export type AppointmentServiceAvgAggregateOutputType = {
    priceMillimesSnapshot: number | null
    durationMinutesSnapshot: number | null
  }

  export type AppointmentServiceSumAggregateOutputType = {
    priceMillimesSnapshot: number | null
    durationMinutesSnapshot: number | null
  }

  export type AppointmentServiceMinAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    serviceId: string | null
    nameSnapshot: string | null
    priceMillimesSnapshot: number | null
    durationMinutesSnapshot: number | null
  }

  export type AppointmentServiceMaxAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    serviceId: string | null
    nameSnapshot: string | null
    priceMillimesSnapshot: number | null
    durationMinutesSnapshot: number | null
  }

  export type AppointmentServiceCountAggregateOutputType = {
    id: number
    appointmentId: number
    serviceId: number
    nameSnapshot: number
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
    _all: number
  }


  export type AppointmentServiceAvgAggregateInputType = {
    priceMillimesSnapshot?: true
    durationMinutesSnapshot?: true
  }

  export type AppointmentServiceSumAggregateInputType = {
    priceMillimesSnapshot?: true
    durationMinutesSnapshot?: true
  }

  export type AppointmentServiceMinAggregateInputType = {
    id?: true
    appointmentId?: true
    serviceId?: true
    nameSnapshot?: true
    priceMillimesSnapshot?: true
    durationMinutesSnapshot?: true
  }

  export type AppointmentServiceMaxAggregateInputType = {
    id?: true
    appointmentId?: true
    serviceId?: true
    nameSnapshot?: true
    priceMillimesSnapshot?: true
    durationMinutesSnapshot?: true
  }

  export type AppointmentServiceCountAggregateInputType = {
    id?: true
    appointmentId?: true
    serviceId?: true
    nameSnapshot?: true
    priceMillimesSnapshot?: true
    durationMinutesSnapshot?: true
    _all?: true
  }

  export type AppointmentServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppointmentService to aggregate.
     */
    where?: AppointmentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppointmentServices to fetch.
     */
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppointmentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppointmentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppointmentServices
    **/
    _count?: true | AppointmentServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentServiceMaxAggregateInputType
  }

  export type GetAppointmentServiceAggregateType<T extends AppointmentServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointmentService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointmentService[P]>
      : GetScalarType<T[P], AggregateAppointmentService[P]>
  }




  export type AppointmentServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentServiceWhereInput
    orderBy?: AppointmentServiceOrderByWithAggregationInput | AppointmentServiceOrderByWithAggregationInput[]
    by: AppointmentServiceScalarFieldEnum[] | AppointmentServiceScalarFieldEnum
    having?: AppointmentServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentServiceCountAggregateInputType | true
    _avg?: AppointmentServiceAvgAggregateInputType
    _sum?: AppointmentServiceSumAggregateInputType
    _min?: AppointmentServiceMinAggregateInputType
    _max?: AppointmentServiceMaxAggregateInputType
  }

  export type AppointmentServiceGroupByOutputType = {
    id: string
    appointmentId: string
    serviceId: string | null
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
    _count: AppointmentServiceCountAggregateOutputType | null
    _avg: AppointmentServiceAvgAggregateOutputType | null
    _sum: AppointmentServiceSumAggregateOutputType | null
    _min: AppointmentServiceMinAggregateOutputType | null
    _max: AppointmentServiceMaxAggregateOutputType | null
  }

  type GetAppointmentServiceGroupByPayload<T extends AppointmentServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentServiceGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentServiceGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    serviceId?: boolean
    nameSnapshot?: boolean
    priceMillimesSnapshot?: boolean
    durationMinutesSnapshot?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["appointmentService"]>

  export type AppointmentServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    serviceId?: boolean
    nameSnapshot?: boolean
    priceMillimesSnapshot?: boolean
    durationMinutesSnapshot?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["appointmentService"]>

  export type AppointmentServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    serviceId?: boolean
    nameSnapshot?: boolean
    priceMillimesSnapshot?: boolean
    durationMinutesSnapshot?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["appointmentService"]>

  export type AppointmentServiceSelectScalar = {
    id?: boolean
    appointmentId?: boolean
    serviceId?: boolean
    nameSnapshot?: boolean
    priceMillimesSnapshot?: boolean
    durationMinutesSnapshot?: boolean
  }

  export type AppointmentServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "appointmentId" | "serviceId" | "nameSnapshot" | "priceMillimesSnapshot" | "durationMinutesSnapshot", ExtArgs["result"]["appointmentService"]>
  export type AppointmentServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }
  export type AppointmentServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }
  export type AppointmentServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    service?: boolean | AppointmentService$serviceArgs<ExtArgs>
  }

  export type $AppointmentServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppointmentService"
    objects: {
      appointment: Prisma.$AppointmentPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      appointmentId: string
      /**
       * Nullable + SetNull: losing the catalog link on Service deletion is
       * fine because the snapshot fields below preserve what the client
       * actually booked.
       */
      serviceId: string | null
      nameSnapshot: string
      priceMillimesSnapshot: number
      durationMinutesSnapshot: number
    }, ExtArgs["result"]["appointmentService"]>
    composites: {}
  }

  type AppointmentServiceGetPayload<S extends boolean | null | undefined | AppointmentServiceDefaultArgs> = $Result.GetResult<Prisma.$AppointmentServicePayload, S>

  type AppointmentServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentServiceCountAggregateInputType | true
    }

  export interface AppointmentServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppointmentService'], meta: { name: 'AppointmentService' } }
    /**
     * Find zero or one AppointmentService that matches the filter.
     * @param {AppointmentServiceFindUniqueArgs} args - Arguments to find a AppointmentService
     * @example
     * // Get one AppointmentService
     * const appointmentService = await prisma.appointmentService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentServiceFindUniqueArgs>(args: SelectSubset<T, AppointmentServiceFindUniqueArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppointmentService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentServiceFindUniqueOrThrowArgs} args - Arguments to find a AppointmentService
     * @example
     * // Get one AppointmentService
     * const appointmentService = await prisma.appointmentService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppointmentService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceFindFirstArgs} args - Arguments to find a AppointmentService
     * @example
     * // Get one AppointmentService
     * const appointmentService = await prisma.appointmentService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentServiceFindFirstArgs>(args?: SelectSubset<T, AppointmentServiceFindFirstArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppointmentService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceFindFirstOrThrowArgs} args - Arguments to find a AppointmentService
     * @example
     * // Get one AppointmentService
     * const appointmentService = await prisma.appointmentService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppointmentServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppointmentServices
     * const appointmentServices = await prisma.appointmentService.findMany()
     * 
     * // Get first 10 AppointmentServices
     * const appointmentServices = await prisma.appointmentService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentServiceWithIdOnly = await prisma.appointmentService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentServiceFindManyArgs>(args?: SelectSubset<T, AppointmentServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppointmentService.
     * @param {AppointmentServiceCreateArgs} args - Arguments to create a AppointmentService.
     * @example
     * // Create one AppointmentService
     * const AppointmentService = await prisma.appointmentService.create({
     *   data: {
     *     // ... data to create a AppointmentService
     *   }
     * })
     * 
     */
    create<T extends AppointmentServiceCreateArgs>(args: SelectSubset<T, AppointmentServiceCreateArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppointmentServices.
     * @param {AppointmentServiceCreateManyArgs} args - Arguments to create many AppointmentServices.
     * @example
     * // Create many AppointmentServices
     * const appointmentService = await prisma.appointmentService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentServiceCreateManyArgs>(args?: SelectSubset<T, AppointmentServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppointmentServices and returns the data saved in the database.
     * @param {AppointmentServiceCreateManyAndReturnArgs} args - Arguments to create many AppointmentServices.
     * @example
     * // Create many AppointmentServices
     * const appointmentService = await prisma.appointmentService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppointmentServices and only return the `id`
     * const appointmentServiceWithIdOnly = await prisma.appointmentService.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppointmentService.
     * @param {AppointmentServiceDeleteArgs} args - Arguments to delete one AppointmentService.
     * @example
     * // Delete one AppointmentService
     * const AppointmentService = await prisma.appointmentService.delete({
     *   where: {
     *     // ... filter to delete one AppointmentService
     *   }
     * })
     * 
     */
    delete<T extends AppointmentServiceDeleteArgs>(args: SelectSubset<T, AppointmentServiceDeleteArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppointmentService.
     * @param {AppointmentServiceUpdateArgs} args - Arguments to update one AppointmentService.
     * @example
     * // Update one AppointmentService
     * const appointmentService = await prisma.appointmentService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentServiceUpdateArgs>(args: SelectSubset<T, AppointmentServiceUpdateArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppointmentServices.
     * @param {AppointmentServiceDeleteManyArgs} args - Arguments to filter AppointmentServices to delete.
     * @example
     * // Delete a few AppointmentServices
     * const { count } = await prisma.appointmentService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentServiceDeleteManyArgs>(args?: SelectSubset<T, AppointmentServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppointmentServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppointmentServices
     * const appointmentService = await prisma.appointmentService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentServiceUpdateManyArgs>(args: SelectSubset<T, AppointmentServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppointmentServices and returns the data updated in the database.
     * @param {AppointmentServiceUpdateManyAndReturnArgs} args - Arguments to update many AppointmentServices.
     * @example
     * // Update many AppointmentServices
     * const appointmentService = await prisma.appointmentService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppointmentServices and only return the `id`
     * const appointmentServiceWithIdOnly = await prisma.appointmentService.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppointmentService.
     * @param {AppointmentServiceUpsertArgs} args - Arguments to update or create a AppointmentService.
     * @example
     * // Update or create a AppointmentService
     * const appointmentService = await prisma.appointmentService.upsert({
     *   create: {
     *     // ... data to create a AppointmentService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppointmentService we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentServiceUpsertArgs>(args: SelectSubset<T, AppointmentServiceUpsertArgs<ExtArgs>>): Prisma__AppointmentServiceClient<$Result.GetResult<Prisma.$AppointmentServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppointmentServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceCountArgs} args - Arguments to filter AppointmentServices to count.
     * @example
     * // Count the number of AppointmentServices
     * const count = await prisma.appointmentService.count({
     *   where: {
     *     // ... the filter for the AppointmentServices we want to count
     *   }
     * })
    **/
    count<T extends AppointmentServiceCountArgs>(
      args?: Subset<T, AppointmentServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppointmentService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentServiceAggregateArgs>(args: Subset<T, AppointmentServiceAggregateArgs>): Prisma.PrismaPromise<GetAppointmentServiceAggregateType<T>>

    /**
     * Group by AppointmentService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentServiceGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppointmentService model
   */
  readonly fields: AppointmentServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppointmentService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointment<T extends AppointmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppointmentDefaultArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends AppointmentService$serviceArgs<ExtArgs> = {}>(args?: Subset<T, AppointmentService$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppointmentService model
   */
  interface AppointmentServiceFieldRefs {
    readonly id: FieldRef<"AppointmentService", 'String'>
    readonly appointmentId: FieldRef<"AppointmentService", 'String'>
    readonly serviceId: FieldRef<"AppointmentService", 'String'>
    readonly nameSnapshot: FieldRef<"AppointmentService", 'String'>
    readonly priceMillimesSnapshot: FieldRef<"AppointmentService", 'Int'>
    readonly durationMinutesSnapshot: FieldRef<"AppointmentService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AppointmentService findUnique
   */
  export type AppointmentServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AppointmentService to fetch.
     */
    where: AppointmentServiceWhereUniqueInput
  }

  /**
   * AppointmentService findUniqueOrThrow
   */
  export type AppointmentServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AppointmentService to fetch.
     */
    where: AppointmentServiceWhereUniqueInput
  }

  /**
   * AppointmentService findFirst
   */
  export type AppointmentServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AppointmentService to fetch.
     */
    where?: AppointmentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppointmentServices to fetch.
     */
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppointmentServices.
     */
    cursor?: AppointmentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppointmentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppointmentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppointmentServices.
     */
    distinct?: AppointmentServiceScalarFieldEnum | AppointmentServiceScalarFieldEnum[]
  }

  /**
   * AppointmentService findFirstOrThrow
   */
  export type AppointmentServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AppointmentService to fetch.
     */
    where?: AppointmentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppointmentServices to fetch.
     */
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppointmentServices.
     */
    cursor?: AppointmentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppointmentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppointmentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppointmentServices.
     */
    distinct?: AppointmentServiceScalarFieldEnum | AppointmentServiceScalarFieldEnum[]
  }

  /**
   * AppointmentService findMany
   */
  export type AppointmentServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AppointmentServices to fetch.
     */
    where?: AppointmentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppointmentServices to fetch.
     */
    orderBy?: AppointmentServiceOrderByWithRelationInput | AppointmentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppointmentServices.
     */
    cursor?: AppointmentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppointmentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppointmentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppointmentServices.
     */
    distinct?: AppointmentServiceScalarFieldEnum | AppointmentServiceScalarFieldEnum[]
  }

  /**
   * AppointmentService create
   */
  export type AppointmentServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a AppointmentService.
     */
    data: XOR<AppointmentServiceCreateInput, AppointmentServiceUncheckedCreateInput>
  }

  /**
   * AppointmentService createMany
   */
  export type AppointmentServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppointmentServices.
     */
    data: AppointmentServiceCreateManyInput | AppointmentServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppointmentService createManyAndReturn
   */
  export type AppointmentServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * The data used to create many AppointmentServices.
     */
    data: AppointmentServiceCreateManyInput | AppointmentServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppointmentService update
   */
  export type AppointmentServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a AppointmentService.
     */
    data: XOR<AppointmentServiceUpdateInput, AppointmentServiceUncheckedUpdateInput>
    /**
     * Choose, which AppointmentService to update.
     */
    where: AppointmentServiceWhereUniqueInput
  }

  /**
   * AppointmentService updateMany
   */
  export type AppointmentServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppointmentServices.
     */
    data: XOR<AppointmentServiceUpdateManyMutationInput, AppointmentServiceUncheckedUpdateManyInput>
    /**
     * Filter which AppointmentServices to update
     */
    where?: AppointmentServiceWhereInput
    /**
     * Limit how many AppointmentServices to update.
     */
    limit?: number
  }

  /**
   * AppointmentService updateManyAndReturn
   */
  export type AppointmentServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * The data used to update AppointmentServices.
     */
    data: XOR<AppointmentServiceUpdateManyMutationInput, AppointmentServiceUncheckedUpdateManyInput>
    /**
     * Filter which AppointmentServices to update
     */
    where?: AppointmentServiceWhereInput
    /**
     * Limit how many AppointmentServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppointmentService upsert
   */
  export type AppointmentServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the AppointmentService to update in case it exists.
     */
    where: AppointmentServiceWhereUniqueInput
    /**
     * In case the AppointmentService found by the `where` argument doesn't exist, create a new AppointmentService with this data.
     */
    create: XOR<AppointmentServiceCreateInput, AppointmentServiceUncheckedCreateInput>
    /**
     * In case the AppointmentService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentServiceUpdateInput, AppointmentServiceUncheckedUpdateInput>
  }

  /**
   * AppointmentService delete
   */
  export type AppointmentServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
    /**
     * Filter which AppointmentService to delete.
     */
    where: AppointmentServiceWhereUniqueInput
  }

  /**
   * AppointmentService deleteMany
   */
  export type AppointmentServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppointmentServices to delete
     */
    where?: AppointmentServiceWhereInput
    /**
     * Limit how many AppointmentServices to delete.
     */
    limit?: number
  }

  /**
   * AppointmentService.service
   */
  export type AppointmentService$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * AppointmentService without action
   */
  export type AppointmentServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentService
     */
    select?: AppointmentServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppointmentService
     */
    omit?: AppointmentServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentServiceInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    authorId: string | null
    barberId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    authorId: string | null
    barberId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    appointmentId: number
    authorId: number
    barberId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    appointmentId?: true
    authorId?: true
    barberId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    appointmentId?: true
    authorId?: true
    barberId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    appointmentId?: true
    authorId?: true
    barberId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    appointmentId: string
    authorId: string
    barberId: string
    rating: number
    comment: string | null
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    authorId?: boolean
    barberId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    authorId?: boolean
    barberId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    authorId?: boolean
    barberId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    appointmentId?: boolean
    authorId?: boolean
    barberId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "appointmentId" | "authorId" | "barberId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      appointment: Prisma.$AppointmentPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      barber: Prisma.$BarberProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      appointmentId: string
      authorId: string
      barberId: string
      /**
       * 1-5; Prisma has no CHECK constraint support, so this range is
       * enforced in the application layer (e.g. a Zod schema at the API
       * boundary).
       */
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointment<T extends AppointmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppointmentDefaultArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    barber<T extends BarberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfileDefaultArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly appointmentId: FieldRef<"Review", 'String'>
    readonly authorId: FieldRef<"Review", 'String'>
    readonly barberId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    barberId: string | null
    planType: $Enums.PlanType | null
    status: $Enums.SubscriptionStatus | null
    startedAt: Date | null
    endsAt: Date | null
    createdAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    barberId: string | null
    planType: $Enums.PlanType | null
    status: $Enums.SubscriptionStatus | null
    startedAt: Date | null
    endsAt: Date | null
    createdAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    barberId: number
    planType: number
    status: number
    startedAt: number
    endsAt: number
    createdAt: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    barberId?: true
    planType?: true
    status?: true
    startedAt?: true
    endsAt?: true
    createdAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    barberId?: true
    planType?: true
    status?: true
    startedAt?: true
    endsAt?: true
    createdAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    barberId?: true
    planType?: true
    status?: true
    startedAt?: true
    endsAt?: true
    createdAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    barberId: string
    planType: $Enums.PlanType
    status: $Enums.SubscriptionStatus
    startedAt: Date
    endsAt: Date | null
    createdAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    planType?: boolean
    status?: boolean
    startedAt?: boolean
    endsAt?: boolean
    createdAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    planType?: boolean
    status?: boolean
    startedAt?: boolean
    endsAt?: boolean
    createdAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    planType?: boolean
    status?: boolean
    startedAt?: boolean
    endsAt?: boolean
    createdAt?: boolean
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    barberId?: boolean
    planType?: boolean
    status?: boolean
    startedAt?: boolean
    endsAt?: boolean
    createdAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barberId" | "planType" | "status" | "startedAt" | "endsAt" | "createdAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberProfileDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      barber: Prisma.$BarberProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barberId: string
      planType: $Enums.PlanType
      status: $Enums.SubscriptionStatus
      startedAt: Date
      endsAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barber<T extends BarberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberProfileDefaultArgs<ExtArgs>>): Prisma__BarberProfileClient<$Result.GetResult<Prisma.$BarberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly barberId: FieldRef<"Subscription", 'String'>
    readonly planType: FieldRef<"Subscription", 'PlanType'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly startedAt: FieldRef<"Subscription", 'DateTime'>
    readonly endsAt: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    name: 'name',
    avatarUrl: 'avatarUrl',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BarberProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    businessName: 'businessName',
    bio: 'bio',
    governorate: 'governorate',
    address: 'address',
    avatarUrl: 'avatarUrl',
    coverImageUrl: 'coverImageUrl',
    avgRating: 'avgRating',
    reviewCount: 'reviewCount',
    planType: 'planType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BarberProfileScalarFieldEnum = (typeof BarberProfileScalarFieldEnum)[keyof typeof BarberProfileScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    barberId: 'barberId',
    name: 'name',
    description: 'description',
    durationMinutes: 'durationMinutes',
    priceMillimes: 'priceMillimes',
    categories: 'categories',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const BarberAvailabilityScalarFieldEnum: {
    id: 'id',
    barberId: 'barberId',
    dayOfWeek: 'dayOfWeek',
    startMinute: 'startMinute',
    endMinute: 'endMinute'
  };

  export type BarberAvailabilityScalarFieldEnum = (typeof BarberAvailabilityScalarFieldEnum)[keyof typeof BarberAvailabilityScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    barberId: 'barberId',
    startAt: 'startAt',
    endAt: 'endAt',
    status: 'status',
    totalPriceMillimes: 'totalPriceMillimes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const AppointmentServiceScalarFieldEnum: {
    id: 'id',
    appointmentId: 'appointmentId',
    serviceId: 'serviceId',
    nameSnapshot: 'nameSnapshot',
    priceMillimesSnapshot: 'priceMillimesSnapshot',
    durationMinutesSnapshot: 'durationMinutesSnapshot'
  };

  export type AppointmentServiceScalarFieldEnum = (typeof AppointmentServiceScalarFieldEnum)[keyof typeof AppointmentServiceScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    appointmentId: 'appointmentId',
    authorId: 'authorId',
    barberId: 'barberId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    barberId: 'barberId',
    planType: 'planType',
    status: 'status',
    startedAt: 'startedAt',
    endsAt: 'endsAt',
    createdAt: 'createdAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Governorate'
   */
  export type EnumGovernorateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Governorate'>
    


  /**
   * Reference to a field of type 'Governorate[]'
   */
  export type ListEnumGovernorateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Governorate[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PlanType'
   */
  export type EnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType'>
    


  /**
   * Reference to a field of type 'PlanType[]'
   */
  export type ListEnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType[]'>
    


  /**
   * Reference to a field of type 'ServiceCategory[]'
   */
  export type ListEnumServiceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategory[]'>
    


  /**
   * Reference to a field of type 'ServiceCategory'
   */
  export type EnumServiceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategory'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    barberProfile?: XOR<BarberProfileNullableScalarRelationFilter, BarberProfileWhereInput> | null
    appointmentsAsClient?: AppointmentListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barberProfile?: BarberProfileOrderByWithRelationInput
    appointmentsAsClient?: AppointmentOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    barberProfile?: XOR<BarberProfileNullableScalarRelationFilter, BarberProfileWhereInput> | null
    appointmentsAsClient?: AppointmentListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BarberProfileWhereInput = {
    AND?: BarberProfileWhereInput | BarberProfileWhereInput[]
    OR?: BarberProfileWhereInput[]
    NOT?: BarberProfileWhereInput | BarberProfileWhereInput[]
    id?: StringFilter<"BarberProfile"> | string
    userId?: StringFilter<"BarberProfile"> | string
    businessName?: StringFilter<"BarberProfile"> | string
    bio?: StringNullableFilter<"BarberProfile"> | string | null
    governorate?: EnumGovernorateFilter<"BarberProfile"> | $Enums.Governorate
    address?: StringNullableFilter<"BarberProfile"> | string | null
    avatarUrl?: StringNullableFilter<"BarberProfile"> | string | null
    coverImageUrl?: StringNullableFilter<"BarberProfile"> | string | null
    avgRating?: FloatFilter<"BarberProfile"> | number
    reviewCount?: IntFilter<"BarberProfile"> | number
    planType?: EnumPlanTypeFilter<"BarberProfile"> | $Enums.PlanType
    createdAt?: DateTimeFilter<"BarberProfile"> | Date | string
    updatedAt?: DateTimeFilter<"BarberProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    availability?: BarberAvailabilityListRelationFilter
    appointments?: AppointmentListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type BarberProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    bio?: SortOrderInput | SortOrder
    governorate?: SortOrder
    address?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    avgRating?: SortOrder
    reviewCount?: SortOrder
    planType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
    availability?: BarberAvailabilityOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type BarberProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: BarberProfileWhereInput | BarberProfileWhereInput[]
    OR?: BarberProfileWhereInput[]
    NOT?: BarberProfileWhereInput | BarberProfileWhereInput[]
    businessName?: StringFilter<"BarberProfile"> | string
    bio?: StringNullableFilter<"BarberProfile"> | string | null
    governorate?: EnumGovernorateFilter<"BarberProfile"> | $Enums.Governorate
    address?: StringNullableFilter<"BarberProfile"> | string | null
    avatarUrl?: StringNullableFilter<"BarberProfile"> | string | null
    coverImageUrl?: StringNullableFilter<"BarberProfile"> | string | null
    avgRating?: FloatFilter<"BarberProfile"> | number
    reviewCount?: IntFilter<"BarberProfile"> | number
    planType?: EnumPlanTypeFilter<"BarberProfile"> | $Enums.PlanType
    createdAt?: DateTimeFilter<"BarberProfile"> | Date | string
    updatedAt?: DateTimeFilter<"BarberProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    availability?: BarberAvailabilityListRelationFilter
    appointments?: AppointmentListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "userId">

  export type BarberProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    bio?: SortOrderInput | SortOrder
    governorate?: SortOrder
    address?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    avgRating?: SortOrder
    reviewCount?: SortOrder
    planType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BarberProfileCountOrderByAggregateInput
    _avg?: BarberProfileAvgOrderByAggregateInput
    _max?: BarberProfileMaxOrderByAggregateInput
    _min?: BarberProfileMinOrderByAggregateInput
    _sum?: BarberProfileSumOrderByAggregateInput
  }

  export type BarberProfileScalarWhereWithAggregatesInput = {
    AND?: BarberProfileScalarWhereWithAggregatesInput | BarberProfileScalarWhereWithAggregatesInput[]
    OR?: BarberProfileScalarWhereWithAggregatesInput[]
    NOT?: BarberProfileScalarWhereWithAggregatesInput | BarberProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BarberProfile"> | string
    userId?: StringWithAggregatesFilter<"BarberProfile"> | string
    businessName?: StringWithAggregatesFilter<"BarberProfile"> | string
    bio?: StringNullableWithAggregatesFilter<"BarberProfile"> | string | null
    governorate?: EnumGovernorateWithAggregatesFilter<"BarberProfile"> | $Enums.Governorate
    address?: StringNullableWithAggregatesFilter<"BarberProfile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"BarberProfile"> | string | null
    coverImageUrl?: StringNullableWithAggregatesFilter<"BarberProfile"> | string | null
    avgRating?: FloatWithAggregatesFilter<"BarberProfile"> | number
    reviewCount?: IntWithAggregatesFilter<"BarberProfile"> | number
    planType?: EnumPlanTypeWithAggregatesFilter<"BarberProfile"> | $Enums.PlanType
    createdAt?: DateTimeWithAggregatesFilter<"BarberProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BarberProfile"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    barberId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    durationMinutes?: IntFilter<"Service"> | number
    priceMillimes?: IntFilter<"Service"> | number
    categories?: EnumServiceCategoryNullableListFilter<"Service">
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
    appointmentServices?: AppointmentServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    barberId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
    categories?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    barber?: BarberProfileOrderByWithRelationInput
    appointmentServices?: AppointmentServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    barberId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    durationMinutes?: IntFilter<"Service"> | number
    priceMillimes?: IntFilter<"Service"> | number
    categories?: EnumServiceCategoryNullableListFilter<"Service">
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
    appointmentServices?: AppointmentServiceListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    barberId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
    categories?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    barberId?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    durationMinutes?: IntWithAggregatesFilter<"Service"> | number
    priceMillimes?: IntWithAggregatesFilter<"Service"> | number
    categories?: EnumServiceCategoryNullableListFilter<"Service">
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type BarberAvailabilityWhereInput = {
    AND?: BarberAvailabilityWhereInput | BarberAvailabilityWhereInput[]
    OR?: BarberAvailabilityWhereInput[]
    NOT?: BarberAvailabilityWhereInput | BarberAvailabilityWhereInput[]
    id?: StringFilter<"BarberAvailability"> | string
    barberId?: StringFilter<"BarberAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"BarberAvailability"> | $Enums.DayOfWeek
    startMinute?: IntFilter<"BarberAvailability"> | number
    endMinute?: IntFilter<"BarberAvailability"> | number
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }

  export type BarberAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    barberId?: SortOrder
    dayOfWeek?: SortOrder
    startMinute?: SortOrder
    endMinute?: SortOrder
    barber?: BarberProfileOrderByWithRelationInput
  }

  export type BarberAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BarberAvailabilityWhereInput | BarberAvailabilityWhereInput[]
    OR?: BarberAvailabilityWhereInput[]
    NOT?: BarberAvailabilityWhereInput | BarberAvailabilityWhereInput[]
    barberId?: StringFilter<"BarberAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"BarberAvailability"> | $Enums.DayOfWeek
    startMinute?: IntFilter<"BarberAvailability"> | number
    endMinute?: IntFilter<"BarberAvailability"> | number
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }, "id">

  export type BarberAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    barberId?: SortOrder
    dayOfWeek?: SortOrder
    startMinute?: SortOrder
    endMinute?: SortOrder
    _count?: BarberAvailabilityCountOrderByAggregateInput
    _avg?: BarberAvailabilityAvgOrderByAggregateInput
    _max?: BarberAvailabilityMaxOrderByAggregateInput
    _min?: BarberAvailabilityMinOrderByAggregateInput
    _sum?: BarberAvailabilitySumOrderByAggregateInput
  }

  export type BarberAvailabilityScalarWhereWithAggregatesInput = {
    AND?: BarberAvailabilityScalarWhereWithAggregatesInput | BarberAvailabilityScalarWhereWithAggregatesInput[]
    OR?: BarberAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: BarberAvailabilityScalarWhereWithAggregatesInput | BarberAvailabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BarberAvailability"> | string
    barberId?: StringWithAggregatesFilter<"BarberAvailability"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"BarberAvailability"> | $Enums.DayOfWeek
    startMinute?: IntWithAggregatesFilter<"BarberAvailability"> | number
    endMinute?: IntWithAggregatesFilter<"BarberAvailability"> | number
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    barberId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
    services?: AppointmentServiceListRelationFilter
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    barberId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    totalPriceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: UserOrderByWithRelationInput
    barber?: BarberProfileOrderByWithRelationInput
    services?: AppointmentServiceOrderByRelationAggregateInput
    review?: ReviewOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    clientId?: StringFilter<"Appointment"> | string
    barberId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
    services?: AppointmentServiceListRelationFilter
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    barberId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    totalPriceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    clientId?: StringWithAggregatesFilter<"Appointment"> | string
    barberId?: StringWithAggregatesFilter<"Appointment"> | string
    startAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    totalPriceMillimes?: IntWithAggregatesFilter<"Appointment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type AppointmentServiceWhereInput = {
    AND?: AppointmentServiceWhereInput | AppointmentServiceWhereInput[]
    OR?: AppointmentServiceWhereInput[]
    NOT?: AppointmentServiceWhereInput | AppointmentServiceWhereInput[]
    id?: StringFilter<"AppointmentService"> | string
    appointmentId?: StringFilter<"AppointmentService"> | string
    serviceId?: StringNullableFilter<"AppointmentService"> | string | null
    nameSnapshot?: StringFilter<"AppointmentService"> | string
    priceMillimesSnapshot?: IntFilter<"AppointmentService"> | number
    durationMinutesSnapshot?: IntFilter<"AppointmentService"> | number
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }

  export type AppointmentServiceOrderByWithRelationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    nameSnapshot?: SortOrder
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
    appointment?: AppointmentOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type AppointmentServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appointmentId_serviceId?: AppointmentServiceAppointmentIdServiceIdCompoundUniqueInput
    AND?: AppointmentServiceWhereInput | AppointmentServiceWhereInput[]
    OR?: AppointmentServiceWhereInput[]
    NOT?: AppointmentServiceWhereInput | AppointmentServiceWhereInput[]
    appointmentId?: StringFilter<"AppointmentService"> | string
    serviceId?: StringNullableFilter<"AppointmentService"> | string | null
    nameSnapshot?: StringFilter<"AppointmentService"> | string
    priceMillimesSnapshot?: IntFilter<"AppointmentService"> | number
    durationMinutesSnapshot?: IntFilter<"AppointmentService"> | number
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }, "id" | "appointmentId_serviceId">

  export type AppointmentServiceOrderByWithAggregationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    nameSnapshot?: SortOrder
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
    _count?: AppointmentServiceCountOrderByAggregateInput
    _avg?: AppointmentServiceAvgOrderByAggregateInput
    _max?: AppointmentServiceMaxOrderByAggregateInput
    _min?: AppointmentServiceMinOrderByAggregateInput
    _sum?: AppointmentServiceSumOrderByAggregateInput
  }

  export type AppointmentServiceScalarWhereWithAggregatesInput = {
    AND?: AppointmentServiceScalarWhereWithAggregatesInput | AppointmentServiceScalarWhereWithAggregatesInput[]
    OR?: AppointmentServiceScalarWhereWithAggregatesInput[]
    NOT?: AppointmentServiceScalarWhereWithAggregatesInput | AppointmentServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppointmentService"> | string
    appointmentId?: StringWithAggregatesFilter<"AppointmentService"> | string
    serviceId?: StringNullableWithAggregatesFilter<"AppointmentService"> | string | null
    nameSnapshot?: StringWithAggregatesFilter<"AppointmentService"> | string
    priceMillimesSnapshot?: IntWithAggregatesFilter<"AppointmentService"> | number
    durationMinutesSnapshot?: IntWithAggregatesFilter<"AppointmentService"> | number
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    appointmentId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    barberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    authorId?: SortOrder
    barberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    appointment?: AppointmentOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    barber?: BarberProfileOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appointmentId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    authorId?: StringFilter<"Review"> | string
    barberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }, "id" | "appointmentId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    authorId?: SortOrder
    barberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    appointmentId?: StringWithAggregatesFilter<"Review"> | string
    authorId?: StringWithAggregatesFilter<"Review"> | string
    barberId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    barberId?: StringFilter<"Subscription"> | string
    planType?: EnumPlanTypeFilter<"Subscription"> | $Enums.PlanType
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    startedAt?: DateTimeFilter<"Subscription"> | Date | string
    endsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    barberId?: SortOrder
    planType?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    barber?: BarberProfileOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    barberId?: StringFilter<"Subscription"> | string
    planType?: EnumPlanTypeFilter<"Subscription"> | $Enums.PlanType
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    startedAt?: DateTimeFilter<"Subscription"> | Date | string
    endsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    barber?: XOR<BarberProfileScalarRelationFilter, BarberProfileWhereInput>
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    barberId?: SortOrder
    planType?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    barberId?: StringWithAggregatesFilter<"Subscription"> | string
    planType?: EnumPlanTypeWithAggregatesFilter<"Subscription"> | $Enums.PlanType
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    startedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    endsAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileCreateNestedOneWithoutUserInput
    appointmentsAsClient?: AppointmentCreateNestedManyWithoutClientInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileUncheckedCreateNestedOneWithoutUserInput
    appointmentsAsClient?: AppointmentUncheckedCreateNestedManyWithoutClientInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUpdateOneWithoutUserNestedInput
    appointmentsAsClient?: AppointmentUpdateManyWithoutClientNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUncheckedUpdateOneWithoutUserNestedInput
    appointmentsAsClient?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberProfileCreateInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    services?: ServiceCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    services?: ServiceUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileCreateManyInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarberProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
    barber: BarberProfileCreateNestedOneWithoutServicesInput
    appointmentServices?: AppointmentServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    barberId: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
    appointmentServices?: AppointmentServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barber?: BarberProfileUpdateOneRequiredWithoutServicesNestedInput
    appointmentServices?: AppointmentServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointmentServices?: AppointmentServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    barberId: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberAvailabilityCreateInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
    barber: BarberProfileCreateNestedOneWithoutAvailabilityInput
  }

  export type BarberAvailabilityUncheckedCreateInput = {
    id?: string
    barberId: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
  }

  export type BarberAvailabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
    barber?: BarberProfileUpdateOneRequiredWithoutAvailabilityNestedInput
  }

  export type BarberAvailabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type BarberAvailabilityCreateManyInput = {
    id?: string
    barberId: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
  }

  export type BarberAvailabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type BarberAvailabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentCreateInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsAsClientInput
    barber: BarberProfileCreateNestedOneWithoutAppointmentsInput
    services?: AppointmentServiceCreateNestedManyWithoutAppointmentInput
    review?: ReviewCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    clientId: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: AppointmentServiceUncheckedCreateNestedManyWithoutAppointmentInput
    review?: ReviewUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsAsClientNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutAppointmentsNestedInput
    services?: AppointmentServiceUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: AppointmentServiceUncheckedUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentCreateManyInput = {
    id?: string
    clientId: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentServiceCreateInput = {
    id?: string
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
    appointment: AppointmentCreateNestedOneWithoutServicesInput
    service?: ServiceCreateNestedOneWithoutAppointmentServicesInput
  }

  export type AppointmentServiceUncheckedCreateInput = {
    id?: string
    appointmentId: string
    serviceId?: string | null
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
    appointment?: AppointmentUpdateOneRequiredWithoutServicesNestedInput
    service?: ServiceUpdateOneWithoutAppointmentServicesNestedInput
  }

  export type AppointmentServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentServiceCreateManyInput = {
    id?: string
    appointmentId: string
    serviceId?: string | null
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    appointment: AppointmentCreateNestedOneWithoutReviewInput
    author: UserCreateNestedOneWithoutReviewsInput
    barber: BarberProfileCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    appointmentId: string
    authorId: string
    barberId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneRequiredWithoutReviewNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    appointmentId: string
    authorId: string
    barberId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    barber: BarberProfileCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    barberId: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barber?: BarberProfileUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    barberId: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BarberProfileNullableScalarRelationFilter = {
    is?: BarberProfileWhereInput | null
    isNot?: BarberProfileWhereInput | null
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGovernorateFilter<$PrismaModel = never> = {
    equals?: $Enums.Governorate | EnumGovernorateFieldRefInput<$PrismaModel>
    in?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    notIn?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    not?: NestedEnumGovernorateFilter<$PrismaModel> | $Enums.Governorate
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type BarberAvailabilityListRelationFilter = {
    every?: BarberAvailabilityWhereInput
    some?: BarberAvailabilityWhereInput
    none?: BarberAvailabilityWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarberAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarberProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    bio?: SortOrder
    governorate?: SortOrder
    address?: SortOrder
    avatarUrl?: SortOrder
    coverImageUrl?: SortOrder
    avgRating?: SortOrder
    reviewCount?: SortOrder
    planType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarberProfileAvgOrderByAggregateInput = {
    avgRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BarberProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    bio?: SortOrder
    governorate?: SortOrder
    address?: SortOrder
    avatarUrl?: SortOrder
    coverImageUrl?: SortOrder
    avgRating?: SortOrder
    reviewCount?: SortOrder
    planType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarberProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    bio?: SortOrder
    governorate?: SortOrder
    address?: SortOrder
    avatarUrl?: SortOrder
    coverImageUrl?: SortOrder
    avgRating?: SortOrder
    reviewCount?: SortOrder
    planType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarberProfileSumOrderByAggregateInput = {
    avgRating?: SortOrder
    reviewCount?: SortOrder
  }

  export type EnumGovernorateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Governorate | EnumGovernorateFieldRefInput<$PrismaModel>
    in?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    notIn?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    not?: NestedEnumGovernorateWithAggregatesFilter<$PrismaModel> | $Enums.Governorate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGovernorateFilter<$PrismaModel>
    _max?: NestedEnumGovernorateFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type EnumServiceCategoryNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel> | null
    has?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    hasSome?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BarberProfileScalarRelationFilter = {
    is?: BarberProfileWhereInput
    isNot?: BarberProfileWhereInput
  }

  export type AppointmentServiceListRelationFilter = {
    every?: AppointmentServiceWhereInput
    some?: AppointmentServiceWhereInput
    none?: AppointmentServiceWhereInput
  }

  export type AppointmentServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
    categories?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    durationMinutes?: SortOrder
    priceMillimes?: SortOrder
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type BarberAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    dayOfWeek?: SortOrder
    startMinute?: SortOrder
    endMinute?: SortOrder
  }

  export type BarberAvailabilityAvgOrderByAggregateInput = {
    startMinute?: SortOrder
    endMinute?: SortOrder
  }

  export type BarberAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    dayOfWeek?: SortOrder
    startMinute?: SortOrder
    endMinute?: SortOrder
  }

  export type BarberAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    dayOfWeek?: SortOrder
    startMinute?: SortOrder
    endMinute?: SortOrder
  }

  export type BarberAvailabilitySumOrderByAggregateInput = {
    startMinute?: SortOrder
    endMinute?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type ReviewNullableScalarRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    barberId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    totalPriceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    totalPriceMillimes?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    barberId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    totalPriceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    barberId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    totalPriceMillimes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    totalPriceMillimes?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type AppointmentScalarRelationFilter = {
    is?: AppointmentWhereInput
    isNot?: AppointmentWhereInput
  }

  export type ServiceNullableScalarRelationFilter = {
    is?: ServiceWhereInput | null
    isNot?: ServiceWhereInput | null
  }

  export type AppointmentServiceAppointmentIdServiceIdCompoundUniqueInput = {
    appointmentId: string
    serviceId: string
  }

  export type AppointmentServiceCountOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    serviceId?: SortOrder
    nameSnapshot?: SortOrder
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
  }

  export type AppointmentServiceAvgOrderByAggregateInput = {
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
  }

  export type AppointmentServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    serviceId?: SortOrder
    nameSnapshot?: SortOrder
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
  }

  export type AppointmentServiceMinOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    serviceId?: SortOrder
    nameSnapshot?: SortOrder
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
  }

  export type AppointmentServiceSumOrderByAggregateInput = {
    priceMillimesSnapshot?: SortOrder
    durationMinutesSnapshot?: SortOrder
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    authorId?: SortOrder
    barberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    authorId?: SortOrder
    barberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    authorId?: SortOrder
    barberId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    planType?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    planType?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    planType?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BarberProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutUserInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BarberProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutUserInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BarberProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutUserInput
    upsert?: BarberProfileUpsertWithoutUserInput
    disconnect?: BarberProfileWhereInput | boolean
    delete?: BarberProfileWhereInput | boolean
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutUserInput, BarberProfileUpdateWithoutUserInput>, BarberProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BarberProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutUserInput
    upsert?: BarberProfileUpsertWithoutUserInput
    disconnect?: BarberProfileWhereInput | boolean
    delete?: BarberProfileWhereInput | boolean
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutUserInput, BarberProfileUpdateWithoutUserInput>, BarberProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBarberProfileInput = {
    create?: XOR<UserCreateWithoutBarberProfileInput, UserUncheckedCreateWithoutBarberProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutBarberProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutBarberInput = {
    create?: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput> | ServiceCreateWithoutBarberInput[] | ServiceUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBarberInput | ServiceCreateOrConnectWithoutBarberInput[]
    createMany?: ServiceCreateManyBarberInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type BarberAvailabilityCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput> | BarberAvailabilityCreateWithoutBarberInput[] | BarberAvailabilityUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberAvailabilityCreateOrConnectWithoutBarberInput | BarberAvailabilityCreateOrConnectWithoutBarberInput[]
    createMany?: BarberAvailabilityCreateManyBarberInputEnvelope
    connect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutBarberInput = {
    create?: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput> | AppointmentCreateWithoutBarberInput[] | AppointmentUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBarberInput | AppointmentCreateOrConnectWithoutBarberInput[]
    createMany?: AppointmentCreateManyBarberInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutBarberInput = {
    create?: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput> | SubscriptionCreateWithoutBarberInput[] | SubscriptionUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBarberInput | SubscriptionCreateOrConnectWithoutBarberInput[]
    createMany?: SubscriptionCreateManyBarberInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutBarberInput = {
    create?: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput> | ReviewCreateWithoutBarberInput[] | ReviewUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBarberInput | ReviewCreateOrConnectWithoutBarberInput[]
    createMany?: ReviewCreateManyBarberInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput> | ServiceCreateWithoutBarberInput[] | ServiceUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBarberInput | ServiceCreateOrConnectWithoutBarberInput[]
    createMany?: ServiceCreateManyBarberInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput> | BarberAvailabilityCreateWithoutBarberInput[] | BarberAvailabilityUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberAvailabilityCreateOrConnectWithoutBarberInput | BarberAvailabilityCreateOrConnectWithoutBarberInput[]
    createMany?: BarberAvailabilityCreateManyBarberInputEnvelope
    connect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput> | AppointmentCreateWithoutBarberInput[] | AppointmentUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBarberInput | AppointmentCreateOrConnectWithoutBarberInput[]
    createMany?: AppointmentCreateManyBarberInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput> | SubscriptionCreateWithoutBarberInput[] | SubscriptionUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBarberInput | SubscriptionCreateOrConnectWithoutBarberInput[]
    createMany?: SubscriptionCreateManyBarberInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput> | ReviewCreateWithoutBarberInput[] | ReviewUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBarberInput | ReviewCreateOrConnectWithoutBarberInput[]
    createMany?: ReviewCreateManyBarberInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type EnumGovernorateFieldUpdateOperationsInput = {
    set?: $Enums.Governorate
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type UserUpdateOneRequiredWithoutBarberProfileNestedInput = {
    create?: XOR<UserCreateWithoutBarberProfileInput, UserUncheckedCreateWithoutBarberProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutBarberProfileInput
    upsert?: UserUpsertWithoutBarberProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBarberProfileInput, UserUpdateWithoutBarberProfileInput>, UserUncheckedUpdateWithoutBarberProfileInput>
  }

  export type ServiceUpdateManyWithoutBarberNestedInput = {
    create?: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput> | ServiceCreateWithoutBarberInput[] | ServiceUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBarberInput | ServiceCreateOrConnectWithoutBarberInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBarberInput | ServiceUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: ServiceCreateManyBarberInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBarberInput | ServiceUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBarberInput | ServiceUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type BarberAvailabilityUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput> | BarberAvailabilityCreateWithoutBarberInput[] | BarberAvailabilityUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberAvailabilityCreateOrConnectWithoutBarberInput | BarberAvailabilityCreateOrConnectWithoutBarberInput[]
    upsert?: BarberAvailabilityUpsertWithWhereUniqueWithoutBarberInput | BarberAvailabilityUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberAvailabilityCreateManyBarberInputEnvelope
    set?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    disconnect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    delete?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    connect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    update?: BarberAvailabilityUpdateWithWhereUniqueWithoutBarberInput | BarberAvailabilityUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberAvailabilityUpdateManyWithWhereWithoutBarberInput | BarberAvailabilityUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberAvailabilityScalarWhereInput | BarberAvailabilityScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutBarberNestedInput = {
    create?: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput> | AppointmentCreateWithoutBarberInput[] | AppointmentUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBarberInput | AppointmentCreateOrConnectWithoutBarberInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutBarberInput | AppointmentUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: AppointmentCreateManyBarberInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutBarberInput | AppointmentUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutBarberInput | AppointmentUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutBarberNestedInput = {
    create?: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput> | SubscriptionCreateWithoutBarberInput[] | SubscriptionUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBarberInput | SubscriptionCreateOrConnectWithoutBarberInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutBarberInput | SubscriptionUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: SubscriptionCreateManyBarberInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutBarberInput | SubscriptionUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutBarberInput | SubscriptionUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutBarberNestedInput = {
    create?: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput> | ReviewCreateWithoutBarberInput[] | ReviewUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBarberInput | ReviewCreateOrConnectWithoutBarberInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBarberInput | ReviewUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: ReviewCreateManyBarberInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBarberInput | ReviewUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBarberInput | ReviewUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput> | ServiceCreateWithoutBarberInput[] | ServiceUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBarberInput | ServiceCreateOrConnectWithoutBarberInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBarberInput | ServiceUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: ServiceCreateManyBarberInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBarberInput | ServiceUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBarberInput | ServiceUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput> | BarberAvailabilityCreateWithoutBarberInput[] | BarberAvailabilityUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberAvailabilityCreateOrConnectWithoutBarberInput | BarberAvailabilityCreateOrConnectWithoutBarberInput[]
    upsert?: BarberAvailabilityUpsertWithWhereUniqueWithoutBarberInput | BarberAvailabilityUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberAvailabilityCreateManyBarberInputEnvelope
    set?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    disconnect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    delete?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    connect?: BarberAvailabilityWhereUniqueInput | BarberAvailabilityWhereUniqueInput[]
    update?: BarberAvailabilityUpdateWithWhereUniqueWithoutBarberInput | BarberAvailabilityUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberAvailabilityUpdateManyWithWhereWithoutBarberInput | BarberAvailabilityUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberAvailabilityScalarWhereInput | BarberAvailabilityScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput> | AppointmentCreateWithoutBarberInput[] | AppointmentUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBarberInput | AppointmentCreateOrConnectWithoutBarberInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutBarberInput | AppointmentUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: AppointmentCreateManyBarberInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutBarberInput | AppointmentUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutBarberInput | AppointmentUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput> | SubscriptionCreateWithoutBarberInput[] | SubscriptionUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBarberInput | SubscriptionCreateOrConnectWithoutBarberInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutBarberInput | SubscriptionUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: SubscriptionCreateManyBarberInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutBarberInput | SubscriptionUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutBarberInput | SubscriptionUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput> | ReviewCreateWithoutBarberInput[] | ReviewUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBarberInput | ReviewCreateOrConnectWithoutBarberInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBarberInput | ReviewUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: ReviewCreateManyBarberInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBarberInput | ReviewUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBarberInput | ReviewUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ServiceCreatecategoriesInput = {
    set: $Enums.ServiceCategory[]
  }

  export type BarberProfileCreateNestedOneWithoutServicesInput = {
    create?: XOR<BarberProfileCreateWithoutServicesInput, BarberProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutServicesInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type AppointmentServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput> | AppointmentServiceCreateWithoutServiceInput[] | AppointmentServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutServiceInput | AppointmentServiceCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentServiceCreateManyServiceInputEnvelope
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
  }

  export type AppointmentServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput> | AppointmentServiceCreateWithoutServiceInput[] | AppointmentServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutServiceInput | AppointmentServiceCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentServiceCreateManyServiceInputEnvelope
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
  }

  export type ServiceUpdatecategoriesInput = {
    set?: $Enums.ServiceCategory[]
    push?: $Enums.ServiceCategory | $Enums.ServiceCategory[]
  }

  export type BarberProfileUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<BarberProfileCreateWithoutServicesInput, BarberProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutServicesInput
    upsert?: BarberProfileUpsertWithoutServicesInput
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutServicesInput, BarberProfileUpdateWithoutServicesInput>, BarberProfileUncheckedUpdateWithoutServicesInput>
  }

  export type AppointmentServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput> | AppointmentServiceCreateWithoutServiceInput[] | AppointmentServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutServiceInput | AppointmentServiceCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentServiceUpsertWithWhereUniqueWithoutServiceInput | AppointmentServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentServiceCreateManyServiceInputEnvelope
    set?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    disconnect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    delete?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    update?: AppointmentServiceUpdateWithWhereUniqueWithoutServiceInput | AppointmentServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentServiceUpdateManyWithWhereWithoutServiceInput | AppointmentServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
  }

  export type AppointmentServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput> | AppointmentServiceCreateWithoutServiceInput[] | AppointmentServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutServiceInput | AppointmentServiceCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentServiceUpsertWithWhereUniqueWithoutServiceInput | AppointmentServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentServiceCreateManyServiceInputEnvelope
    set?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    disconnect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    delete?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    update?: AppointmentServiceUpdateWithWhereUniqueWithoutServiceInput | AppointmentServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentServiceUpdateManyWithWhereWithoutServiceInput | AppointmentServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
  }

  export type BarberProfileCreateNestedOneWithoutAvailabilityInput = {
    create?: XOR<BarberProfileCreateWithoutAvailabilityInput, BarberProfileUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutAvailabilityInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type BarberProfileUpdateOneRequiredWithoutAvailabilityNestedInput = {
    create?: XOR<BarberProfileCreateWithoutAvailabilityInput, BarberProfileUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutAvailabilityInput
    upsert?: BarberProfileUpsertWithoutAvailabilityInput
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutAvailabilityInput, BarberProfileUpdateWithoutAvailabilityInput>, BarberProfileUncheckedUpdateWithoutAvailabilityInput>
  }

  export type UserCreateNestedOneWithoutAppointmentsAsClientInput = {
    create?: XOR<UserCreateWithoutAppointmentsAsClientInput, UserUncheckedCreateWithoutAppointmentsAsClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsAsClientInput
    connect?: UserWhereUniqueInput
  }

  export type BarberProfileCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<BarberProfileCreateWithoutAppointmentsInput, BarberProfileUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutAppointmentsInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type AppointmentServiceCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput> | AppointmentServiceCreateWithoutAppointmentInput[] | AppointmentServiceUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutAppointmentInput | AppointmentServiceCreateOrConnectWithoutAppointmentInput[]
    createMany?: AppointmentServiceCreateManyAppointmentInputEnvelope
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
  }

  export type ReviewCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAppointmentInput
    connect?: ReviewWhereUniqueInput
  }

  export type AppointmentServiceUncheckedCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput> | AppointmentServiceCreateWithoutAppointmentInput[] | AppointmentServiceUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutAppointmentInput | AppointmentServiceCreateOrConnectWithoutAppointmentInput[]
    createMany?: AppointmentServiceCreateManyAppointmentInputEnvelope
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAppointmentInput
    connect?: ReviewWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type UserUpdateOneRequiredWithoutAppointmentsAsClientNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsAsClientInput, UserUncheckedCreateWithoutAppointmentsAsClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsAsClientInput
    upsert?: UserUpsertWithoutAppointmentsAsClientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsAsClientInput, UserUpdateWithoutAppointmentsAsClientInput>, UserUncheckedUpdateWithoutAppointmentsAsClientInput>
  }

  export type BarberProfileUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<BarberProfileCreateWithoutAppointmentsInput, BarberProfileUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutAppointmentsInput
    upsert?: BarberProfileUpsertWithoutAppointmentsInput
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutAppointmentsInput, BarberProfileUpdateWithoutAppointmentsInput>, BarberProfileUncheckedUpdateWithoutAppointmentsInput>
  }

  export type AppointmentServiceUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput> | AppointmentServiceCreateWithoutAppointmentInput[] | AppointmentServiceUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutAppointmentInput | AppointmentServiceCreateOrConnectWithoutAppointmentInput[]
    upsert?: AppointmentServiceUpsertWithWhereUniqueWithoutAppointmentInput | AppointmentServiceUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: AppointmentServiceCreateManyAppointmentInputEnvelope
    set?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    disconnect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    delete?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    update?: AppointmentServiceUpdateWithWhereUniqueWithoutAppointmentInput | AppointmentServiceUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: AppointmentServiceUpdateManyWithWhereWithoutAppointmentInput | AppointmentServiceUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
  }

  export type ReviewUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAppointmentInput
    upsert?: ReviewUpsertWithoutAppointmentInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutAppointmentInput, ReviewUpdateWithoutAppointmentInput>, ReviewUncheckedUpdateWithoutAppointmentInput>
  }

  export type AppointmentServiceUncheckedUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput> | AppointmentServiceCreateWithoutAppointmentInput[] | AppointmentServiceUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: AppointmentServiceCreateOrConnectWithoutAppointmentInput | AppointmentServiceCreateOrConnectWithoutAppointmentInput[]
    upsert?: AppointmentServiceUpsertWithWhereUniqueWithoutAppointmentInput | AppointmentServiceUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: AppointmentServiceCreateManyAppointmentInputEnvelope
    set?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    disconnect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    delete?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    connect?: AppointmentServiceWhereUniqueInput | AppointmentServiceWhereUniqueInput[]
    update?: AppointmentServiceUpdateWithWhereUniqueWithoutAppointmentInput | AppointmentServiceUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: AppointmentServiceUpdateManyWithWhereWithoutAppointmentInput | AppointmentServiceUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAppointmentInput
    upsert?: ReviewUpsertWithoutAppointmentInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutAppointmentInput, ReviewUpdateWithoutAppointmentInput>, ReviewUncheckedUpdateWithoutAppointmentInput>
  }

  export type AppointmentCreateNestedOneWithoutServicesInput = {
    create?: XOR<AppointmentCreateWithoutServicesInput, AppointmentUncheckedCreateWithoutServicesInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutServicesInput
    connect?: AppointmentWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutAppointmentServicesInput = {
    create?: XOR<ServiceCreateWithoutAppointmentServicesInput, ServiceUncheckedCreateWithoutAppointmentServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type AppointmentUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<AppointmentCreateWithoutServicesInput, AppointmentUncheckedCreateWithoutServicesInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutServicesInput
    upsert?: AppointmentUpsertWithoutServicesInput
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutServicesInput, AppointmentUpdateWithoutServicesInput>, AppointmentUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceUpdateOneWithoutAppointmentServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutAppointmentServicesInput, ServiceUncheckedCreateWithoutAppointmentServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentServicesInput
    upsert?: ServiceUpsertWithoutAppointmentServicesInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAppointmentServicesInput, ServiceUpdateWithoutAppointmentServicesInput>, ServiceUncheckedUpdateWithoutAppointmentServicesInput>
  }

  export type AppointmentCreateNestedOneWithoutReviewInput = {
    create?: XOR<AppointmentCreateWithoutReviewInput, AppointmentUncheckedCreateWithoutReviewInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutReviewInput
    connect?: AppointmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type BarberProfileCreateNestedOneWithoutReviewsInput = {
    create?: XOR<BarberProfileCreateWithoutReviewsInput, BarberProfileUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutReviewsInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type AppointmentUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<AppointmentCreateWithoutReviewInput, AppointmentUncheckedCreateWithoutReviewInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutReviewInput
    upsert?: AppointmentUpsertWithoutReviewInput
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutReviewInput, AppointmentUpdateWithoutReviewInput>, AppointmentUncheckedUpdateWithoutReviewInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type BarberProfileUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<BarberProfileCreateWithoutReviewsInput, BarberProfileUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutReviewsInput
    upsert?: BarberProfileUpsertWithoutReviewsInput
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutReviewsInput, BarberProfileUpdateWithoutReviewsInput>, BarberProfileUncheckedUpdateWithoutReviewsInput>
  }

  export type BarberProfileCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<BarberProfileCreateWithoutSubscriptionsInput, BarberProfileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutSubscriptionsInput
    connect?: BarberProfileWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BarberProfileUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<BarberProfileCreateWithoutSubscriptionsInput, BarberProfileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: BarberProfileCreateOrConnectWithoutSubscriptionsInput
    upsert?: BarberProfileUpsertWithoutSubscriptionsInput
    connect?: BarberProfileWhereUniqueInput
    update?: XOR<XOR<BarberProfileUpdateToOneWithWhereWithoutSubscriptionsInput, BarberProfileUpdateWithoutSubscriptionsInput>, BarberProfileUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGovernorateFilter<$PrismaModel = never> = {
    equals?: $Enums.Governorate | EnumGovernorateFieldRefInput<$PrismaModel>
    in?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    notIn?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    not?: NestedEnumGovernorateFilter<$PrismaModel> | $Enums.Governorate
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type NestedEnumGovernorateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Governorate | EnumGovernorateFieldRefInput<$PrismaModel>
    in?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    notIn?: $Enums.Governorate[] | ListEnumGovernorateFieldRefInput<$PrismaModel>
    not?: NestedEnumGovernorateWithAggregatesFilter<$PrismaModel> | $Enums.Governorate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGovernorateFilter<$PrismaModel>
    _max?: NestedEnumGovernorateFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BarberProfileCreateWithoutUserInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutUserInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutUserInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateWithoutClientInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    barber: BarberProfileCreateNestedOneWithoutAppointmentsInput
    services?: AppointmentServiceCreateNestedManyWithoutAppointmentInput
    review?: ReviewCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutClientInput = {
    id?: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: AppointmentServiceUncheckedCreateNestedManyWithoutAppointmentInput
    review?: ReviewUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentCreateManyClientInputEnvelope = {
    data: AppointmentCreateManyClientInput | AppointmentCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAuthorInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    appointment: AppointmentCreateNestedOneWithoutReviewInput
    barber: BarberProfileCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutAuthorInput = {
    id?: string
    appointmentId: string
    barberId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewCreateManyAuthorInputEnvelope = {
    data: ReviewCreateManyAuthorInput | ReviewCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type BarberProfileUpsertWithoutUserInput = {
    update: XOR<BarberProfileUpdateWithoutUserInput, BarberProfileUncheckedUpdateWithoutUserInput>
    create: XOR<BarberProfileCreateWithoutUserInput, BarberProfileUncheckedCreateWithoutUserInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutUserInput, BarberProfileUncheckedUpdateWithoutUserInput>
  }

  export type BarberProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    barberId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
  }

  export type ReviewUpdateManyWithWhereWithoutAuthorInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    appointmentId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    barberId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type UserCreateWithoutBarberProfileInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    appointmentsAsClient?: AppointmentCreateNestedManyWithoutClientInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutBarberProfileInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    appointmentsAsClient?: AppointmentUncheckedCreateNestedManyWithoutClientInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutBarberProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBarberProfileInput, UserUncheckedCreateWithoutBarberProfileInput>
  }

  export type ServiceCreateWithoutBarberInput = {
    id?: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
    appointmentServices?: AppointmentServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutBarberInput = {
    id?: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
    appointmentServices?: AppointmentServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBarberInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput>
  }

  export type ServiceCreateManyBarberInputEnvelope = {
    data: ServiceCreateManyBarberInput | ServiceCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type BarberAvailabilityCreateWithoutBarberInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
  }

  export type BarberAvailabilityUncheckedCreateWithoutBarberInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
  }

  export type BarberAvailabilityCreateOrConnectWithoutBarberInput = {
    where: BarberAvailabilityWhereUniqueInput
    create: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput>
  }

  export type BarberAvailabilityCreateManyBarberInputEnvelope = {
    data: BarberAvailabilityCreateManyBarberInput | BarberAvailabilityCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutBarberInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsAsClientInput
    services?: AppointmentServiceCreateNestedManyWithoutAppointmentInput
    review?: ReviewCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutBarberInput = {
    id?: string
    clientId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: AppointmentServiceUncheckedCreateNestedManyWithoutAppointmentInput
    review?: ReviewUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutBarberInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput>
  }

  export type AppointmentCreateManyBarberInputEnvelope = {
    data: AppointmentCreateManyBarberInput | AppointmentCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutBarberInput = {
    id?: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutBarberInput = {
    id?: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutBarberInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput>
  }

  export type SubscriptionCreateManyBarberInputEnvelope = {
    data: SubscriptionCreateManyBarberInput | SubscriptionCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutBarberInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    appointment: AppointmentCreateNestedOneWithoutReviewInput
    author: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutBarberInput = {
    id?: string
    appointmentId: string
    authorId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBarberInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput>
  }

  export type ReviewCreateManyBarberInputEnvelope = {
    data: ReviewCreateManyBarberInput | ReviewCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBarberProfileInput = {
    update: XOR<UserUpdateWithoutBarberProfileInput, UserUncheckedUpdateWithoutBarberProfileInput>
    create: XOR<UserCreateWithoutBarberProfileInput, UserUncheckedCreateWithoutBarberProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBarberProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBarberProfileInput, UserUncheckedUpdateWithoutBarberProfileInput>
  }

  export type UserUpdateWithoutBarberProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointmentsAsClient?: AppointmentUpdateManyWithoutClientNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutBarberProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointmentsAsClient?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ServiceUpsertWithWhereUniqueWithoutBarberInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutBarberInput, ServiceUncheckedUpdateWithoutBarberInput>
    create: XOR<ServiceCreateWithoutBarberInput, ServiceUncheckedCreateWithoutBarberInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutBarberInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutBarberInput, ServiceUncheckedUpdateWithoutBarberInput>
  }

  export type ServiceUpdateManyWithWhereWithoutBarberInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutBarberInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    barberId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    durationMinutes?: IntFilter<"Service"> | number
    priceMillimes?: IntFilter<"Service"> | number
    categories?: EnumServiceCategoryNullableListFilter<"Service">
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type BarberAvailabilityUpsertWithWhereUniqueWithoutBarberInput = {
    where: BarberAvailabilityWhereUniqueInput
    update: XOR<BarberAvailabilityUpdateWithoutBarberInput, BarberAvailabilityUncheckedUpdateWithoutBarberInput>
    create: XOR<BarberAvailabilityCreateWithoutBarberInput, BarberAvailabilityUncheckedCreateWithoutBarberInput>
  }

  export type BarberAvailabilityUpdateWithWhereUniqueWithoutBarberInput = {
    where: BarberAvailabilityWhereUniqueInput
    data: XOR<BarberAvailabilityUpdateWithoutBarberInput, BarberAvailabilityUncheckedUpdateWithoutBarberInput>
  }

  export type BarberAvailabilityUpdateManyWithWhereWithoutBarberInput = {
    where: BarberAvailabilityScalarWhereInput
    data: XOR<BarberAvailabilityUpdateManyMutationInput, BarberAvailabilityUncheckedUpdateManyWithoutBarberInput>
  }

  export type BarberAvailabilityScalarWhereInput = {
    AND?: BarberAvailabilityScalarWhereInput | BarberAvailabilityScalarWhereInput[]
    OR?: BarberAvailabilityScalarWhereInput[]
    NOT?: BarberAvailabilityScalarWhereInput | BarberAvailabilityScalarWhereInput[]
    id?: StringFilter<"BarberAvailability"> | string
    barberId?: StringFilter<"BarberAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"BarberAvailability"> | $Enums.DayOfWeek
    startMinute?: IntFilter<"BarberAvailability"> | number
    endMinute?: IntFilter<"BarberAvailability"> | number
  }

  export type AppointmentUpsertWithWhereUniqueWithoutBarberInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutBarberInput, AppointmentUncheckedUpdateWithoutBarberInput>
    create: XOR<AppointmentCreateWithoutBarberInput, AppointmentUncheckedCreateWithoutBarberInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutBarberInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutBarberInput, AppointmentUncheckedUpdateWithoutBarberInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutBarberInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutBarberInput>
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutBarberInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutBarberInput, SubscriptionUncheckedUpdateWithoutBarberInput>
    create: XOR<SubscriptionCreateWithoutBarberInput, SubscriptionUncheckedCreateWithoutBarberInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutBarberInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutBarberInput, SubscriptionUncheckedUpdateWithoutBarberInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutBarberInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutBarberInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    barberId?: StringFilter<"Subscription"> | string
    planType?: EnumPlanTypeFilter<"Subscription"> | $Enums.PlanType
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    startedAt?: DateTimeFilter<"Subscription"> | Date | string
    endsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutBarberInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutBarberInput, ReviewUncheckedUpdateWithoutBarberInput>
    create: XOR<ReviewCreateWithoutBarberInput, ReviewUncheckedCreateWithoutBarberInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutBarberInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutBarberInput, ReviewUncheckedUpdateWithoutBarberInput>
  }

  export type ReviewUpdateManyWithWhereWithoutBarberInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutBarberInput>
  }

  export type BarberProfileCreateWithoutServicesInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutServicesInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutServicesInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutServicesInput, BarberProfileUncheckedCreateWithoutServicesInput>
  }

  export type AppointmentServiceCreateWithoutServiceInput = {
    id?: string
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
    appointment: AppointmentCreateNestedOneWithoutServicesInput
  }

  export type AppointmentServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    appointmentId: string
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceCreateOrConnectWithoutServiceInput = {
    where: AppointmentServiceWhereUniqueInput
    create: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentServiceCreateManyServiceInputEnvelope = {
    data: AppointmentServiceCreateManyServiceInput | AppointmentServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type BarberProfileUpsertWithoutServicesInput = {
    update: XOR<BarberProfileUpdateWithoutServicesInput, BarberProfileUncheckedUpdateWithoutServicesInput>
    create: XOR<BarberProfileCreateWithoutServicesInput, BarberProfileUncheckedCreateWithoutServicesInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutServicesInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutServicesInput, BarberProfileUncheckedUpdateWithoutServicesInput>
  }

  export type BarberProfileUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type AppointmentServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: AppointmentServiceWhereUniqueInput
    update: XOR<AppointmentServiceUpdateWithoutServiceInput, AppointmentServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<AppointmentServiceCreateWithoutServiceInput, AppointmentServiceUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: AppointmentServiceWhereUniqueInput
    data: XOR<AppointmentServiceUpdateWithoutServiceInput, AppointmentServiceUncheckedUpdateWithoutServiceInput>
  }

  export type AppointmentServiceUpdateManyWithWhereWithoutServiceInput = {
    where: AppointmentServiceScalarWhereInput
    data: XOR<AppointmentServiceUpdateManyMutationInput, AppointmentServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type AppointmentServiceScalarWhereInput = {
    AND?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
    OR?: AppointmentServiceScalarWhereInput[]
    NOT?: AppointmentServiceScalarWhereInput | AppointmentServiceScalarWhereInput[]
    id?: StringFilter<"AppointmentService"> | string
    appointmentId?: StringFilter<"AppointmentService"> | string
    serviceId?: StringNullableFilter<"AppointmentService"> | string | null
    nameSnapshot?: StringFilter<"AppointmentService"> | string
    priceMillimesSnapshot?: IntFilter<"AppointmentService"> | number
    durationMinutesSnapshot?: IntFilter<"AppointmentService"> | number
  }

  export type BarberProfileCreateWithoutAvailabilityInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    services?: ServiceCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutAvailabilityInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutAvailabilityInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutAvailabilityInput, BarberProfileUncheckedCreateWithoutAvailabilityInput>
  }

  export type BarberProfileUpsertWithoutAvailabilityInput = {
    update: XOR<BarberProfileUpdateWithoutAvailabilityInput, BarberProfileUncheckedUpdateWithoutAvailabilityInput>
    create: XOR<BarberProfileCreateWithoutAvailabilityInput, BarberProfileUncheckedCreateWithoutAvailabilityInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutAvailabilityInput, BarberProfileUncheckedUpdateWithoutAvailabilityInput>
  }

  export type BarberProfileUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    services?: ServiceUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type UserCreateWithoutAppointmentsAsClientInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileCreateNestedOneWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAppointmentsAsClientInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileUncheckedCreateNestedOneWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAppointmentsAsClientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsAsClientInput, UserUncheckedCreateWithoutAppointmentsAsClientInput>
  }

  export type BarberProfileCreateWithoutAppointmentsInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    services?: ServiceCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutAppointmentsInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutAppointmentsInput, BarberProfileUncheckedCreateWithoutAppointmentsInput>
  }

  export type AppointmentServiceCreateWithoutAppointmentInput = {
    id?: string
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
    service?: ServiceCreateNestedOneWithoutAppointmentServicesInput
  }

  export type AppointmentServiceUncheckedCreateWithoutAppointmentInput = {
    id?: string
    serviceId?: string | null
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceCreateOrConnectWithoutAppointmentInput = {
    where: AppointmentServiceWhereUniqueInput
    create: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput>
  }

  export type AppointmentServiceCreateManyAppointmentInputEnvelope = {
    data: AppointmentServiceCreateManyAppointmentInput | AppointmentServiceCreateManyAppointmentInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAppointmentInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutReviewsInput
    barber: BarberProfileCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutAppointmentInput = {
    id?: string
    authorId: string
    barberId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutAppointmentInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
  }

  export type UserUpsertWithoutAppointmentsAsClientInput = {
    update: XOR<UserUpdateWithoutAppointmentsAsClientInput, UserUncheckedUpdateWithoutAppointmentsAsClientInput>
    create: XOR<UserCreateWithoutAppointmentsAsClientInput, UserUncheckedCreateWithoutAppointmentsAsClientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsAsClientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsAsClientInput, UserUncheckedUpdateWithoutAppointmentsAsClientInput>
  }

  export type UserUpdateWithoutAppointmentsAsClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUpdateOneWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsAsClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUncheckedUpdateOneWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type BarberProfileUpsertWithoutAppointmentsInput = {
    update: XOR<BarberProfileUpdateWithoutAppointmentsInput, BarberProfileUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<BarberProfileCreateWithoutAppointmentsInput, BarberProfileUncheckedCreateWithoutAppointmentsInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutAppointmentsInput, BarberProfileUncheckedUpdateWithoutAppointmentsInput>
  }

  export type BarberProfileUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    services?: ServiceUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type AppointmentServiceUpsertWithWhereUniqueWithoutAppointmentInput = {
    where: AppointmentServiceWhereUniqueInput
    update: XOR<AppointmentServiceUpdateWithoutAppointmentInput, AppointmentServiceUncheckedUpdateWithoutAppointmentInput>
    create: XOR<AppointmentServiceCreateWithoutAppointmentInput, AppointmentServiceUncheckedCreateWithoutAppointmentInput>
  }

  export type AppointmentServiceUpdateWithWhereUniqueWithoutAppointmentInput = {
    where: AppointmentServiceWhereUniqueInput
    data: XOR<AppointmentServiceUpdateWithoutAppointmentInput, AppointmentServiceUncheckedUpdateWithoutAppointmentInput>
  }

  export type AppointmentServiceUpdateManyWithWhereWithoutAppointmentInput = {
    where: AppointmentServiceScalarWhereInput
    data: XOR<AppointmentServiceUpdateManyMutationInput, AppointmentServiceUncheckedUpdateManyWithoutAppointmentInput>
  }

  export type ReviewUpsertWithoutAppointmentInput = {
    update: XOR<ReviewUpdateWithoutAppointmentInput, ReviewUncheckedUpdateWithoutAppointmentInput>
    create: XOR<ReviewCreateWithoutAppointmentInput, ReviewUncheckedCreateWithoutAppointmentInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutAppointmentInput, ReviewUncheckedUpdateWithoutAppointmentInput>
  }

  export type ReviewUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateWithoutServicesInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsAsClientInput
    barber: BarberProfileCreateNestedOneWithoutAppointmentsInput
    review?: ReviewCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutServicesInput = {
    id?: string
    clientId: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutServicesInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutServicesInput, AppointmentUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCreateWithoutAppointmentServicesInput = {
    id?: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
    barber: BarberProfileCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutAppointmentServicesInput = {
    id?: string
    barberId: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutAppointmentServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAppointmentServicesInput, ServiceUncheckedCreateWithoutAppointmentServicesInput>
  }

  export type AppointmentUpsertWithoutServicesInput = {
    update: XOR<AppointmentUpdateWithoutServicesInput, AppointmentUncheckedUpdateWithoutServicesInput>
    create: XOR<AppointmentCreateWithoutServicesInput, AppointmentUncheckedCreateWithoutServicesInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutServicesInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutServicesInput, AppointmentUncheckedUpdateWithoutServicesInput>
  }

  export type AppointmentUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsAsClientNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutAppointmentsNestedInput
    review?: ReviewUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type ServiceUpsertWithoutAppointmentServicesInput = {
    update: XOR<ServiceUpdateWithoutAppointmentServicesInput, ServiceUncheckedUpdateWithoutAppointmentServicesInput>
    create: XOR<ServiceCreateWithoutAppointmentServicesInput, ServiceUncheckedCreateWithoutAppointmentServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAppointmentServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAppointmentServicesInput, ServiceUncheckedUpdateWithoutAppointmentServicesInput>
  }

  export type ServiceUpdateWithoutAppointmentServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barber?: BarberProfileUpdateOneRequiredWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAppointmentServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateWithoutReviewInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsAsClientInput
    barber: BarberProfileCreateNestedOneWithoutAppointmentsInput
    services?: AppointmentServiceCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutReviewInput = {
    id?: string
    clientId: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: AppointmentServiceUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutReviewInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutReviewInput, AppointmentUncheckedCreateWithoutReviewInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileCreateNestedOneWithoutUserInput
    appointmentsAsClient?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    phone?: string | null
    passwordHash: string
    name: string
    avatarUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    barberProfile?: BarberProfileUncheckedCreateNestedOneWithoutUserInput
    appointmentsAsClient?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type BarberProfileCreateWithoutReviewsInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    services?: ServiceCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutReviewsInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutReviewsInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutReviewsInput, BarberProfileUncheckedCreateWithoutReviewsInput>
  }

  export type AppointmentUpsertWithoutReviewInput = {
    update: XOR<AppointmentUpdateWithoutReviewInput, AppointmentUncheckedUpdateWithoutReviewInput>
    create: XOR<AppointmentCreateWithoutReviewInput, AppointmentUncheckedCreateWithoutReviewInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutReviewInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutReviewInput, AppointmentUncheckedUpdateWithoutReviewInput>
  }

  export type AppointmentUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsAsClientNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutAppointmentsNestedInput
    services?: AppointmentServiceUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: AppointmentServiceUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUpdateOneWithoutUserNestedInput
    appointmentsAsClient?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barberProfile?: BarberProfileUncheckedUpdateOneWithoutUserNestedInput
    appointmentsAsClient?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type BarberProfileUpsertWithoutReviewsInput = {
    update: XOR<BarberProfileUpdateWithoutReviewsInput, BarberProfileUncheckedUpdateWithoutReviewsInput>
    create: XOR<BarberProfileCreateWithoutReviewsInput, BarberProfileUncheckedCreateWithoutReviewsInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutReviewsInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutReviewsInput, BarberProfileUncheckedUpdateWithoutReviewsInput>
  }

  export type BarberProfileUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    services?: ServiceUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileCreateWithoutSubscriptionsInput = {
    id?: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBarberProfileInput
    services?: ServiceCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityCreateNestedManyWithoutBarberInput
    appointments?: AppointmentCreateNestedManyWithoutBarberInput
    reviews?: ReviewCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    userId: string
    businessName: string
    bio?: string | null
    governorate: $Enums.Governorate
    address?: string | null
    avatarUrl?: string | null
    coverImageUrl?: string | null
    avgRating?: number
    reviewCount?: number
    planType?: $Enums.PlanType
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutBarberInput
    availability?: BarberAvailabilityUncheckedCreateNestedManyWithoutBarberInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBarberInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberProfileCreateOrConnectWithoutSubscriptionsInput = {
    where: BarberProfileWhereUniqueInput
    create: XOR<BarberProfileCreateWithoutSubscriptionsInput, BarberProfileUncheckedCreateWithoutSubscriptionsInput>
  }

  export type BarberProfileUpsertWithoutSubscriptionsInput = {
    update: XOR<BarberProfileUpdateWithoutSubscriptionsInput, BarberProfileUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<BarberProfileCreateWithoutSubscriptionsInput, BarberProfileUncheckedCreateWithoutSubscriptionsInput>
    where?: BarberProfileWhereInput
  }

  export type BarberProfileUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: BarberProfileWhereInput
    data: XOR<BarberProfileUpdateWithoutSubscriptionsInput, BarberProfileUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type BarberProfileUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBarberProfileNestedInput
    services?: ServiceUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUpdateManyWithoutBarberNestedInput
  }

  export type BarberProfileUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    governorate?: EnumGovernorateFieldUpdateOperationsInput | $Enums.Governorate
    address?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutBarberNestedInput
    availability?: BarberAvailabilityUncheckedUpdateManyWithoutBarberNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBarberNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type AppointmentCreateManyClientInput = {
    id?: string
    barberId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyAuthorInput = {
    id?: string
    appointmentId: string
    barberId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    barber?: BarberProfileUpdateOneRequiredWithoutAppointmentsNestedInput
    services?: AppointmentServiceUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: AppointmentServiceUncheckedUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneRequiredWithoutReviewNestedInput
    barber?: BarberProfileUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyBarberInput = {
    id?: string
    name: string
    description?: string | null
    durationMinutes: number
    priceMillimes: number
    categories?: ServiceCreatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarberAvailabilityCreateManyBarberInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startMinute: number
    endMinute: number
  }

  export type AppointmentCreateManyBarberInput = {
    id?: string
    clientId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    totalPriceMillimes: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateManyBarberInput = {
    id?: string
    planType: $Enums.PlanType
    status?: $Enums.SubscriptionStatus
    startedAt?: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReviewCreateManyBarberInput = {
    id?: string
    appointmentId: string
    authorId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ServiceUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointmentServices?: AppointmentServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointmentServices?: AppointmentServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    priceMillimes?: IntFieldUpdateOperationsInput | number
    categories?: ServiceUpdatecategoriesInput | $Enums.ServiceCategory[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberAvailabilityUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type BarberAvailabilityUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type BarberAvailabilityUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startMinute?: IntFieldUpdateOperationsInput | number
    endMinute?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsAsClientNestedInput
    services?: AppointmentServiceUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: AppointmentServiceUncheckedUpdateManyWithoutAppointmentNestedInput
    review?: ReviewUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    totalPriceMillimes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneRequiredWithoutReviewNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentServiceCreateManyServiceInput = {
    id?: string
    appointmentId: string
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
    appointment?: AppointmentUpdateOneRequiredWithoutServicesNestedInput
  }

  export type AppointmentServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentServiceCreateManyAppointmentInput = {
    id?: string
    serviceId?: string | null
    nameSnapshot: string
    priceMillimesSnapshot: number
    durationMinutesSnapshot: number
  }

  export type AppointmentServiceUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
    service?: ServiceUpdateOneWithoutAppointmentServicesNestedInput
  }

  export type AppointmentServiceUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentServiceUncheckedUpdateManyWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    nameSnapshot?: StringFieldUpdateOperationsInput | string
    priceMillimesSnapshot?: IntFieldUpdateOperationsInput | number
    durationMinutesSnapshot?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}