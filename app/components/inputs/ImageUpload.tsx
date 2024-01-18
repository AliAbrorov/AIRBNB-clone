// import React, { useState } from "react";
// import { storage } from "../../libs/firebase";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// interface ImageUploadProps {
//   onChange: (value: string) => void;
//   value?: string;
// }

// export default function ImageUpload({ onChange, value }: ImageUploadProps) {
//   const [imageUpload, setImageUpload] = useState(value);

//   function uploadImage() {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then(() => {
//       alert("Image Uploaded");
//     });
//   }

//   return (
//     <div>
//       <label className="cursor-pointer border flex h-32 items-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 text-center justify-center gap-1">
//         <input
//           type="file"
//           className="hidden"
//           onChange={(e) => {
//             setImageUpload(e.target.files[0]);
//           }}
//         />
//       </label>
//       <button onClick={uploadImage}>Upload Image</button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { storage } from "../../libs/firebase";
// import { ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// interface ImageUploadProps {
//   onChange: (value: string) => void;
//   value?: string;
// }

// export default function ImageUpload({ onChange, value }: ImageUploadProps) {
//   const [imageUpload, setImageUpload] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const uploadImage = () => {
//     if (!imageUpload) return;

//     setIsLoading(true);

//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload)
//       .then(() => {
//         alert("Image Uploaded");
//         onChange(imageRef.fullPath); // Assuming you want to pass the storage path as a string
//       })
//       .catch((error) => {
//         console.error("Error uploading image:", error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setImageUpload(selectedFile);
//     }
//   };

//   return (
//     <div>
//       <label className="cursor-pointer border flex h-32 items-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 text-center justify-center gap-1">
//         <input type="file" className="hidden" onChange={handleFileChange} />
//       </label>
//       <button onClick={uploadImage} disabled={!imageUpload || isLoading}>
//         {isLoading ? "Uploading..." : "Upload Image"}
//       </button>
//     </div>
//   );
// }

import React, { useCallback, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../libs/firebase";
import { v4 } from "uuid";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploading, setUploading] = useState(false);

  // const handleUpload = useCallback(
  //   async (file: File) => {
  //     try {
  //       setUploading(true);

  //       const imageRef = ref(storage, `images/${file.name + v4()}`);
  //       await uploadBytes(imageRef, file);

  //       const downloadURL = await getDownloadURL(imageRef);

  //       onChange(downloadURL);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   },
  //   [onChange]
  // );
  // const handleUpload = useCallback(
  //   async (file: File) => {
  //     try {
  //       setUploading(true);
  //       toast.promise(
  //         // The promise function that performs the upload
  //         async () => {
  //           const imageRef = ref(storage, `images/${file.name + v4()}`);
  //           await uploadBytes(imageRef, file);

  //           const downloadURL = await getDownloadURL(imageRef);

  //           onChange(downloadURL);
  //           return downloadURL;
  //         },
  //         {
  //           loading: "Uploading image...",
  //           success: (downloadURL) => {
  //             setUploading(false);
  //             return `Image uploaded successfully. URL: ${downloadURL}`;
  //           },
  //           error: (error) => {
  //             console.error("Error uploading image:", error);
  //             setUploading(false);
  //             return "Error uploading image.";
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       setUploading(false);
  //     }
  //   },
  //   [onChange]
  // );

  const handleUpload = useCallback(
    async (file: File) => {
      try {
        const uploadPromise = async () => {
          setUploading(true);

          const imageRef = ref(storage, `images/${file.name + v4()}`);
          await uploadBytes(imageRef, file);

          const downloadURL = await getDownloadURL(imageRef);

          onChange(downloadURL);

          return downloadURL;
        };

        await toast.promise(uploadPromise(), {
          loading: "Uploading image...",
          success: "Image uploaded successfully",
          error: "Error uploading image",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  return (
    <div>
      <label className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={value}
              alt="House"
            />
          </div>
        )}
      </label>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
