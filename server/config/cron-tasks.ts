import fs from 'fs';
import path from 'path';

export default {
    /**
     * Simple example.
     * Every monday at 1am.
     */
  
    myJob: {
      task: ({ strapi }) => {
        // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
        console.log("START CRON JOB BACKUP DATABASE")
        try {
            console.log('START CRON JOB: BACKUP DATABASE');
    
            const dbPath = path.resolve(__dirname, '../../.tmp/data.db'); // default SQLite path in Strapi
            // const backupDir = path.resolve(__dirname, '../../backups');
            const backupDir = process.env.BACKUP_DIR || '/var/backups/strapi';

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFile = path.join(backupDir, `backup-${timestamp}.sqlite`);
    
            // Ensure backup directory exists
            if (!fs.existsSync(backupDir)) {
              fs.mkdirSync(backupDir);
            }
    
            // Copy database file to backup
            fs.copyFileSync(dbPath, backupFile);
    
            console.log(`✅ Backup created at ${backupFile}`);
          } catch (error) {
            console.error('❌ Backup failed:', error);
          }
    
        console.log(" START CRON JOB BACKUP DATABASE")

      },
      options: {
        rule: "0 1 * * 1",
      },
    },
  };