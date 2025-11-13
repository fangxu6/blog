


-----
```
[tms@jseDev ~]$ cat /mnt/data/backups/scripts/mysql_gitea_datart_backup.sh
#!/bin/bash

# A script to perform full backups for mysql

set -o errexit
set -o nounset
# debian需要删除额外配置set -o pipefail
set -o pipefail

# Configuration
readonly USER="jse"                     # MySQL user
readonly PASSWORD="Jse@2024"                    # MySQL password
readonly HOST="192.168.201.183"         # MySQL host
readonly BACKUP_DIR="/mnt/data/backups/mysql/183_gitea_datart"  # Directory for backups
readonly DATE=$(date +"%Y%m%d")                 # Timestamp
readonly LOG_FILE="$BACKUP_DIR/logs/${DATE}.log"

# Ensure backup directory exists
# mkdir -p $BACKUP_DIR

# Dump all databases
mysqldump -u$USER -p$PASSWORD -h$HOST --databases datart giteadb > $BACKUP_DIR/mysql_backup_$DATE.sql

if [ $? -eq 0 ]; then
  echo "$DATE - Backup Successful" >> $LOG_FILE
else
  echo "$DATE - Backup Failed" >> $LOG_FILE
fi

# Optional: delete backups older than 7 days
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
```





## 恢复mysql

把对应的mysql文件上传至需要恢复的服务器

```
# 进入对应目录，比如mysql_backup.sql在/home/tms下面
[tms@alitms ~]$ mysql -uroot -p
# 在mysql下面执行恢复
mysql> source mysql_backup.sql;
```



