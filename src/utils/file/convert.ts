/**
 * Converts a data URL to a Blob object.
 * @param base64Buf - A data URL string.
 * @returns A Blob object representing the data contained in the string.
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], { type: mime })
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas: HTMLCanvasElement | null = document.createElement('CANVAS') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = ''
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject(Error('canvas is null'))
      }

      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}

export function blobToText(blob: BlobPart) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(new Blob([blob]), 'utf-8')
    fileReader.onload = (res: any) => {
      try {
        const { result } = res.target // 得到字符串
        const data = JSON.parse(result)
        if (data) {
          resolve(data)
        } else {
          reject(Error('blobToText error'))
        }
      } catch (e) {
        reject(e)
      }
    }
  })
}
