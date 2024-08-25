import { Request } from 'express'
import { getNameFromFullname, handleUploadSingleImage } from './../../utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '../constants/dir'
import path from 'path'
import fs from 'fs'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    await sharp(file.filepath) // Tạo đối tượng sharp với filepath
      .jpeg() // Cấu hình thành định dạng JPEG
      .toFile(newPath) // Lưu kết quả thành file 'test.jpg'
    fs.unlinkSync(file.filepath) //xóa ảnh đã được Upload trên khổi file uploads/temp (bộ nhớ tạm)
    return `http://localhost:3000/uploads/${newName}.jpg`
  }
}

const mediasService = new MediasService()

export default mediasService
