import { A } from "ts-toolbelt";

import { If } from "../utils";

import { Never } from "./never";

export type PrimitiveTypeId = "primitive";

export type Primitive<T extends null | boolean | number | string> =
  $Primitive<T>;

// TOIMPROVE: We could check that T extends either null, boolean, number or string with DoesExtend<T, PRIMITIVE_TYPE> extends true ? continue : Never
export type $Primitive<T> = If<
  A.Equals<T, never>,
  Never,
  { type: PrimitiveTypeId; value: T; brand: undefined }
>;

export type BrandedPrimitive<T extends null | boolean | number | string, B extends string> =
  $BrandedPrimitive<T,B>;

export type $BrandedPrimitive<T, B extends string> = If<
  A.Equals<T, never>,
  Never,
  { type: PrimitiveTypeId; value: T; brand: B }
>;

export type PrimitiveType = {
  type: PrimitiveTypeId;
  value: null | boolean | number | string;
  brand: string | undefined;
};

export type PrimitiveValue<T extends PrimitiveType> = T["value"];

export type PrimitiveBrand<T extends PrimitiveType> = T["brand"];

export declare const BrandName: unique symbol;

export interface Branded<B> { [BrandName]: B ; };

export type ResolvePrimitive<T extends PrimitiveType> =
  PrimitiveBrand<T> extends string
    ? PrimitiveValue<T> & Branded<PrimitiveBrand<T>>
    : PrimitiveValue<T>;
