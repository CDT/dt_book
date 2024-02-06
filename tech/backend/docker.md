# Docker

![Docker logo](/images/vaultboy_docker.jpg)

## Installation

### Docker Engine (CentOS)

Reference: [Install Docker on CentOS](https://docs.docker.com/engine/install/centos/)

Set up the repository:

``` bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

Install Docker:

``` bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Start Docker:

``` bash
sudo systemctl start docker
```

Verify docker by running the `hello-world` image:

``` bash
sudo docker run hello-world
```

If you see `Hello from Docker!`then your Docker installation is complete.

## Operation and Maintenance

### Docker exec

`docker exec` executes a command in a running container.

To enter an interative shell inside a docker container, use this command: 

``` bash
docker exec -it [image_name] sh
```

`-it` stands for `interactive` and `tty`. Sometimes, `sh` will not work, try `bash` instead.

## Frequently Used Commands

| Description | Command | Note |
|:---|:---:|:---|
| List running images | `docker ps` | |
| Show logs | `docker logs [image_name] [-f] [--tail 10]` | `--tail 10` will only print the last 10 lines of logs. `-f` is follow mode which will keep tailing the logs |