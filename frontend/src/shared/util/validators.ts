// import moment from 'moment';

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
// const VALIDATOR_TYPE_DATE = 'DATE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE});
export const VALIDATOR_MINLENGTH = (value: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  value: value
});
export const VALIDATOR_MAXLENGTH = (value: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  value: value
});
export const VALIDATOR_MIN = (value: number) => ({
  type: VALIDATOR_TYPE_MIN,
  value: value
});
export const VALIDATOR_MAX = (value: number) => ({
  type: VALIDATOR_TYPE_MAX,
  value: value
});
// export const VALIDATOR_DATE = () => ({
//   type: VALIDATOR_TYPE_DATE
// });

export const validate = (value: any, validators: any[]) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.value;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.value;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.value;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.value;
    }
    // HANDLED ON THE BACKEND
    // if (validator.type === VALIDATOR_TYPE_DATE) {
    //   let date = moment();
    //   let currentDate = date.format("YYYY-MM-DD");
    //   isValid = isValid && value <= currentDate ? true : false;
    // }
  }
  return isValid;
}



