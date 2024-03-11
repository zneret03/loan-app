export const checkFileSize = (
  files: FileList | null,
  maxSize: number
): boolean => {
  let exceedsMaxSize = false

  if (files) exceedsMaxSize = files[0]?.size > maxSize

  return exceedsMaxSize
}
