import moment from 'moment';
import { mapProps } from 'recompose';
import Text from './text';

export default mapProps(({ value, format, ...others }) => {
  return {
    value: value ? moment(new Date(value)).format(format) : '',
    ...others,
  };
})(Text);
