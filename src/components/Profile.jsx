import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <div className="img">
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
      <div className="avatar"></div>
      <div className="postplace">
        <div className="newpost">Newpost</div>
        <div className="post">Post1</div>
        <div className="post">Post2</div>
      </div>
    </div>
  );
};

export default Profile;
