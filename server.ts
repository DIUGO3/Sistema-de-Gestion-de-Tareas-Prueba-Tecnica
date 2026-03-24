import app from './app';
import { ConfigManager } from './src/config/configManager';

const config = ConfigManager.getInstance();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
});
