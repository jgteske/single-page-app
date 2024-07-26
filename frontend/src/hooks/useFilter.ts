import { MyArray, MyArraySchema } from '../model/types';
import { filterByString } from '../utils/filter';

export const useFilter = () => {
  const testdata: MyArray = [
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
  ];
  const data = MyArraySchema.parse(testdata);
  const filterVal = data.filter(filterByString('test2'));
  console.log(filterVal);
  return filterVal;
};
