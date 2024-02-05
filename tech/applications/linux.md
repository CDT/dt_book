# Linux System Operations

![Angry Linux](/images/angry_linux.jpg)


## Why my shell script setting up environment variables does not work?

**Description :lady_beetle:**: My script below does not work property, no proxy is displayed with `echo $http_proxy` aftering running the script with `./[script name].sh`: 

``` bash
#!/bin/sh
export http_proxy=http://1.2.3.4:888
```

**Answer :wink:**: Running a shell script `./[script name].sh` will start a sub-shell and run the script within the sub-shell's session instead of current shell. To run the script within current shell's session, you should run the script with `source [script name].sh` instead.

---


## Create Shared Folder on Linux

### SMB

``` bash
# 0. Allow ports
firewall-cmd --permanent --add-port=139/tcp
firewall-cmd --permanent --add-port=445/tcp
firewall-cmd --reload
```

``` bash
# 1. install packages
sudo yum install samba samba-client samba-common 
```

``` bash
# 2. Edit /etc/samba/smb.conf
# Add a new entry:
[share1]
path = /path/to/shared/directory
valid users = username
read only = no
```

``` bash
# 3. Configure samba user
adduser username
sudo smbpasswd -a username
```

``` bash
# 4. restar samba
sudo systemctl restart smb
```

### FTP


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

## Create user and enable sudo

1. Create user

``` bash
addUser username
passwd username
```

2. Configure `wheel` group

``` bash
visudo
```

Check if the following line is commented, if so uncomment that line:

``` bash
%wheel ALL=(ALL) ALL
```

3. Add user to `wheel` group

``` bash
usermod -aG wheel username
```

## Switch to a color scheme with font color other than dark blue

List the color schemes available:

``` bash
## NN stands for your version
ls /usr/share/vim/vimNN/colors/
```

Start vim and switch to one of the color schemes. Use the `:color [scheme name]` command.

For example, `:color desert` will switch to `desert` scheme.

To permanently change the color scheme, edit `~/.vimrc` and add the folowing line:

```
colorscheme [scheme name]
```

## Frequently Used Commands 

| Usage | Command | Description |
|:---:|:---:|:---|
| Show network status | `netstat -tulp` | Includnig open ports and corresponding PID |
| Expose port | `firewall-cmd --permanent --add-port=80/tcp` | run `firewall-cmd --reload` after rule added |
| List open ports for firewall | `firewall-cmd --list-ports` | |
| Disable SELinux | `sudo setenforce 0` | Just feel free to disable it as SELinux is over complex |

