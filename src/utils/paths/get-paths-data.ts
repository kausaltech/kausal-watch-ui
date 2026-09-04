import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { getPathsInstance } from '@/queries/paths/get-paths-instance';
import { tryRequest } from '@/utils/api.utils';

type PathsInstanceRequest = (pathsInstance: string) => ReturnType<typeof getPathsInstance>;

export async function getPathsData(
  pathsInstance: string,
  request: PathsInstanceRequest = getPathsInstance
): Promise<GetInstanceContextQuery | undefined> {
  if (!pathsInstance) return undefined;

  const result = await tryRequest<GetInstanceContextQuery>(request(pathsInstance), {
    pathsInstance,
    context: 'getPathsData',
  });
  if ('error' in result && result.error) {
    return undefined;
  }
  if (result.data?.instance) {
    return result.data;
  }
  return undefined;
}
