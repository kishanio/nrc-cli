
# CLI to Upload Participant List to NRC API

This CLI tool is used to upload a participant list to the NRC API. It is currently in development,

# Pending Tasks

- [ ] Add support for uploading to the live NRC API
- [ ] Test Case
- [ ] Logging
- [ ] Publishing ci to NPM
- [ ] Usage Package as commandline binary

## Requirements
- Node.js version > 16

## Getting Started
1. Install dependencies: `npm i`
2. Run the tool: `npm run dev -- --file ./seed/project_participants.xlsx --api-key test`

```
Options:
  -V, --version           output the version number
  -f, --file <file>       XLSX file with participant data
  -k, --api-key <apiKey>  API Key to be passed to the NRC API
  -h, --help              display help for command
```

