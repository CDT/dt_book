# Linux System Operations

![Angry Linux](/images/angry_linux.jpg)


## Why my shell script setting up environment variables does not work?

**Description :lady_beetle:**: My script below does not work property, no proxy is displayed with `echo $http_proxy` aftering running the script with `./[script name].sh`: 

``` shell
#!/bin/sh
export http_proxy=http://1.2.3.4:888
```

**Answer :wink:**: Running a shell script `./[script name].sh` will start a sub-shell and run the script within the sub-shell's session instead of current shell. To run the script within current shell's session, you should run the script with `source [script name].sh` instead.

---


## Create Shared Folder on Linux

### CentOS:

``` shell
# 1. install packages
sudo yum install samba samba-client samba-common 
```

``` shell
# 2. Edit /etc/samba/smb.conf
# Add a new entry:
[share1]
path = /path/to/shared/directory
valid users = username
read only = no
```

``` shell
# 3. Configure samba user
adduser username
sudo smbpasswd -a username
```

``` shell
# 4. restar samba
sudo systemctl restart smb
```

## Firewall

### CentOS

**1. List open ports:**

``` bash
netstat -lntu
```

**Demo output:**

``` bash
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:445             0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:9443            0.0.0.0:*               LISTEN
udp        0      0 192.168.42.255:137      0.0.0.0:*
udp        0      0 192.168.42.72:137       0.0.0.0:*
```


## FTP

### CentOS

**1. Install the FTP server software (vsftpd):**

``` bash
sudo yum install vsftpd
```

**2. Configure vsftpd:**

- Open and editthe configuration file: `sudo vi /etc/vsftpd/vsftpd.conf`:

   - **To enable local user accounts:**

     ```
     local_enable=YES
     write_enable=YES
     ```

   - **To specify the directory to serve:**

     ```
     local_root=/path/to/your/directory
     ```

- Save and close the configuration file.

**3. Start the vsftpd service:**

```bash
sudo systemctl start vsftpd
```

**4. Enable vsftpd to start at boot:**

```bash
sudo systemctl enable vsftpd
```

**5. Allow FTP traffic through the firewall:**

```bash
sudo firewall-cmd --permanent --add-port=21/tcp
sudo firewall-cmd --reload
```

**6. Create an FTP user (if not using anonymous access):**

```bash
sudo adduser ftpuser
sudo passwd ftpuser
```
