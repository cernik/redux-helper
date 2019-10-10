export function toList(data: any) {
  if (Array.isArray(data)) {
    return data;
  }
  if (typeof data === 'object') {
    return [data];
  }
  return [];
}

export function listToMap(list: []): {} {
  return list.reduce((acc, item) => {
    if (!item.id) {
      return acc;
    }
    return {
      ...acc,
      [item.id]: item,
    };
  }, {});
}

export function listOrObjToMap(data: any): {} {
  if (Array.isArray(data)) {
    return listToMap(data);
  }

  if (typeof data === 'object') {
    if (data.id) {
      return {
        [data.id]: data,
      };
    }
    return data;
  }
  return {};
}

export function updateMapItem(acc = {}, item = {}) {
  const { id, ...rest } = item;
  if (id && rest.length) {
    return {
      ...acc,
      [id]: {
        ...acc[id],
        id,
        ...rest,
      },
    };
  }
  return acc;
}

export function filterMapItem(acc = [], item = {}) {
  const { id } = item;
  if (id && acc.id) {
    delete acc.id;
    return acc;
  }
  return acc;
}
