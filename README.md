# PID service
A REST wrapper around the PID service.

## Usage
```
node index.js --env=qas --port=8080 --url=http://example.com

Arguments:
        --port:         the port to listen on
        --env:          the environment to use (decides /pid-prod or /pid-qas)
        --url:          the url to call
```