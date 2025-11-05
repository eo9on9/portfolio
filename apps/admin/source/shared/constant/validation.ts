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

export const VALIDATION_NAME = validationFactory(
  /^[가-힣a-zA-Z\s]{2,20}$/,
  '2자 이상 20자 이하의 한글 또는 영문으로 입력해주세요.',
)

export const VALIDATION_EMAIL = validationFactory(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  '이메일 형식으로 입력해주세요.',
)

export const VALIDATION_PHONE = validationFactory(
  /^01[0-9]{8,9}$/,
  '휴대폰 번호 형식으로 입력해주세요.',
)
