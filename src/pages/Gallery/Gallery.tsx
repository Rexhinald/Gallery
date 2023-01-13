import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useAppSelector } from '../../utils/hooks';
import styles from './Gallery.module.css';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { RiMedalLine } from 'react-icons/ri';
import Header from '../../hoc/header/Header';

const GalleryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const galleries = useAppSelector((state) => _.get(state, 'galleries', []));
    const gallery = _.find(galleries, (gallery) => gallery.id === id);

    const imageDisplay = (image: any) =>
        image.type === 'video/mp4' ? (
            <div key={image.id}>
                <video className={styles.thumbnail} muted autoPlay loop playsInline controls={true}>
                    <source src={image.link} type={image.type} />
                </video>
                <div>{image.title}</div>
            </div>
        ) : (
            <div key={image.id}>
                <img className={styles.thumbnail} src={image.link} />
                <div>{image.title}</div>
            </div>
        );

    const singleStream = () =>
        gallery.type === 'video/mp4' ? (
            <video className={styles.thumbnail} muted autoPlay loop playsInline controls={true}>
                <source src={gallery.link} type={gallery.type} />
            </video>
        ) : (
            <img className={styles.thumbnail} src={gallery.link} />
        );

    return (
        <div className={styles.container}>
            <Header />
            {gallery ? (
                <div className={styles.stream}>
                    <h2>{gallery.title}</h2>
                    <p className={styles.description}>{gallery.description}</p>
                    {gallery.images
                        ? gallery.images.map((image: any) => imageDisplay(image))
                        : singleStream()}
                    <div className={styles.stats}>
                        <div className={styles.votes}>
                            <BiUpvote size={20} />
                            <span className={styles.scoresText}>{gallery.ups}</span>
                            <BiDownvote size={20} />
                            <span className={styles.scoresText}>{gallery.downs}</span>
                        </div>
                        {gallery.vote && (
                            <div className={styles.votes}>
                                <RiMedalLine size={20} />
                                <span className={styles.scoresText}>{gallery.vote}</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.notFound}>
                    <div className={styles.notFoundText}>Gallery not found</div>
                    <div className={styles.backButton} onClick={() => navigate('/')}>
                        Go Back
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
