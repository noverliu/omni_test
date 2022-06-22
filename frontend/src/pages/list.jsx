import {
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from '../store/store';

const ListPage = () => {
  const [newUrl, setNewUrl] = useState('');
  const { loadList, removeShorten, newShorten, urlList } = useStore();
  useEffect(() => {
    loadList()
  }, [])
  const copy = (shorten) => {
    navigator.clipboard.writeText(`${location.origin}/${shorten.shortKey}`)
      .then(() => {
        alert('Link copied!');
      })
      .catch(() => {
        console.log('Error in copying link');
      });
  }
  return (
    <Container maxWidth="md" sx={{ boxShadow: "0 0 20px 20px #fff", height: '800px' }}>
      <Typography variant="h2">
        URL Shorten
      </Typography>
      <TextField size='small' value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
      <Button onClick={()=>newShorten(newUrl)}>Create</Button>
      <table>
        <thead>
          <tr>
            <th>Origin</th>
            <th>Shorten</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {urlList.list.map(url => (
            <tr key={url.shortKey}>
              <td>{url.originLink}</td>
              <td><a href={`/${url.shortKey}`}>{`${location.origin}/${url.shortKey}`}</a></td>
              <td>
                <Button onClick={() => removeShorten(url)}>Delete</Button>
                <Button onClick={() => copy(url)}>Copy</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
};

export default ListPage;
