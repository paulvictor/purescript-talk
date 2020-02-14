---
fontsize: 11pt
title: Purescript
width: 960
height: 700
margin: 0.2
minScale: 0.2
maxScale: 1

---

## Purescript - JS you can *reason* about
  Paul Victor Raj
  @JUSPAY

## About Purescript
  * A pure functional (Haskell inspired) language
    + Written in Haskell
    + Non - lazy evaluation

  * Compiles to JS (and optionally to other backends)

  * Clear interpretable JS with no runtime

  * Supports 
    + higher kinded types
    + poly kinds
    + row polymorphism 
    + generic programming 
   ... to name a few

## Comparison with other *compile to JS* frameworks

### Typescript
  * More concise syntax
  * Better and stricter type inference
  * Not a superset of JS

### Elm
  * Less polymorphic
  * No support for type classes
  * No runtime

### Clojurescript
  * Static
  * Pure
  * Easier ways to do polymorphism

## Why you should consider strong types
  * Change a huge class of runtime bugs into compile time errors
    ```haskell
      employee = { name: "Paul", company: "Juspay" }
      log (toUpper(employee.email)) -- A compile error
    ```
  * Better debugging
  * Easier development

## Overview of types in Purescript
  Types are _disjoint_ sets of values  
  No _subtyping_ (except with row polymorphism)

### Sum types
  - Cardinality is the sum of cardinalities
  - Correspond to enums in most programming languages

  ```haskell
  data Either a b -- Either is the Type Constructor
    = Left a
    | Right b -- Left and Right are Data Constructors
  ```
  ```haskell
  Left :: forall a b. a -> Either a b
  ```
  ```haskell
  data PaymentStatus
    = SuccessAmountPaid Double
    | UnAuthenticated
    | GatewayTimeout
    | NotSufficientBalance
  ```

### Product types
  - Cardinality is the product of cardinalities
  - Correspond to structs, objects in most programming languages

  ```haskell
  data Tuple a b 
    = Tuple a b
  ```
  ```haskell
  data Customer
    = Customer 
      String -- Name
      Int -- Age
  ```
  ```haskell
  data Customer 
    = Customer 
    { name :: String
    , age :: Int }
  ```

### Function types

  ```haskell
  -- Can't be defined, but we can assume this is the shape
  data Function a b = Function (a -> b)
  ```

## Functions in detail
  * All functions are curried.  
    they take a single argument and return a single argument  
    ```haskell
    add :: Int -> (Int -> Int)
    add x y = x + y
    -- or
    add x = \y -> x + y
    -- or
    add = \x -> \y -> x + y
    ```
  * Partial Application
    ```haskell
    increment :: Int -> Int
    increment = add 1
    ```

### Pattern matching with _case_ statements
  ```haskell
  data Direction = N | S | E | W
  data Coordinates = Coordinates { x :: Int, y :: Int }

  -- Currying
  move :: Direction -> Coordinates -> Coordinates
  move N (Coordinates { x, y }) = Coordinates { x, y: y + 1 }
  move S (Coordinates { x, y }) = Coordinates { x, y: y - 1 }
  move E (Coordinates { x, y }) = Coordinates { x: x + 1, y }
  move W (Coordinates { x, y }) = Coordinates { x: x - 1, y }
  ```

### Partial Application
  ```haskell
  moveNorth :: Coordinates -> Coordinates
  moveNorth = move N
  ```

### Composition
  * _>>>_ and _<<<_
  ```haskell
  (>>>) f g = \a -> g (f a)
  (<<<) f g = \a -> f (g a)
  ```
  ```haskell
  moveNE :: Coordinates -> Coordinates
  moveNE = move N >>> move E
  ```

## Scrap your _null_ checks and NPE's
  ```haskell
  data Maybe a = Nothing | Just a
  ```

  ```haskell
  divide :: Int -> Int -> Maybe Int
  divide 0 0 = Nothing
  divide x y = Just (x / y)
  ```
  `Just` is proof that there is indeed a value  
  and its safe to access the value without an exception

## Type-classes
  * Sets of types with the same behavior
    + Somewhat like interfaces in Java
    + Are hierarchical
    + The proof that the type is a member of the set is called an instance

### Examples

TypeClass\\Types                    Int   String   Bool   List a    Maybe a
---------------                   ------ -------   ----   ------    -------
Show (representable as String)     T      T         T      Show a    Show a
Eq                                 T      T         T      Eq a      Eq a
Ord                                T      T         T      Ord a     Ord a
Semiring (add, zero, mul, one)     T      F         F       F         F
Semigroup/Monoid (append/empty)    ?      T         ?       T        Semigroup a

## Functors (map providers)
  * Think containers
  * Purescript's _map (<$>)_ is polymorphic in the container type and the contained value.
  * As long as the container type in
  ```haskell
    >:type map
    forall a b f. Functor f => (a -> b) -> f a -> f b

    incOver :: ∀ f. Functor f => f Int -> f Int
    incOver = map increment
  ```
  ```haskell
    data List a = Nil | Cons a (List a)
  ```
