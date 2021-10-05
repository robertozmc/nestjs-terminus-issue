#!/bin/bash

docker-compose \
    -f docker-compose.yml \
    -p "terminus_test_service" up \
    --abort-on-container-exit \
    --exit-code-from terminus_test_service
