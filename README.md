# PID service
A REST wrapper around the PID service.

## Usage
```
node index.js --env=qas --port=8080 --url=http://hostname/nd/noidu_kt5\?mint
```

| Argument | Meaning | Possible values |
| ------------- | ------------- | ------------- |
| port | the port to listen on | 1024–49151 |
| env | the environment to use (decides /pid-prod or /pid-qas) | [prd, qas] |
| url | the url to call | any url |