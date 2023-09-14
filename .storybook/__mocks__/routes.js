import { Link as NextLink, Router } from 'common/i18n';

const Link = (props, children) => <NextLink {...props} prefetch={false} />;

export { Link, Router };
