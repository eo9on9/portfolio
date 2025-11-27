function validationFactory(pattern: RegExp, message: string) {
  return {
    pattern,
    message,
  }
}

export const VALIDATION_REQUIRED = validationFactory(
  /^.+$/,
  '필수 입력 항목입니다.',
)

export const VALIDATION_NUMBER = validationFactory(
  /^[0-9]+$/,
  '숫자로 입력해주세요.',
)

export const VALIDATION_POSITIVE_NUMBER = validationFactory(
  /^[1-9][0-9]*$/,
  '양수로 입력해주세요.',
)

export const VALIDATION_MESSAGE = validationFactory(
  /^.*\S.*$/,
  '메시지를 입력해주세요.',
)
