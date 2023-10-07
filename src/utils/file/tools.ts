/**
 * 获取文件扩展名
 */
export function getFileExt(fileName: string) {
  const index = fileName.lastIndexOf('.')
  const ext = fileName.slice(index + 1).toLowerCase()
  return ext
}

/**
 * Generates an accepted file types string for file upload input from provided file suffixes.
 * @param suffixes - An array of file suffixes.
 * @returns A string of accepted file types.
 */
export function generateFileAccept(suffixes: string[]) {
  return suffixes.reduce((acc, item, index) => {
    acc += `.${item}`
    if (index !== suffixes.length - 1) {
      acc += ','
    }
    return acc
  }, '')
}

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']

export function formatFileSize(fileSize: number, units = FILE_SIZE_UNITS) {
  if (typeof fileSize !== 'number' || fileSize < 0) {
    console.error('fileSize must be a positive number')
    return ''
  }

  if (fileSize < 1024 || !units.length) {
    const currentSize = Number.isInteger(fileSize) ? String(fileSize) : fileSize.toFixed(2)
    return units[0] ? currentSize + units[0] : currentSize
  }
  return formatFileSize(fileSize / 1024, units.slice(1))
}

// 按二进制格式读取文件
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      resolve(e.target?.result as ArrayBuffer)
    }
  })
}
