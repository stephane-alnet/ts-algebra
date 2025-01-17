import { A } from "ts-toolbelt";

import { And, DoesExtend } from "../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { _Array, ArrayType, ArrayValues } from "../array";
import { TupleValues, TupleType, IsTupleOpen, TupleOpenProps } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { Type } from "../type";

import { _Exclude } from "./index";
import { ExcludeUnion } from "./union";

export type ExcludeFromArray<A extends ArrayType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
    : B extends ConstType
    ? A
    : B extends EnumType
    ? A
    : B extends PrimitiveType
    ? A
    : B extends ArrayType
    ? ExcludeArrays<A, B>
    : B extends TupleType
    ? And<
        DoesExtend<A.Equals<TupleValues<B>, []>, 1>,
        IsTupleOpen<B>
      > extends true
      ? ExcludeArrays<A, _Array<TupleOpenProps<B>>>
      : A
    : B extends ObjectType
    ? A
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : Never
  : Never;

type ExcludeArrays<A extends ArrayType, B extends ArrayType> = _Exclude<
  ArrayValues<A>,
  ArrayValues<B>
> extends NeverType
  ? NeverType
  : A;
