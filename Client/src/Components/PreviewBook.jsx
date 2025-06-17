import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import img from '../assets/img.png'
import Paper from '@mui/material/Paper';
const PreviewBook = () => {
  return (
    <>
     <Box
        sx={{
          backgroundColor: 'lightgray',
          width: '100%',
          height: '20px',
        }}
      />
      <Container maxWidth={false} sx={{maxWidth:'96%',mt:'10px'}}>
            <Typography variant='h4' color='primary' textAlign='center' gutterBottom>
                Book Preview
            </Typography>
        <Stack direction='row'>
            <Stack direction='column'>
        <Paper height={500} width={700} elevation={1}  component='img' src={img} alt='previewImg' sx={{
            objectFit:'fill'
        }}/>


        <Box height={50} width={700} justifyContent='center' display='flex'>
            <Stack direction='row' gap={5}>
            <IconButton>
                <ArrowBackIcon sx={{fontSize:'40px'}}></ArrowBackIcon>
            </IconButton>
            <IconButton>
                <ArrowForwardIcon sx={{fontSize:'40px'}}></ArrowForwardIcon>
            </IconButton>
            </Stack>
        </Box>
        </Stack>
        <Box flexGrow={1} border={1} >
            <Typography variant='h4' textAlign='center' color='primary'>
                Descprition
            </Typography>
        </Box>
        </Stack>
      </Container>
      </>
  )
}

export default PreviewBook