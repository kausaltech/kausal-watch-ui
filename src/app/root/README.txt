The app routing would also work without this extra root path element
prepended to the rest of the path.

However, there is a special case in the nextjs built-in route handling
code, where it tries to match an app route for a static asset when the
file for that static asset is not found. Without this static "root"
segment at the beginning of the path, the combination of three dynamic
segments [domain]/[lang]/[plan] in the path are so permissive that
they match this nextjs fallback/catchall case which in turn results in
all sorts of problems when we try to render the application for a
static asset request.

The only place this root path segment should affect are the URL rewrite
rules inside middleware.ts. This path is not visible to end users.
