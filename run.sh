#!/bin/sh
rm dist -rf
tsc && cd dist && node main.js