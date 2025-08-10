# Ansible Raspberry Pi Portfolio Deployment

This Ansible project automates the bootstrapping and deployment of a Docker-based portfolio application to a Raspberry Pi.

## Project Structure

```
ansible/
├── ansible.cfg                    # Ansible configuration
├── playbook.yml                   # Main playbook
├── inventory/
│   └── hosts.ini.example         # Inventory template
└── roles/
    ├── pi_bootstrap/             # Bootstrap role
    │   └── tasks/
    │       └── main.yml
    └── pi_deploy/                # Deployment role
        ├── tasks/
        │   └── main.yml
        ├── templates/
        │   └── backend.env.j2
        └── vars/
            └── main.yml
```

## Prerequisites

1. **Ansible installed** on your control machine:

   ```bash
   pip install ansible
   ```

2. **SSH access** to your Raspberry Pi with sudo privileges

3. **AWS CLI configured** (if using ECR):

   ```bash
   aws configure
   ```

4. **Docker Compose file** and application source ready for deployment

## Setup Instructions

### 1. Configure Inventory

Copy the example inventory file and customize it:

```bash
cp inventory/hosts.ini.example inventory/hosts.ini
```

Edit `inventory/hosts.ini` with your Raspberry Pi details:

```ini
[pi]
raspberrypi ansible_host=YOUR_PI_IP_ADDRESS

[pi:vars]
ansible_user=pi
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

### 2. Configure Variables

Edit the variables in `roles/pi_deploy/vars/main.yml` or override them in the playbook:

```yaml
# Basic configuration
deploy_path: "/opt/portfolio"
backend_port: 3001
postgres_user: "postgres"
postgres_db: "portfolio_db"

# ECR configuration (optional)
use_ecr: false # Set to true if using AWS ECR
aws_region: "us-east-1"
ecr_repository_uri: "123456789012.dkr.ecr.us-east-1.amazonaws.com/portfolio-backend"

# SSM Parameter Store variables
backend_env_vars:
  - name: "/portfolio/postgres/password"
    env_name: "POSTGRES_PASSWORD"
  - name: "/portfolio/jwt/secret"
    env_name: "JWT_SECRET"
```

### 3. Set Up AWS SSM Parameters (Recommended)

Store sensitive configuration in AWS Systems Manager Parameter Store:

```bash
# Database password
aws ssm put-parameter \
  --name "/portfolio/postgres/password" \
  --value "your-secure-password" \
  --type "SecureString"

# JWT secret
aws ssm put-parameter \
  --name "/portfolio/jwt/secret" \
  --value "your-jwt-secret" \
  --type "SecureString"
```

## Usage

### Basic Deployment (Docker Hub)

For a simple deployment using Docker Hub images:

```bash
ansible-playbook playbook.yml
```

### ECR Deployment

For deployment using AWS ECR (requires ECR repository setup):

```bash
ansible-playbook playbook.yml -e "use_ecr=true" -e "ecr_repository_uri=YOUR_ECR_URI"
```

### Skip ECR Tasks

To explicitly skip ECR-related tasks:

```bash
ansible-playbook playbook.yml --skip-tags ecr
```

### Custom Variables

Override default variables:

```bash
ansible-playbook playbook.yml \
  -e "deploy_path=/home/pi/portfolio" \
  -e "backend_port=8080" \
  -e "aws_region=us-west-2"
```

## Roles Description

### `pi_bootstrap`

Prepares the Raspberry Pi environment:

- Installs Docker and Docker Compose plugin
- Installs AWS CLI v2
- Configures ECR authentication (optional)

### `pi_deploy`

Deploys the portfolio application:

- Pulls Docker images (from ECR or Docker Hub)
- Fetches configuration from AWS SSM Parameter Store
- Generates environment files from templates
- Deploys services using Docker Compose
- Performs health checks

## Configuration Options

### Environment Variables

The deployment supports fetching environment variables from:

1. **AWS SSM Parameter Store** (recommended for production)
2. **Direct variable definition** in playbook
3. **Template customization** in `backend.env.j2`

### Image Sources

- **Docker Hub**: Standard images like `postgres:15-alpine`
- **AWS ECR**: Custom application images (production recommended)
- **Local builds**: Build images on the Pi (development)

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**

   ```bash
   # Test SSH connectivity
   ansible pi -m ping
   ```

2. **Docker Permission Denied**

   ```bash
   # Add user to docker group (run on Pi)
   sudo usermod -aG docker $USER
   ```

3. **ECR Authentication Failed**

   ```bash
   # Verify AWS credentials
   aws sts get-caller-identity
   ```

4. **Health Check Failed**
   ```bash
   # Check service logs on Pi
   docker compose -f /opt/portfolio/docker-compose.yml logs
   ```

### Debugging

Run with verbose output:

```bash
ansible-playbook playbook.yml -vvv
```

Check specific tasks:

```bash
ansible-playbook playbook.yml --start-at-task="Task Name"
```

## Security Best Practices

1. **Use SSH keys** instead of passwords
2. **Store secrets** in AWS SSM Parameter Store or Ansible Vault
3. **Limit SSH access** to specific IP ranges
4. **Use ECR** for private container images
5. **Regular updates** of base images and packages

## Production Considerations

- Set up **monitoring** and **logging**
- Configure **backup strategies** for data volumes
- Implement **rolling deployments** for zero-downtime updates
- Use **infrastructure as code** for reproducible environments
- Set up **CI/CD pipelines** for automated deployments

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Ansible logs with `-vvv` flag
3. Verify AWS permissions and connectivity
4. Test individual components manually
