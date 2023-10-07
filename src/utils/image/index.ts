export function getImageInfoByBase64(base64: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image()
    img.src = base64
    img.onload = () => {
      const { width, height } = img
      resolve({ width, height })
    }
    img.onerror = reject
  })
}
