import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';

const Profile = () => {
  return (
    <div className={classes.profile}>
      <div className={classes.img}>
        <img
          src="https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg"
          alt=""
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, facilis. Placeat natus officiis mollitia
        consectetur nemo. Numquam corporis voluptates inventore dolorum magni explicabo doloremque doloribus similique
        voluptatibus labore quam voluptate, rerum repellat fuga debitis earum maiores! Non commodi id, sunt minus,
        perferendis neque numquam eligendi quidem quia enim repellendus quam.
      </p>
      <div className={classes.avatar}></div>
      <MyPosts />
    </div>
  );
};

export default Profile;
