export class SearchUtil {

  getFilterValue = (key: any, operation: any, value: any) => {
    return {
      "key": key,
      "operation": operation,
      "value": value
    };
  };

}
