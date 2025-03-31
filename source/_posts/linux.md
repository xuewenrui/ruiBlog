---
title: Linux 服务器常用命令
category: Linux
---
# Linux 服务器常用命令

## 1. 基本系统管理

### 查看系统信息
```bash
uname -a         # 显示系统内核信息
cat /etc/os-release  # 查看系统版本
uptime          # 查看系统运行时间
whoami          # 显示当前用户
```

### 用户管理
```bash
who             # 查看在线用户
id <username>   # 查看用户 ID
adduser <username>  # 添加用户
passwd <username>   # 修改用户密码
usermod -aG <group> <username>  # 添加用户到组
```

### 进程管理
```bash
ps aux          # 显示所有进程
pgrep -fl <process_name>  # 查找进程
kill <PID>      # 终止进程
kill -9 <PID>   # 强制终止进程
htop            # 交互式查看进程（需要安装）
```

## 2. 文件与目录操作

```bash
ls -al          # 列出所有文件（包括隐藏文件）
cd <directory>  # 进入目录
pwd             # 显示当前目录
mkdir <dir>     # 创建目录
rm -rf <dir>    # 删除目录或文件（慎用）
find /path -name "*.log"  # 查找文件
```

## 3. 网络管理

### 查看网络状态
```bash
ifconfig        # 查看网络接口信息（旧版）
ip addr show    # 查看 IP 地址（推荐）
ip link show    # 显示网络设备状态
netstat -tulnp  # 查看所有监听端口
```

### 远程连接与传输
```bash
ssh user@host   # 远程连接服务器
scp file user@host:/path/to/destination  # 复制文件到远程服务器
rsync -av file user@host:/path/  # 高效同步文件
```

## 4. 磁盘与存储
```bash
df -h           # 查看磁盘使用情况
du -sh <dir>    # 查看目录大小
mount           # 查看已挂载设备
umount <device> # 卸载设备
```

## 5. 软件管理（适用于 Ubuntu/Debian）
```bash
apt update      # 更新软件包列表
apt upgrade     # 升级系统
apt install <package>  # 安装软件
apt remove <package>   # 卸载软件
```

## 6. 其他常用命令
```bash
echo "hello"     # 输出文本
cat file.txt    # 显示文件内容
tail -f file.log  # 实时查看日志
history         # 显示历史命令
reboot          # 重启服务器
shutdown -h now # 立即关机
```

这些是 Linux 服务器上常用的基础命令，能够帮助你进行基本的系统维护、用户管理、文件操作和网络管理。

