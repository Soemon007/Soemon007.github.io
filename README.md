# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deploying to GitHub Pages

The live site is [soemon007.github.io](https://soemon007.github.io), served from the
[`Soemon007/Soemon007.github.io`](https://github.com/Soemon007/Soemon007.github.io) repo. That repo only holds
the built output. **Do not edit it by hand.** It is regenerated from this repo.

```sh
bun run build:static   # builds the site locally; the finished site lands in ./dist
```

To publish by hand, copy the contents of `dist/` into the Pages repo and push to `main`.

### Turning on auto-deploy

`deploy/deploy-pages.yml` is a ready-made GitHub Actions workflow that builds and publishes the site on every
push to `main` (including each change Lovable makes), then checks the new build is actually being served.
It is not active yet. To turn it on:

1. Create a deploy key and store it as a secret:

   ```sh
   ssh-keygen -t ed25519 -N "" -C "rehan-portfolio deploy" -f deploy_key
   gh repo deploy-key add deploy_key.pub --repo Soemon007/Soemon007.github.io --allow-write --title "rehan-portfolio deploy"
   gh secret set PAGES_DEPLOY_KEY --repo Soemon007/rehan-portfolio < deploy_key
   rm deploy_key deploy_key.pub
   ```

2. Move the workflow into place. On github.com choose **Add file > Create new file**, name it
   `.github/workflows/deploy-pages.yml` and paste in the contents of `deploy/deploy-pages.yml`.
   (From the command line, the `gh` token needs the `workflow` scope first: `gh auth refresh -s workflow`.)

### If the site looks stale

Check the Actions tab of both repos. GitHub Pages sometimes leaves a deployment stuck in `waiting`: cancel that
`pages build and deployment` run and re-run it.
