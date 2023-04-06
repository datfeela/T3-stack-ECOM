import type { NextApiHandler } from 'next'
import fs from 'fs/promises'
import { env } from '~/env.mjs'
import type formidable from 'formidable'
import { readFile } from '~/server/helpers/readFile'
import path from 'path'

const imgPath = path.join(process.cwd(), '/public', env.NEXT_PUBLIC_PRODUCT_IMAGES_PATH)

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler: NextApiHandler = async (req, res) => {
    try {
        await fs.readdir(imgPath)
    } catch (e) {
        await fs.mkdir(imgPath, { recursive: true })
    }

    let result
    try {
        result = await readFile(req, true, imgPath)
    } catch (e) {
        throw new Error('cant read file!')
    }

    res.json({ status: 'ok', data: result })
}

export interface ImagePathResponse {
    status: 'ok' | 'fail'
    data: {
        fields: formidable.Fields
        files: formidable.Files
    }
}

export default handler
