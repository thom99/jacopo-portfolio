// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// })

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export async function getPhotos() {
//   const resources = await cloudinary.api.resources({
//     resource_type: 'image',
//     type: 'upload',
//     max_results: 30,
//     prefix: 'photos/', // opzionale, se vuoi filtrare con un folder
//   });
//   return resources.resources;
// }

// export async function getVideos() {
//   const resources = await cloudinary.api.resources({
//     resource_type: 'video',
//     type: 'upload',
//     max_results: 30,
//     prefix: 'videos/', // opzionale
//   });
//   return resources.resources;
// }


export default cloudinary