import { generateService } from 'openapi-genuu'

await generateService({
  requestLibPath: 'import request from \'../../utils/request\';',
  schemaPath: 'http://127.0.0.1:4523/export/openapi?projectId=3830391&version=3.0',
  serversPath: './src/.generated',
})
