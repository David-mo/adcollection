import * as migration_20260911_203704_initial from './20260911_203704_initial';
import * as migration_20260914_181353_drop_gif_field from './20260914_181353_drop_gif_field';
import * as migration_20260921_193032_clients_and_optional_platform from './20260921_193032_clients_and_optional_platform';

export const migrations = [
  {
    up: migration_20260911_203704_initial.up,
    down: migration_20260911_203704_initial.down,
    name: '20260911_203704_initial',
  },
  {
    up: migration_20260914_181353_drop_gif_field.up,
    down: migration_20260914_181353_drop_gif_field.down,
    name: '20260914_181353_drop_gif_field',
  },
  {
    up: migration_20260921_193032_clients_and_optional_platform.up,
    down: migration_20260921_193032_clients_and_optional_platform.down,
    name: '20260921_193032_clients_and_optional_platform'
  },
];
