
import { Request, Response } from "express";

import Photo from "../models/Photos";
import path from "path";
import fs from 'fs-extra'

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    
    const photos = await Photo.find()
    
    return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params

    const photo = await Photo.findById(id)
    
    return res.json(photo);
}

export async function createPhoto(req: Request, res: Response  ): Promise<Response> {

    console.log(req.body)

    const { title, description } = req.body

    const newPhoto = {
        title,
        description,
        imagePath: req.file.path
    }

    const photo = new Photo(newPhoto)

    await photo.save()
    console.log(photo);

    return res.json({
        ok: 'la imagen se subio con exito'
    })
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {

    const { id } = req.params

    const photo = await Photo.findByIdAndRemove(id)

    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath))   
    }

    return res.json({
        message: 'Photo deleted',
        photo
    })
}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params
    const { title, description } = req.body

    console.log(req.body);
    
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true })

    console.log(updatedPhoto);
    

    return res.json({
        message: 'Photo Updated',
        updatedPhoto
    });
}