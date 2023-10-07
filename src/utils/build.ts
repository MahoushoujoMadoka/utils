export function buildFormData(data: Record<string, any>) {
  const formData = new FormData()
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      formData.append(key, data[key])
    }
  }
  return formData
}
