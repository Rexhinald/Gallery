import React, { useEffect, useState } from 'react';
import ImageCard from '../../components/ImageCard/ImageCard';
import styles from './Home.module.css';
import Select from '../../core/select/Select';
import { HiOutlineFire, HiFire } from 'react-icons/hi';
import GalleryService from '../../services/GalleryService';
import { Gallery } from '../../interfaces/Gallery';
import { SectionOptions, SortOptions, WindowOptions } from '../../utils/constants/FilterOptions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { addGalleries } from '../../redux/galleries/GalleriesSlice';
import _ from 'lodash';
import Pagination from '../../core/pagination/Pagination';

const HomePage = () => {
    const dispatch = useAppDispatch();

    const galleries = useAppSelector((state) => _.get(state, 'galleries', []));

    const [section, setSection] = useState('hot');
    const [sort, setSort] = useState('viral');
    const [window, setWindow] = useState('day');
    const [showViral, setShowViral] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        GalleryService.getAll(section, sort, window, page, showViral)
            .then((res) => {
                dispatch(addGalleries(res.data.data));
            })
            .catch((err) => console.error(err.response.data));
    }, [section, sort, window, page, showViral]);

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <div
                    className={`${styles.viral} ${showViral && styles.bolder}`}
                    onClick={() => setShowViral((prevState) => !prevState)}>
                    <span>Viral</span>
                    {showViral ? (
                        <HiFire style={{ marginLeft: 5 }} />
                    ) : (
                        <HiOutlineFire style={{ marginLeft: 5 }} />
                    )}
                </div>
                <div className={styles.selectFilters}>
                    <Select options={SectionOptions} value={section} onSelect={setSection} />
                    <Select options={SortOptions} value={sort} onSelect={setSort} />
                    <Select options={WindowOptions} value={window} onSelect={setWindow} />
                </div>
            </div>
            <div className={styles.galleryContainer}>
                {galleries.map((gallery: Gallery) => {
                    return <ImageCard key={gallery.id} gallery={gallery} />;
                })}
            </div>
            <div className={styles.paginationWrapper}>
                <Pagination page={page} onPageChange={setPage} />
            </div>
        </div>
    );
};

export default HomePage;
