const arr = [
  {
    FeatureItemId: 'string',
    FeatureName: 'string',
    FeaturePath: 'employee/all-employee/add-employee',
    ApiPath: 'string',
    FeatureStatus: 0,
  },
  {
    FeatureItemId: 'string',
    FeatureName: 'string',
    FeaturePath: 'employee/all-employee/edit-employee',
    ApiPath: 'string',
    FeatureStatus: 0,
  },
  {
    FeatureItemId: 'string',
    FeatureName: 'string',
    FeaturePath: 'employee/all-employee/edit-employee/now',
    ApiPath: 'string',
    FeatureStatus: 0,
  },
  {
    FeatureItemId: 'string',
    FeatureName: 'string',
    FeaturePath: 'employee/survey/split survey',
    ApiPath: 'string',
    FeatureStatus: 0,
  },
  {
    FeatureItemId: 'string',
    FeatureName: 'string',
    FeaturePath: 'office/demo',
    ApiPath: 'string',
    FeatureStatus: 0,
  },
];
const updatedWithDepth = arr.map((el) => ({ ...el, depth: el.FeaturePath.split('/').length }));
const grouped = Object.groupBy(updatedWithDepth, (el) => el.depth);
const permissionCollection: any[] = [];
Object.entries(grouped).forEach(([depth, value]) => {
  value?.forEach((el) => {
    let finalObj: { [key: string]: any } = {};
    let currentObj: { [key: string]: any } = finalObj;
    const splitPath = el.FeaturePath.split('/');
    splitPath.forEach((p) => {
      currentObj[p] = {};
      currentObj = currentObj[p];
      // currentObj = finalObj[p]
    });
    currentObj['hello'] = true;
    permissionCollection.push(finalObj);
  });
});

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
export function mergeDeep(target: any, ...sources: any[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

console.dir(mergeDeep({}, ...permissionCollection), { depth: 6 });
