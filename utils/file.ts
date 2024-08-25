import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_TEMP_DIR } from '../src/constants/dir'

// nếu trong server chưa có file " uploads " chỉ cần chạy lại server thì tạo lại 1 file mới
export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // mục đích là để tạo folder nested
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  //const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB

    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('Loại tệp không hợp lệ') as any)
      }
      return true
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      //eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('Tập tin rỗng'))
      }
      resolve((files.image as File[])[0])
    })
  })
}

export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
