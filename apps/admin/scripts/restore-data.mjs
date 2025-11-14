import { copyFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const dataDir = resolve('source/shared/server/data')

if (!existsSync(dataDir)) {
  console.warn(`[restore-data] Data directory missing: ${dataDir}`)
  process.exit(0)
}

const entries = readdirSync(dataDir, { withFileTypes: true })
const backupFiles = entries
  .filter(entry => entry.isFile() && entry.name.endsWith('_back.json'))
  .map(entry => entry.name)

if (backupFiles.length === 0) {
  console.warn(`[restore-data] No backup files found in ${dataDir}`)
  process.exit(0)
}

try {
  backupFiles.forEach(backupName => {
    const targetName = backupName.replace(/_back\.json$/, '.json')
    const backupPath = resolve(dataDir, backupName)
    const targetPath = resolve(dataDir, targetName)

    if (!existsSync(targetPath)) {
      console.warn(
        `[restore-data] Target file missing for backup ${backupName}: ${targetPath}`,
      )
      return
    }

    copyFileSync(backupPath, targetPath)
    console.log(`[restore-data] Restored ${targetName} from backup.`)
  })
} catch (error) {
  console.error('[restore-data] Failed to restore data files:', error)
  process.exitCode = 1
}
