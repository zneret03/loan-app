import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@/services/firebase-config'

interface UseUploadImageTypes {
  uploadImage: (image: File) => Promise<{ getUrl: string }>
}

export const useUploadImage = (): UseUploadImageTypes => {
  const uploadImage = async (image: File): Promise<{ getUrl: string }> => {
    const storage = getStorage()
    const imageRef = ref(storage, `${image.name}`)
    const uploadAvatar = await uploadBytes(imageRef, image)
    const getUrl = await getDownloadURL(uploadAvatar.ref)

    return {
      getUrl
    }
  }

  return {
    uploadImage
  }
}
