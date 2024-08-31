# parse-proxy [![Build Status](https://travis-ci.com/DevHigley/parse-proxy.svg?branch=master)](https://travis-ci.com/DevHigley/parse-proxy)

## Description

parse-proxy is a lightweight Node.js proxy string parsing library

### What it does:

-   parses a string of proxies into an array of proxy objects
-   supports multiple delimiters (comma, newline, space)
-   supports proxy authentication
-   supports proxy protocols

## Installation

```
npm install @devhigley/parse-proxy
yarn add @devhigley/parse-proxy
```

## Usage
### Basic example delimited by comma and space:
```js
const parseProxy = require("@devhigley/parse-proxy");

parseProxy(`1.1.1.1:80, 2.2.2.2:80, 3.3.3.3:80`);
```
#### Result:
```js
[
  { host: '1.1.1.1', port: 80, protocol: 'http' },
  { host: '2.2.2.2', port: 80, protocol: 'http' },
  { host: '3.3.3.3', port: 80, protocol: 'http' }
]
```
### Example with protocol and authentication, delimited by new line:
```js
const parseProxy = require("@devhigley/parse-proxy");

parseProxy(`https://user:pass@104.236.55.48:8080
            https://user:pass@213.105.29.14:3128`);
```
#### Result:
```js
[
  {
    host: '104.236.55.48',
    port: 8080,
    protocol: 'https',
    auth: { username: 'user', password: 'pass' }
  },
  {
    host: '213.105.29.14',
    port: 3128,
    protocol: 'https',
    auth: { username: 'user', password: 'pass' }
  }
]
```
