#!/bin/bash

openssl req -x509 -out ./tls/accesso.crt -keyout ./tls/accesso.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost:3000' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost:3000\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost:3000\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
