function setAttributesOnParseObject(
  desiredParseObject: Parse.Object<Parse.Attributes>,
  attributesObj: Object
) {
  for (let entry of Object.entries(attributesObj)) {
    desiredParseObject.set(entry[0], entry[1]);
  }
}

export default setAttributesOnParseObject;
