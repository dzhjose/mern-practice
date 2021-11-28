import {RequestHandler} from 'express';
import VideoModel from '../models/Video';

export const getVideos: RequestHandler = async (req, res) => {
    try {
        const videos = await VideoModel.find();
        return res.json(videos);
    } catch (error) {
        res.json(error);
    }
};

export const createVideo: RequestHandler = async (req, res) =>{
    const vd = await VideoModel.findOne({url: req.body.url});
    if(vd){ //url exist
        return res.status(300).json({message: 'video url already exist'});
    }
    const video = new VideoModel(req.body)
    await video.save();
    res.json('video saved')
};

export const getVideo: RequestHandler = async (req, res) =>{
    try{
        const vd = await VideoModel.findById(req.params.id);
        if(!vd){
            return res.status(204).json({message: 'video not exist'})
        }
        return res.json({video: vd});
    }
    catch(error){
        res.json(error);
    }
};

export const deleteVideo: RequestHandler = async (req, res) =>{
    try{
        const vd = await VideoModel.findByIdAndDelete(req.params.id);
        if(!vd){
            return res.status(204).json({message: 'video not exist'})
        }
        return res.json({message: 'video deleted'});
    }
    catch(error){
        res.json(error);
    }
};

export const updateVideo: RequestHandler = async (req, res) =>{
    try{
        const vd = await VideoModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!vd){
            return res.status(204).json({message: 'video not exist'})
        }
        return res.json({video: vd});
    }
    catch(error){
        res.json(error);
    }
};