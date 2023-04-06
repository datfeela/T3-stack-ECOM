import type { NextApiRequest } from 'next'
import formidable from 'formidable'
import path from 'path'
import { nanoid } from 'nanoid'

export type ReadFile = (
    req: NextApiRequest,
    saveLocally: boolean,
    pathToSave?: string,
) => Promise<{ fields: formidable.Fields; files: formidable.Files }>

export const readFile: ReadFile = (req, saveLocally, pathToSave) => {
    const options: formidable.Options = {}
    if (saveLocally && pathToSave) {
        options.uploadDir = pathToSave
        options.filename = (name, ext, part, form) => {
            let fileType = '.unknown'
            if (part.mimetype) fileType = '.' + path.basename(part.mimetype)

            return nanoid() + fileType
        }
    }

    // can upload to cloud (google drive?) instead of saving locally, check perf
    // if (!saveLocally)

    const form = formidable(options)

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)

            // if (files.image && !files.image[0]) console.log(files.image?.newFilename)

            resolve({ fields, files })
        })
    })
}
