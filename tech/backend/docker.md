---
outline: 'deep'
---

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

## Core Concepts

### Volume and Mounts

Docker allows you to create volumes or bind mounts to share data between the host system and the container.

**Volumes:** These are managed by Docker and are stored outside the container’s filesystem. Volumes persist even if the container is removed. You can use volumes to store data that needs to be shared across containers or preserved between container restarts.

**Bind Mounts:** These directly map a directory or file from the host system into the container. Bind mounts allow you to access files from the host system within the container. Changes made in the container are reflected on the host system and vice versa.

Use `docker inspect [container_name]` to show the detailed information of a docker image, find the `Mounts` and `Volumes` property of the returned json.

Here is an example `Mounts` property:

``` json
"Mounts": [
    {
        "Type": "volume",
        "Name": "362e91749ff026850e4def0dd6e7a755b48fbe2b34993545ea903bfa768a8f0d",
        "Source": "/var/lib/docker/volumes/362e91749ff026850e4def0dd6e7a755b48fbe2b34993545ea903bfa768a8f0d/_data",
        "Destination": "/var/lib/pgadmin",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
]

"Config": {
  "Volumes": [
    "/var/lib/pgadmin": {}
  ]
}
```

In the above mount,
  - docker mapped an internal volume of an image to the external file storage system of the host. In the image's shell, the path of the volume is `/var/lib/pgadmin`, in the host's shell, the path is the long path identified by the `Source` property.

  - The volume is associated with the path `/var/lib/pgadmin`. The empty object `{}` indicates that this volume is uninitialized (i.e., it doesn’t have any pre-existing data).


## Operation and Maintenance

### Docker exec

`docker exec` executes a command in a running container.

To enter an interative shell inside a docker container, use this command: 

``` bash
docker exec -it [container_name] sh
```

`-it` stands for `interactive` and `tty`. Sometimes, `sh` will not work, try `bash` instead.

### Running an image and starting a container

Take `hello-world` image as an example.

Pull the image:

``` bash
docker pull hello-world
```

Run the image:

``` bash
docker run hello-world
```

Running the image will create containers. See all containers created: 

``` bash
docker ps -a
```

```
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED          STATUS                      PORTS     NAMES
99a91d9b2d02   hello-world   "/hello"   42 seconds ago   Exited (0) 42 seconds ago             goofy_visvesvaraya
```

When the `hello-world` image runs, a container named `goofy_visvesvaraya` is created and will remain after the process terminated.
If your image contains useful data like configuration and you do not want to generate the data again each time the image runs, just start the previous container.

Start a previous container: 

``` bash
docker start [container_name]
```

Let's assume that the `container_name` is `great_newton`.

By default, running the command `docker start great_newton` only echoes the container name and will not show any output.

To see the output, use `docker start -a great_newton` instead. `-a` stands for attach.

To run in an interactive mode, use `docker start -i great_newton`.

### Stopping and removing a container

To stop a container, use `docker stop [container_name]`.

To stop all running containers, use `docker stop $(docker ps -q)`.

To remove a container, use `docker rm [container_name]`.

Stopping a container just kills the process while removing a container completely deletes the container data files. However, images still remain and new containers can still be created.

## Other Frequently Used Commands

| Description | Command | Note |
|:---|:---:|:---|
| List running images | `docker ps` | |
| Show logs | `docker logs [container_name] [-f] [--tail 10]` | `--tail 10` will only print the last 10 lines of logs. `-f` is follow mode which will keep tailing the logs |
| Show low-level information on Docker objects | `docker inspect [container_name]`| |
