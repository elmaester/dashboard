function setAttributesOnParseObject(
  desiredParseObject: Parse.Object<Parse.Attributes>,
  attributesObj: Object
) {
  for (let entry of Object.entries(attributesObj)) {
    entry[1] === null
      ? desiredParseObject.unset(entry[0])
      : desiredParseObject.set(entry[0], entry[1]);
  }
}

export default setAttributesOnParseObject;
