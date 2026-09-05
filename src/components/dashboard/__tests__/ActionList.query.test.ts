import { type FieldNode, Kind, visit } from 'graphql';

import { GET_ACTION_LIST } from '../ActionList';

describe('DashboardActionList query', () => {
  it('customizes every cross-plan view URL for the current client URL', () => {
    const operation = GET_ACTION_LIST.definitions.find(
      (definition) => definition.kind === Kind.OPERATION_DEFINITION
    );
    expect(operation?.kind).toBe(Kind.OPERATION_DEFINITION);
    if (operation?.kind !== Kind.OPERATION_DEFINITION) return;

    const clientUrlVariable = operation.variableDefinitions?.find(
      (definition) => definition.variable.name.value === 'clientUrl'
    );
    expect(clientUrlVariable).toBeDefined();

    const viewUrlFields: FieldNode[] = [];
    visit(GET_ACTION_LIST, {
      Field(node) {
        if (node.name.value === 'viewUrl') viewUrlFields.push(node);
      },
    });

    expect(viewUrlFields).toHaveLength(4);
    for (const field of viewUrlFields) {
      expect(field.arguments).toHaveLength(1);
      const argument = field.arguments?.[0];
      expect(argument?.name.value).toBe('clientUrl');
      expect(argument?.value.kind).toBe(Kind.VARIABLE);
      if (argument?.value.kind === Kind.VARIABLE) {
        expect(argument.value.name.value).toBe('clientUrl');
      }
    }
  });
});
