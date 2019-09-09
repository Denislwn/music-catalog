import { GET_ALL_SINGERS, ADD_NEW_SINGER, EDIT_SINGER, DELETE_SINGER } from '../constans'
import { SingerService } from "../services/singerService";
import { notificationSuccess } from '../index'

export const getAllSingers = () => {
  return {
      type: GET_ALL_SINGERS,
      data: SingerService.getSingersList(),
  }
};

export const addNewSinger = (newSingerData) => {
    const newSinger = SingerService.addNewSinger(newSingerData);

    return {
        type: ADD_NEW_SINGER,
        data: newSinger,
    }
};

export const editSinger = (singerId, singer) => {
    const newSinger = SingerService.editSinger({...singer, ID: singerId});

    return {
        type: EDIT_SINGER,
        data: newSinger,
    }
};

export const deleteSinger = (singerId) => {
    SingerService.deleteSinger(singerId);

    notificationSuccess('Исполнитель удален');

    return {
        type: DELETE_SINGER,
        data: singerId,
    }
};
