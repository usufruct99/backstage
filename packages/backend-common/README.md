# @backstage/backend-common

Common functionality library for Backstage backends, implementing logging,
error handling and similar.

## Usage

Add the library to your backend package:

```sh
yarn add @backstage/backend-common
```

then make use of the handlers and logger as necessary:

```typescript
import {
  errorHandler,
  getRootLogger,
  notFoundHandler,
  requestLoggingHandler,
} from '@backstage/backend-common';

const app = express();
app.use(requestLoggingHandler());
app.use('/home', myHomeRouter);
app.use(errorHandler());
app.use(notFoundHandler());

app.listen(PORT, () => {
  getRootLogger().info(`Listening on port ${PORT}`);
});
```

## Documentation

- [Backstage Readme](https://github.com/spotify/backstage/blob/master/README.md)
- [Backstage Documentation](https://github.com/spotify/backstage/blob/master/docs/README.md)
