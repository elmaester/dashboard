function convertParseObjToLocalType(parseObj: Parse.Object<Parse.Attributes>) {
  const localType: any = {
    id: parseObj.id,
    createdAt: parseObj.createdAt,
    updatedAt: parseObj.updatedAt,
  };
  Object.entries(parseObj.attributes).forEach((attribute) => {
    localType[attribute[0]] = attribute[1];
  });
  return localType;
}

export default convertParseObjToLocalType;
