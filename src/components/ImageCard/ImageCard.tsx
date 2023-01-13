import React from 'react';
import styles from './ImageCard.module.css';
import { ImageCardProps } from '../../interfaces/ImageCardProps';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { RiMedalLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ImageCard = ({ gallery }: ImageCardProps) => {
    const navigate = useNavigate();

    const thumbnail = gallery.images
        ? gallery.images[0].type === 'video/mp4'
            ? { url: gallery.images[0].link, type: 'video/mp4' }
            : { url: gallery.images[0].link, type: 'image' }
        : gallery.type === 'video/mp4'
        ? { url: gallery.link, type: 'video/mp4' }
        : { url: gallery.link, type: 'image' };

    return (
        <div className={styles.container} onClick={() => navigate(`/gallery/${gallery.id}`)}>
            {thumbnail.type === 'video/mp4' ? (
                <video
                    className={styles.thumbnail}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls={false}>
                    <source src={thumbnail.url} type={thumbnail.type} />
                </video>
            ) : (
                <img className={styles.thumbnail} src={thumbnail.url} />
            )}
            <div className={styles.info}>
                <div>{gallery.title}</div>
                <div className={styles.stats}>
                    <div className={styles.votes}>
                        <BiUpvote size={15} />
                        <span className={styles.scoresText}>{gallery.ups}</span>
                        <BiDownvote size={15} />
                        <span className={styles.scoresText}>{gallery.downs}</span>
                    </div>
                    {gallery.vote && (
                        <div className={styles.votes}>
                            <RiMedalLine size={15} />
                            <span className={styles.scoresText}>{gallery.vote}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
