deploy:
	bun run build
	firebase deploy
stop:
	firebase hosting:disable
test:
	bun run test