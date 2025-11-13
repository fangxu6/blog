rclone\_backup\_program.sh

```
#!/bin/bash

# A script to perform incremental backups using rsync

set -o errexit
set -o nounset
# debian需要删除或者额外配置set -o pipefail
set -o pipefail

readonly DATETIME="$(date '+%Y-%m-%d')"
readonly LOG_DIR="/mnt/data/backups/program/logs"
readonly LOG_FILE="${LOG_DIR}/${DATETIME}.log"

# 设置Minio和备份目标路径
minio_bucket="200-1minio:tms"
backup_path="/mnt/data/backups/program/200.1_minio_tms"
# 使用rclone进行备份
rclone sync -v $minio_bucket $backup_path --exclude "/{datalog}/**" >> $LOG_FILE 2>&1
```

crontab

```
# 每天的1时10分钟执行一次
10 1 * * * /mnt/data/backups/scripts/rclone_backup_program.sh
```

