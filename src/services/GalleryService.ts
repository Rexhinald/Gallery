import API from '../utils/API';

const GalleryService = {
    getAll: (section: string, sort: string, window: string, page: number, showViral: boolean) => {
        return API.get(`gallery/${section}/${sort}/${window}/${page}`, { params: { showViral } });
    }
};

export default GalleryService;
