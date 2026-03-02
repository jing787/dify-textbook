# Chapter 17: Self-Hosted Deployment — Full Control Over Your Data

> TechStore's AI tools were becoming deeply integrated into the business. One day, the CTO called Lynn and the IT department together for a meeting.
>
> *"The Dify cloud service we're using — all the data is stored on their servers, right?"*
>
> *"Yes, it's stored on Dify's cloud servers."* The IT director answered.
>
> *"That's a concern. Our customer service conversations may contain phone numbers, order numbers, and other personal information. If we start connecting business data too, the risk gets even bigger. Can we deploy Dify on our own servers?"*
>
> The IT director looked at Lynn: *"Does Dify support self-hosted deployment?"*
>
> *"Yes, Dify offers a self-hosted deployment option."*

## Cloud Service vs Self-Hosted

| | Cloud Service | Self-Hosted |
|---|--------|----------|
| Deployment location | Dify's servers | Your own servers |
| Ops responsibility | Dify handles it | You handle it |
| Data storage | On Dify's cloud servers | Fully under your control |
| Cost | Pay-as-you-go | Server costs only |
| Getting started | Out of the box | Requires technical expertise |

**When to choose self-hosted?**
- Handling sensitive data (customer information, trade secrets)
- Data localization compliance requirements
- Need for deep customization
- Have a dedicated ops team

TechStore's situation: Customer service conversations contain customer information, and business data may be connected in the future. Self-hosted is the safer choice.

## Docker Compose Deployment

John from the IT department said: *"Docker Compose is the simplest way to deploy. I'll handle it."*

**Prerequisites:**
- A server (minimum 2 CPU cores, 4GB RAM; for production, 4 cores and 8GB+ recommended)
- Docker and Docker Compose installed

**Deployment steps:**

```bash
# 1. Download the latest Dify release (recommended — more stable than cloning the main branch)
# Requires git, curl, and jq pre-installed
git clone --branch "$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)" https://github.com/langgenius/dify.git
cd dify/docker

# 2. Configure environment variables
cp .env.example .env
# Edit .env and change default passwords!

# 3. Start the services
docker compose up -d
```

This command starts a set of containers: nginx, web, api, worker, db (PostgreSQL), redis, weaviate (vector database), sandbox (code execution sandbox)...

**Step 4: Access**

Open a browser and navigate to `http://your-server-IP`

On first visit, you'll be prompted to set up an admin account.

---

John finished the setup in under 10 minutes.

*"That's it?"* Lynn was a bit surprised.

*"Containerized deployment is that simple. But this is just a dev/test environment — production requires some hardening."*

## Production Hardening

John continued: *"To go to production, there are a few more things to do."*

1. **Configure HTTPS**: Set up SSL certificates with Nginx
2. **Change default passwords**: All passwords in the .env file need to be updated
3. **Configure backups**: Schedule regular database backups
4. **Monitoring and alerts**: Monitor server and container status
5. **Access control**: Firewall, IP allowlisting

John spent most of the day getting all of this configured.

*"Now you can migrate your applications over."*

Lynn logged into the newly deployed Dify instance, imported the previously exported DSL files, and the applications were restored.

*"Knowledge Base documents need to be re-uploaded, but conversation history doesn't need to be migrated."*

Lynn spent an afternoon migrating all applications and Knowledge Bases to the self-hosted Dify instance.

**From that point on, all of TechStore's AI application data was stored entirely on their own servers.**

## Cost Comparison

The finance team asked Lynn: *"Does self-hosting save money?"*

| | Cloud Service (Team plan) | Self-Hosted |
|---|------------------|----------|
| Monthly fee | ~$159/month | — |
| Server | — | ~$50–100/month (cloud VM) |
| LLM API costs | Separate | Separate |
| Ops labor | None | IT team handles alongside other duties |

**Conclusion:**
- High usage → Self-hosted is more cost-effective
- Low usage → Cloud service is more hassle-free
- Data compliance requirements → Self-hosted is a must

## Ongoing Maintenance

Deployment is just the beginning.

**Routine maintenance:**
- Monitor server status
- Regularly check backups
- Review usage logs

**Version upgrades:**
```bash
cd dify/docker
# Back up the current version first
cp -r . ../dify-docker-backup
git pull
docker compose down
docker compose pull    # Pull latest images to avoid using stale cache
docker compose up -d
```

::: tip Recommendation
Don't chase the latest version — wait a week or two for it to stabilize. Always back up before upgrading so you can roll back if something goes wrong.
:::

Lynn and John agreed to meet weekly to review the system status.

*"Just call me if anything comes up."* John said.

*"Will do — you're a lifesaver, John."*

This experience taught Lynn an important lesson: technical work should be left to the experts. Her job was to understand the requirements, bring the right people in, and keep things moving forward.
