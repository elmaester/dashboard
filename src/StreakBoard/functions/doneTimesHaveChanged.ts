function doneTimesHaveChanged(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) return true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return true;
  }
  return false;
}

export default doneTimesHaveChanged;
