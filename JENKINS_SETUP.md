# Jenkins Setup Guide

This guide provides step-by-step instructions for setting up a Jenkins environment using Docker.

## 1. Launch Jenkins Container

First, you need to create a directory on the host machine to store the Jenkins data persistently.

```bash
sudo mkdir -p /opt/jenkins_home
sudo chown -R 1000:1000 /opt/jenkins_home
```

Now, run the following command to start the Jenkins container:

```bash
docker run -d --name jenkins \
  -p 8888:8080 \
  -p 50000:50000 \
  -v /opt/jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

**Command Breakdown:**

- `-d`: Runs the container in detached mode.
- `--name jenkins`: Assigns the name `jenkins` to the container.
- `-p 8888:8080`: Maps port `8888` on the host to port `8080` in the container (for the Jenkins web UI).
- `-p 50000:50000`: Maps port `50000` for agent communication.
- `-v /opt/jenkins_home:/var/jenkins_home`: Mounts the host directory `/opt/jenkins_home` to `/var/jenkins_home` inside the container for persistent storage.
- `jenkins/jenkins:lts`: Specifies the official Jenkins LTS Docker image.

## 2. Initial Setup Wizard

Once the container is running, you need to unlock Jenkins using the initial administrator password.

1.  **Retrieve the Initial Admin Password:**
    Get the password from the container's logs by running the following command:

    ```bash
    docker logs jenkins
    ```

    You will see output similar to this. Copy the alphanumeric password.

    ```
    *************************************************************
    *************************************************************
    *************************************************************

    Jenkins initial setup is required. An admin user has been created and a password generated.
    Please use the following password to proceed to installation:

    [initial_admin_password]

    This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

    *************************************************************
    *************************************************************
    *************************************************************
    ```

2.  **Unlock Jenkins:**
    - Open your web browser and navigate to `http://localhost:8888`.
    - Paste the initial administrator password into the "Administrator password" field and click "Continue".

## 3. Plugin Installation

1.  On the "Customize Jenkins" page, click **"Install suggested plugins"**. Jenkins will begin installing a set of recommended plugins.

2.  **Install Additional Plugins:**
    After the initial setup is complete, you will need to install a few more plugins manually.
    - Navigate to **Manage Jenkins > Plugins**.
    - Go to the **Available plugins** tab.
    - Search for and install the following plugins:
      - `Pipeline`
      - `AWS Credentials`
      - `SSH Agent`
      - `Blue Ocean`

## 4. Create First Admin User

After the plugins are installed, you will be prompted to create the first admin user. Fill in the required details (username, password, full name, and email address) and click **"Save and Continue"**.

## 5. Instance Configuration

Confirm the Jenkins URL. The default `http://localhost:8888/` should be correct. Click **"Save and Finish"**.

Your Jenkins setup is now ready!

## 6. Credential Setup Placeholders

The following credentials will need to be created manually in Jenkins for the CI/CD pipeline to function correctly. You will create these later based on other instructions.

Navigate to **Manage Jenkins > Credentials > System > Global credentials (unrestricted)** and click **"Add Credentials"** for each of the following.

| ID                      | Type                          | Description                                 |
| ----------------------- | ----------------------------- | ------------------------------------------- |
| `aws-credentials`       | AWS Credentials               | For AWS CLI access.                         |
| `pi-ssh-key`            | SSH Username with private key | For SSH access to the Raspberry Pi.         |
| `dockerhub-credentials` | Username with password        | For logging into Docker Hub to push images. |
