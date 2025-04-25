import fs from 'fs';
import path from 'path';

export default {
  myJob: {
    task: ({ strapi }) => {
      console.log("START CRON JOB BACKUP DATABASE");

      try {
        const dbPath = path.resolve(__dirname, '../../.tmp/data.db');
        const backupDir = process.env.BACKUP_DIR || '/var/backups/strapi';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = path.join(backupDir, `backup-${timestamp}.sqlite`);

        // Ensure backup directory exists
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }

        // Copy database file to backup
        fs.copyFileSync(dbPath, backupFile);
        console.log(`✅ Backup created at ${backupFile}`);

        // Keep only latest 5 backups
        const files = fs.readdirSync(backupDir)
          .filter(file => file.startsWith('backup-') && file.endsWith('.sqlite'))
          .map(file => ({
            name: file,
            time: fs.statSync(path.join(backupDir, file)).mtime.getTime()
          }))
          .sort((a, b) => b.time - a.time); // Sort newest first

        const excessFiles = files.slice(5); // files beyond the 5 most recent
        for (const file of excessFiles) {
          fs.unlinkSync(path.join(backupDir, file.name));
          console.log(`🗑️ Deleted old backup: ${file.name}`);
        }

      } catch (error) {
        console.error('❌ Backup failed:', error);
      }
    },
    options: {
      rule: "0 1 * * 1", // Every Monday at 1AM
    },
  },
};
