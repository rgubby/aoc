/*
FindSanta is a type that takes a tuple as its only argument and returns the
index where Santa is located. Let's help Santa get back to the thing he's 
best at: inspiring leadership.

note: never is returned if Santa cannot be found among the trees
*/

// type FindSanta = unknown;
// type FindSanta<T> = unknown;
type FindSanta<T = any> = { value: T; fn: (v: T) => boolean };
type Validation<
    Arr extends Array<unknown>,
    > =
    {
        [Elem in keyof Arr]: Arr[Elem] extends Base<any> ? BothEqual<Arr[Elem]> : never
    }


// --- //

import { Expect, Equal } from 'type-testing';

type Forest0 = ['🎅🏼', '🎄', '🎄', '🎄'];
type test_0_actual = FindSanta<Forest0>;
//   ^?
type test_0_expected = 0;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type Forest1 = ['🎄', '🎅🏼', '🎄', '🎄', '🎄', '🎄'];
type test_1_actual = FindSanta<Forest1>;
//   ^?
type test_1_expected = 1;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type Forest2 = ['🎄', '🎄', '🎅🏼', '🎄'];
type test_2_actual = FindSanta<Forest2>;
//   ^?
type test_2_expected = 2;
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type Forest3 = ['🎄', '🎄', '🎄', '🎅🏼', '🎄'];
type test_3_actual = FindSanta<Forest3>;
//   ^?
type test_3_expected = 3;
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type Forest4 = ['🎄', '🎄', '🎄', '🎄'];
type test_4_actual = FindSanta<Forest4>;
//   ^?
type test_4_expected = never;
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;
