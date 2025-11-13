在192.168.53.250的crontab

rsync\_backup.sh

```
#!/bin/bash

# A script to perform incremental backups using rsync

set -o errexit
set -o nounset
# debian需要删除或者额外配置set -o pipefail
set -o pipefail

# readonly SOURCE_DIR="${HOME}"
# 源目录
# readonly SOURCE_DIR="/home/tms/logs/csp"
# 远程主机地址
readonly REMOTE_HOST="root@192.168.200.1"
# 远程目标目录 先用backup测试
readonly REMOTE_DEST="/mnt/VMware/prober/MAP"
readonly BACKUP_DIR="/mnt/data/backups/prober/MAP"
readonly DATETIME="$(date '+%Y-%m-%d')"
readonly BACKUP_PATH="${BACKUP_DIR}/${DATETIME}"
readonly LATEST_LINK="${BACKUP_DIR}/latest"
readonly LOG_FILE="/mnt/data/backups/prober/MAP/rsynclog/${DATETIME}.log"

# touch "${LOG_FILE}"

rsync -av \
  --log-file="${LOG_FILE}" \
  "$REMOTE_HOST:${REMOTE_DEST}/" \
  --link-dest "${LATEST_LINK}" \
  --exclude=".cache" \
  "${BACKUP_PATH}"

rm -rf "${LATEST_LINK}"
ln -s "${BACKUP_PATH}" "${LATEST_LINK}"

```



```
[tms@jseDev backups]$ crontab -l
# 每小时的0分钟执行一次
0 * * * * /mnt/data/backups/rsync_backup.sh

```

