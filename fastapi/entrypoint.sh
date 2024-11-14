#!/bin/bash

uvicorn "eeg_api:app" --host ${FASTAPI_HOST} --port ${FASTAPI_PORT}
