# SDK Wrapper for TheOneAPI

This SDK access [The One API](https://the-one-api.dev) and exports the functionality for querying the following endpoints:

- /movie
- /movie/{id}
- /movie/{id}/quote
  <br> </br>

## Requirements

- [NodeJS](https://nodejs.org/en/download)
  <br> </br>

## Installation

```shell
npm i kaseris_anastasios-sdk
```

<br> </br>

## Usage

In order to access the api you will need a token from [The One API](https://the-one-api.dev/sign-up) by signing up. Once you acquire a token
you can use it as follows:

### Add to your code:

```js
import { initOneSDK } from "@akaseris/kaseris_anastasios-sdk";

const oneSDK = initOneSDK("YOUR_TOKEN");

// Example calls
const movies = await oneSDK.movies().getAll();
const movies = await oneSDK
  .movies()
  .with("budgetInMillions", "<", 200)
  .getAll();
const movie = await oneSDK.movie("id").get();
const quotes = await oneSDK.movie("id").quotes().sort("dialog", "asc").get();
```

### Available response manipulation:

```js
// Limit
.limit(n: number)

// Page
.page(n: number)

// Offset
.offset(n: number)

// Sorting
.sort(field: string, order: "asc" | "desc")

// Comparison
.with(field: string, op: "==" | "!=" | ">" | "<" | ">=" | "<=" | "in" | "not in", value: any)

// Existence
.exists(field: string)
.notExists(field: string)
```

<br> </br>

## Tests

For tests the jest packages is being used.
In order to run the tests:

1. Go to the root folder of this repo's directory
2. Export env variable with your token

```shell
export "ONE_API_TOKEN"="YOUR_TOKEN"
```

3.

```shell
npm i
```

3.

```shell
npm test
```
