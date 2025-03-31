---
title: "服务器连接与管理指南"
---

# 服务器连接与管理指南


### **登录服务器**
```bash
ssh root@172.20.18.7
```

## **Docker 相关**
- **进入容器**
```bash
docker exec -it 910B /bin
```
- **模型路径**
    - `910B_MindIE` → `qwen2.0`
    - `910B` → `deepseek_distill_qwen`
- **MindIE 配置文件路径**
```bash
/Ascend/mindie/latest/mindie-service/conf
```

## **后台运行 Python 脚本**
```bash
nohup python extract.llm_api_mobidfy_prompt_final_Marital_history.py > output.log 2>&1 &
nohup python extract.llm_api_mobidfy_prompt_final_Specialist_examination.py > output.log 2>&1 &
nohup python extract.llm_api_mobidfy_prompt_final_family_history.py &
```

## **进程管理**
- **查看进程**
```bash
ps aux | grep extract.llm_api_mobidfy_prompt_final_Marital_history.py
```
- **查找进程**
```bash
pgrep -fl extract.llm_api_mobidfy_prompt_final_Marital_history.py
```
- **终止进程**
```bash
kill 68201
kill -9 68201  # 强制终止
```

## **SSH 公私钥配置**
- **生成 SSH 密钥**
```bash
ssh-keygen -t ed25519
```
- **追加公钥**
```bash
cat id_ed25519.pub >> ~/.ssh/authorized_keys
```
- **本地主机私钥路径**
```plaintext
C:\Users\25020\.ssh\id_ed25519
```

## **服务器管理**
- **重启服务器**
```bash
reboot
```

## **MindIE 服务**
- **启动 MindIE**
```bash
./mindiedemo
```
- **查看端口监听**
```bash
netstat -tulnp | grep 1025
```
```
tcp        0      0 127.0.0.1:1025          0.0.0.0:*               LISTEN      1848/./bin/mindiese
```
