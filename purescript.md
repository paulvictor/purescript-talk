---
fontsize: 11pt
title: Purescript
width: 960
height: 800
margin: 0.2
minScale: 0.2
maxScale: 1

---

## Purescript - JS you can *reason* about
  Paul Victor Raj
  @JUSPAY

## Guess what is the output?
###

  ```javascript
  parseInt("10")
  ```
  ???

###
  ```javascript
  ["10", "10", "10", "10"].map(parseInt)
  ```
  ???

## About Purescript
  * A pure functional (Haskell inspired) language
    + Written in Haskell
    + Non - lazy evaluation (like JS)

  * Compiles to JS (and optionally to other backends)

  * Supports 
    + higher kinded types
    + poly kinds
    + row polymorphism 
    + generic programming 

  * Easy javascript FFI

### Tools
#### start
  ```bash
  $ npm i -g purescript pulp
  $ mkdir trial; cd trial
  $ pulp init
  $ tree -a -L 2
  .
  ├── bower_components
  │   ├── purescript-console
  │   ├── purescript-effect
  │   ├── purescript-prelude
  │   └── purescript-psci-support
  ├── bower.json
  ├── .gitignore
  ├── .purs-repl
  ├── src
  │   └── Main.purs
  └── test
      └── Main.purs

  7 directories, 5 files
  ```
#### repl
  ```bash
  $ pulp repl
  PSCi, version 0.12.2
  Type :? for help

  import Prelude

  > import Data.Monoid
  > :type (+)
  forall a. Semiring a => a -> a -> a

  >
  ```

## Comparison with other *compile to JS* frameworks

### Typescript
  * More concise syntax
  * Better and stricter type inference
  * Not a superset of JS

### Elm
  * More polymorphic
  * Support for type classes
  * No runtime

### Clojurescript
  * Static
  * Pure
  * Easier ways to do polymorphism

<!--### Scala.js-->
  <!------------------------------------------------------------------------>
  <!--Scala.js                                       Purescript-->
  <!------------------------------- ---------------------------------------->
  <!--```                                     -->
  <!--println("Hello World!")                    log "Hello World!"-->
                                             
                                             
  <!--class Person                               type Person = -->
   <!--( val firstName: String                       { firstName :: String-->
   <!--, val lastName: String) {                     , lastName :: String }-->
     <!--def fullName(): String =                  -->
       <!--s"$firstName $lastName"               fullName :: Person -> String-->
   <!--}                                         fullName p = -->
                                             <!--p.firstName <> " " <> p.lastName-->
                                             
  <!--val names =                                names = _.firstName <$> persons-->
    <!--persons.map(_.firstName)                 -->
                                             
  <!--val personMap = Map(                       personMap = Map.fromFoldable-->
    <!--10 -> new Person("Roger", "Moore"),        [ (10, rogerMoore)-->
    <!--20 -> new Person("James", "Bond")          , (20, jamesBond)-->
  <!--)                                            ]-->
  <!--val names = for {                          names = -->
    <!--(key, person) <- personMap                 map (\(k, v) -> -->
                                                <!--show k <> " = " <> v.firstName)-->
    <!--if key > 15                                <<< Map.toUnfoldable-->
  <!--} yield s"$key = ${person.firstName}"        <<< Map.filterKeys (_ > 15)-->
  <!--```-->
  <!------------------------------------------------------------------------>


## Why you should consider strong types
  * Change a huge class of runtime bugs into compile time errors
    ```haskell
      employee = { name: "Paul", company: "Juspay" }
      log(toUpper(employee.email)) -- A compile error
    ```
  * Better debugging
  * Easier development

## Overview of types in Purescript
  Types are _disjoint_ sets of values  
  No _subtyping_ in the traditional sense (except with row polymorphism)

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
  -- Can't be defined
  -- but we can assume this is the shape
  data Function a b = Function (a -> b)
  ```
  a tabulation of inputs to outputs

## Functions in detail
  * All functions are curried.  
    * they take a single argument and return a single argument  
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

### Pattern matching
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
    + Can be hierarchical
    + The proof that the type is a member of the set is called an instance

### Examples

TypeClass\\Types                    Int   String   Bool   List a    Maybe a
---------------                   ------ -------   ----   ------    -------
`Show` (representable as String)     T      T         T      Show a    Show a
`Eq`                                 T      T         T      Eq a      Eq a
`Ord`                                T      T         T      Ord a     Ord a
`Semiring` (add, zero, mul, one)     T      F         F       F         F
`Semigroup/Monoid` (append/empty)    ?      T         ?       T        Semigroup a

## Pure functions 
  * `a -> b`
  * but what if we want more ?

### Effects
  * `List a` - Returns multiple `a`'s
  * `Maybe a` - May not return an `a`
  * `Tuple a b` - Return an `a` with `a` payload
  * `Reader r a` - Use a `r` to produce an `a`
  * `Writer w a` - Produce an `a`, but log a `w`
  * `State s a` - Produce an `a`, but use or update some state `s`
  * `Parser a` - Consume some input and return an `a`
  * `Effect a` - Nondeterministically get an `a`
  * `Aff a` - An `Effect` ful callback which can consume an `a`

## Functors
  * Think containers or producers
  * Purescript's `map` is polymorphic in the container type and the contained value.
    + As long as the container type is mappable

  ```haskell
    class Functor f where
      map :: forall f a b. (a -> b) -> f a -> f b

    > :type map
    forall a b f. Functor f => (a -> b) -> f a -> f b

    incOver :: ∀ f. Functor f => f Int -> f Int
    incOver = map increment
  ```

  ```haskell
    data List a = Nil | Cons a (List a)
  ```
### List is mappable

  ```haskell
    instance Functor List where
      map f Nil         = Nil
      map f (Cons a as) = Cons (f a) (map f as)
  ```

### But also
  * `Maybe a`
  * `Tuple a b`
  * `Reader r a`
  * `Writer w a`
  * `State s a`
  * `Parser a`
  * `Effect a`
  * `Aff a`

### This is unlawful

  ```haskell
    instance Functor List where
      map f Nil         = Nil
      map f (Cons a as) = Nil
  ```
  difficult to reason about.

##  
  * `map` cannot 
    * change the structure of the container 
    * access the producer  
  * what if we need to?

### Monads
  ```haskell
  class Monad m where
    bind :: forall a b. m a -> (a -> m b) -> m b

  > :type bind -- The operator equivalent is >>=
  forall f a b. Monad f => f a -> (a -> f b) -> f b

  > :type  (=<<) -- bind -- (Flipped)
  forall f a b. Monad f => (a -> f b) -> f a -> f b

  > :type pure
  forall a f. Monad f => a -> f a
  ```
### Lists are Monads
  ```haskell
  instance Monad List where
    bind f Nil = Nil
    bind f (Cons a as) = 
      f a <> bind f as
      where
      Nil <> x = x
      x <> Nil = x
      (Cons x xs) <> ys = Cons x (xs <> ys)

  incOverEvens :: List Int -> List Int
  incOverEvens xs = 
    (=<<) 
      (\i -> if isEven i then Cons (i + 1) Nil else Cons i Nil)
      xs
  ```
  ```haskell
  > incOverEvens [1,2,3,4]
  [1,4,3,8]
  ```

### `do` blocks  
  + Convenient syntactic sugar 

  ```haskell
  incOverEvens' :: List Int -> List Int
  incOverEvens' xs = do
    i <- xs
    if isEven i then Cons (i + 1) Nil else Nil
  ```

### `do` 'em all
  ```haskell
  -- Maybe
  getLogTime :: String -> Maybe LocalTime
  getLogTime logLine = do
    obj <- Aeson.parse logLine
    metaData <- Map.lookup obj "meta_data"
    timeStampStr <- Map.lookup metaData "log_time"
    parseTime "%d-%m-%Y %HH:%MM:%SS" timeStampStr
  ```

###  
  ```haskell
  -- Aff
  getLastTxn :: String -> Aff (Maybe Txn)
  getLastTxn customerId = do
    accounts <- getAccounts customerId
    if null accounts 
    then pure Nothing
    else do
      txns <- for accounts getTxns
      pure (maximumBy (compare `on` txnDate) txns)
  ```

## Interacting with JS
### Importing JS funcions
  *  Curried
  ```javascript
  exports.add = function(i) {
    return function(j) {
        return i + j; 
    }; 
  }
  ```
  ```haskell
  foreign import add :: Int -> Int -> Int
  ```
  * Uncurried
  ```javascript
  exports.add = function(i, j) { return i + j; }
  ```
  ```haskell
  foreign import add :: Fn2 Int Int Int
  ```

### Importing JS types
#### Primitives
  ```javascript
  exports.foo = "bar";
  exports.i = 5;
  exports.hasProp = true;
  exports.arr = [1,2,3]; 
  // Cannot import an array with multiple types
  exports.employee = { name: "Paul", company: "Juspay" };
  ```
  ```haskell
  foreign import foo :: String
  foreign import i :: Int
  foreign import hasProp :: Boolean
  foreign import arr :: Array Int
  foreign import employee :: { name :: String, company :: String }
  ```

#### When JS types are unknown

  ```javascript
  exports.foo = "bar";
  ```
  ```haskell
  foreign import foo :: Foreign
  -- readString 
  --   :: Foreign 
  --   -> F String -- Except MultipleErrors String
  exclaimFoo :: F String
  exclaimFoo = (\s -> s <> "!!") <$> readString foo
  ```

### Exporting purescript funcions
  ```haskell
    add :: Fn2 Int Int Int
    add = mkFn2 add'

    add' :: Int -> Int -> Int
    add' i j = i + j
  ```
  ```js
  // In the generated JS code.
  add(4,2)
  ```

### Effects
  ```javascript
  exports.logFormatted = function(tag){
    return function(message){
      return function(){
        var dateStr = (new Date).toISOString();
        console.log("[" + tag + "] " + dateStr + message);
      }
    }
  }
  ```
  ```haskell
  foreign import logFormatted :: String -> String -> Effect Unit
  ```

## Purescript web frameworks
  * Elm like 
    * `purescript-pux`
    * `purescript-thermite`
  * Component based
    * `purescript-halogen`
  * `purescript-react`
  * FRP based
    * `purescript-flare`
    * `purescript-specular`
  * `purescript-presto`
  * `purescript-virtual-dom`

## At Juspay
  * Heavily used
    + both on the backend and mobile UI
    + frontend count > 100000 LOC
  * English like code 
    + `DSL`s using `Free Monad`s
  * Bye bye callbacks
