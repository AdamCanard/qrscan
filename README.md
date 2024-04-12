# QR Scanner for Raizapalooza

This is a standalone webapp to scan QR codes for entrance into Raizapalooza.

It interacts specifically with the backend and QR generator for Raizapalooza.

## How to install and run

```
$ npm install
$ npm run dev
```

## Todo

- Login system with cookies/JWT (unique uname + passwords for bouncers and bartenders)
- Send GET request to Adam's API endpoint to increment raffle int
- Ensure scanners cannot abuse raffle incrementing
- Stop scanner from GETting (scanning) five times/sec
- Style page specifically for responsive phone layouts
- ...
