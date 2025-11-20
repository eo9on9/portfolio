export function tw(classes: TemplateStringsArray | string | string[]) {
  const string = typeof classes === 'string' ? classes : classes.join(' ')
  return string.replace(/\s+/g, ' ').trim()
}
