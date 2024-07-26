import { MyArrayData } from '../model/types';

/**
 * Filter MyArray Type by string
 * @param searchString
 * @returns {MyArray} data
 */
export const filterByString = (searchString: string) => {
  return (array: MyArrayData) => {
    return Object.values(array).includes(searchString);
  };
};
