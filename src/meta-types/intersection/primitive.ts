import { A } from "ts-toolbelt";

import { If } from "../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveValue, PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { IntersectConstToPrimitive } from "./const";
import { IntersectEnumToPrimitive } from "./enum";
import { DistributeIntersection } from "./union";

export type IntersectPrimitive<A extends PrimitiveType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConstToPrimitive<B, A>
    : B extends EnumType
    ? IntersectEnumToPrimitive<B, A>
    : B extends PrimitiveType
    ? If<A.Equals<PrimitiveValue<A>, PrimitiveValue<B>>, A, Never>
    : B extends ArrayType
    ? Never
    : B extends TupleType
    ? Never
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : Never
  : Never;
