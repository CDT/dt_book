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