import { Box, CircularProgress, Link } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FC, useState } from 'react';
import { PhotoDetails } from '../components/PhotoDetails';
import { useGetImageListQuery } from '../redux/slices/imageApi';
import { ImageType } from '../redux/slices/types';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/slices/userApi';

export const Photos: FC = () => {
  const { data, isLoading } = useGetImageListQuery();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const { data: user } = useGetUserQuery()

  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      />
    );
  }

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ color: 'gray', p: 5, }}>
      <Box sx={{display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>Photo gallery</h1>
        <h1>{user?.user.email}</h1>
        <Link
          sx={{
            fontSize: 25,
            color: 'grey',
            "&hover": {
              cursor: 'pointer'
            }
          }}
          variant="body2"
          onClick={() =>
            navigate('/logout')
          }
        >
          Log Out
        </Link>
      </Box>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={500}>
        {data?.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              onClick={() => handleImageClick(item)}
            />
          </ImageListItem>
        ))};
      </ImageList>
      {!!selectedImage && <PhotoDetails userId={user.user.id} image={selectedImage} onClose={handleClose}></PhotoDetails>}
    </Box>
  );
};
