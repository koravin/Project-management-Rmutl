import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const Project_preview = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 280, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='300'
            image='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
          />
          <CardContent>
            <Typography gutterBottom component='div'>
              โปรเจค: xxx-xxxxx-xxxxxxxx
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 280, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, ml: 5 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='300'
            image='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
          />
          <CardContent>
            <Typography gutterBottom component='div'>
              โปรเจค: xxx-xxxxx-xxxxxxxx
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 280, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, ml: 5 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='300'
            image='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
          />
          <CardContent>
            <Typography gutterBottom component='div'>
              โปรเจค: xxx-xxxxx-xxxxxxxx
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 280, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, ml: 5 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='300'
            image='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
          />
          <CardContent>
            <Typography gutterBottom component='div'>
              โปรเจค: xxx-xxxxx-xxxxxxxx
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 280, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, ml: 5 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='300'
            image='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
          />
          <CardContent>
            <Typography gutterBottom component='div'>
              โปรเจค: xxx-xxxxx-xxxxxxxx
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Project_preview
