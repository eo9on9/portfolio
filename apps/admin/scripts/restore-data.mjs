import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const customerDataDir = resolve('pages/api/customers')
const backupFilePath = resolve(customerDataDir, 'data_back.json')
const targetFilePath = resolve(customerDataDir, 'data.json')

if (!existsSync(backupFilePath)) {
  console.warn(`[restore-customer-data] Backup file missing: ${backupFilePath}`)
  process.exit(0)
}

try {
  copyFileSync(backupFilePath, targetFilePath)
  console.log(
    `[restore-customer-data] Restored ${targetFilePath} from backup before dev startup.`,
  )
} catch (error) {
  console.error(
    '[restore-customer-data] Failed to restore customer data:',
    error,
  )
  process.exitCode = 1
}
