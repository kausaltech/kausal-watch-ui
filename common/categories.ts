

export interface ObjectInput<Type> {
  id: string,
  parent?: {
    id: string,
  },
}

export interface ObjectHierarchyMember<Type> extends Omit<ObjectInput<Type>, 'parent'> {
  depth: number,
  parent: null | this,
  children: this[],
};

export function constructObjectHierarchy<Type extends ObjectHierarchyMember<Type>>(
  objsIn: ObjectInput<Type>[]
) {
  const objsById = new Map();

  let objs: Type[] = objsIn.map((obj) => {
    // @ts-ignore
    const newObj: Type = {
      ...obj,
      children: [],
      depth: 0,
    };
    objsById.set(newObj.id, newObj);
    return newObj;
  });
  objs.forEach((obj) => {
    if (!obj.parent) return;
    let parent = objsById.get(obj.parent.id);
    parent.children.push(obj);
    obj.parent = parent;
  });
  objs.forEach((obj) => {
    let parent = obj.parent;
    let depth = 0;
    while (parent) {
      depth += 1;
      parent = parent.parent;
    }
    obj.depth = depth;
  });
  return objs;
}
