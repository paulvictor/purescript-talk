module Main where

import Data.Array
import Data.Int
import Prelude

import Effect (Effect)
import Effect.Console (log)
import Math as M

main :: Effect Unit
main = do
  log "Hello sailor!"

data FizzBuzz = Fizz | Buzz | FizzBuzz | NonFB Int

fizzBuzz :: Partial ⇒ Int → FizzBuzz
fizzBuzz x
  | x `rem` 3 == 0
    && x `rem` 5 == 0 = FizzBuzz
  | x `rem` 3 == 0 = Fizz
  | x `rem` 5 == 0 = Buzz
{--fizzBuzz x = NonFB x--}

fizzBuzzes = map fizzBuzz

x :: Partial ⇒ Array FizzBuzz
x = map fizzBuzz (1..100)

factors x = do
  y <- 2 .. (ceil $ M.sqrt(toNumber x))
  z <- 2 ..  (ceil $ M.sqrt(toNumber x))
  if y * z == x
    then pure y
    else mempty

