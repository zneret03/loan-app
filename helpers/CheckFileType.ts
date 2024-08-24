export const checkFileType = (
  files: FileList | null,
  acceptedTypes: string[]
): boolean => {
  let incorrectType = false

  if (files) {
    const type = files[0]?.name.split('.').pop() || ''
    const acceptedFilesWithoutDot = acceptedTypes.map((extension) =>
      extension.replace('.', '')
    )
    incorrectType = !acceptedFilesWithoutDot.includes(type.toLowerCase())
  }

  return incorrectType
}
