# ARCH=linux/amd64

# ref: https://nektosact.com/usage/index.html
.PHONY: ci-deploy
act-deploy:
	op run --env-file=".env" --cache=false -- \
		act -W ".github/workflows/deploy.yml" \
			-s CLOUDFLARE_API_TOKEN \
			-s CLOUDFLARE_ACCOUNT_ID
