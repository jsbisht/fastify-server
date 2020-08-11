#!/bin/bash
sed "s/tagVersion/$1/g" pods.yml > fastify-server-pods.yml