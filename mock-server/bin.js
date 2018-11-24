#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies, no-console */

require('@babel/register')({ extensions: ['.js', '.mjs'] })
require('./server').main().catch(console.error)
