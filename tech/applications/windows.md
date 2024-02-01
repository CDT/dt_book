---
outline: 'deep'
---

# Windows

![vault boy smashing windows computer](/images/vaultboy_smashing_windows.jpeg)

## SMB & UNC

SMB and UNC are related technologies for accessing files and folders over a network:

- SMB (Server Message Block) is a network file sharing protocol that allows applications on a computer to read and write files and to request services from server programs on a computer network. 

- UNC (Uniform Naming Convention) is a way to identify resources like files and folders on a network using pathnames. 

Some key points:

- SMB enables accessing files or printers on a remote server. It is built on top of NetBIOS and runs over TCP port 445.

- UNC pathnames are used to specify the location of resources on an SMB network. For example, `\\server\share\file.txt`

- The UNC naming format is: `\\servername\sharename\path\filename`

- UNC works hand-in-hand with SMB. When a client accesses a UNC path, the SMB protocol negotiates the connection and handles the file operations.

- Using UNC paths allows accessing resources on a remote SMB server just like they are stored locally on the client machine.

- UNC eliminates the need to map network drives and allows direct access to any networked share.

In summary:

- SMB is the underlying network protocol that handles remote file system access. 

- UNC provides a standard way to specify pathnames for resources on SMB networks. Together they enable seamless file access across computers on a LAN.

## IIS

### 虚拟目录

虚拟目录(Virtual Directory)是IIS中的一个重要概念,它允许将硬盘上的物理路径映射到网站中的一个虚拟路径。

- **传递身份验证是什么？**

![IIS Virtual Directory](/images/IIS_VirtualDirectory.png)

"IIS 虚拟目录的“传递身份认证”选项是用于指定是否将客户端的身份验证信息传递到虚拟目录所连接的远程服务器（如 SMB 共享服务器）上。这个选项通常涉及到在通过虚拟目录访问远程资源时如何处理用户身份验证。

如果启用了“传递身份认证”选项，IIS 将会尝试使用客户端提供的身份验证信息来访问远程服务器。这通常涉及到基本身份验证（Basic Authentication）或其他支持身份验证传递的身份验证方式。

如果禁用了“传递身份认证”选项，IIS 将使用虚拟目录的应用程序池中配置的身份进行访问远程服务器。这意味着，无论客户端提供了什么身份验证信息，IIS 都将使用应用程序池的身份进行远程访问。

在设置虚拟目录时，根据你的安全需求和远程服务器的配置，你可能需要根据具体情况启用或禁用“传递身份认证”选项。如果远程服务器要求使用特定用户的凭据，你可能需要启用此选项，并在虚拟目录的身份验证设置中提供相应的用户名和密码。如果不需要传递客户端的身份验证信息，你可以禁用此选项，并确保虚拟目录的应用程序池具有足够的权限访问远程资源。"

- **如何访问带身份验证的SMB文件夹？**

在IIS（Internet Information Services）中，如果需要将虚拟目录映射到一个使用SMB（Server Message Block）协议的网络共享路径，并且需要使用用户名和密码进行访问，可以按照以下步骤进行设置：

1. **在服务器上创建网络共享：**
   - 确保你的共享路径已经在网络中可用，并且你有相应的共享路径、用户名和密码。

2. **创建虚拟目录：**
   - 打开 IIS 管理器。
   - 在左侧导航栏中，找到你的网站，右键点击并选择“添加虚拟目录”或“转到虚拟目录”。
   - 在虚拟目录的属性中，设置别名（Alias），这是你将在 URL 中使用的路径别名。

3. **配置虚拟目录的物理路径：**
   - 在虚拟目录属性中，设置物理路径为你的 SMB 共享路径，类似于 `\\server\share\path`。

4. **配置身份验证：**
   - 在虚拟目录的属性中，找到“身份验证”选项。
   - 确保选择了适当的身份验证方式，通常是“基本身份验证”。
   - 输入共享路径所需的用户名和密码。

5. **设置权限：**
   - 确保 IIS 进程（通常是 `IIS_IUSRS` 组）具有访问 SMB 共享路径的权限。
   - 在 SMB 共享服务器上，确保设置了正确的共享和文件夹权限，以允许 IIS 进程访问。

6. **重新启动 IIS：**
   - 在完成设置后，建议重新启动 IIS 服务，以确保新的虚拟目录设置生效。

- IIS的“应用程序用户”是哪个？

在 IIS 中，"应用程序用户"通常是指应用程序池的身份。每个 IIS 应用程序池都有一个关联的身份，用于运行该应用程序池中的 Web 应用程序。这个身份通常是一个 Windows 用户账户或一个内置的服务账户（例如 Network Service、Local Service 或 ApplicationPoolIdentity）

IIS的“应用程序用户”是指运行应用程序的工作进程所使用的用户。应用程序用户可以是本地用户、域用户、服务帐户或自定义帐户。

默认情况下，IIS应用程序池的应用程序用户设置为“ApplicationPoolIdentity”。ApplicationPoolIdentity是IIS自动生成的虚拟帐户，具有与应用程序池相同的名称。ApplicationPoolIdentity具有最低特权，仅具有访问应用程序所需的权限。

如果需要，也可以将应用程序池的应用程序用户设置为其他用户。例如，可以将应用程序用户设置为本地用户或域用户，以便应用程序可以访问本地文件系统或域资源。也可以将应用程序用户设置为服务帐户，以便应用程序可以运行在具有较高特权的服务帐户下。

## 用户

### 组

## QA

### 共享驱动器/共享文件夹

::: tip
最好设置带密码访问的共享文件夹，如果要配置无密码访问的共享文件夹，步骤比较复杂
:::

驱动器右键->共享->高级共享
  - 勾选“共享此文件夹”
  - 设置共享名
  - 点击“权限”，添加Everyone，并勾选下方所有权限

如果要配置所有人都可以访问，不需要账号密码，则增加如下配置：

1. 驱动器右键->安全->编辑
   - 增加Guest用户
   - 勾选所有权限

2. 控制面板->网络和Internet->网络和共享中心->高级共享设置
   - 所有网络：密码保护的共享，关掉此选项

3. 组策略->计算机配置->Windows设置->安全设置->本地策略->用户权限分配
   - 拒绝从网络访问这台计算机：去掉Guest用户