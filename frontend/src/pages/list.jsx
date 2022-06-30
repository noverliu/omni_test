import {
  Button,
  Container,
  TextField,
  Typography,
  Tooltip
} from '@mui/material';
import { useEffect, useReducer } from 'react';
import { useStore } from '../store/store';
import { copy } from '../utils/clipboard';

const initUrlObj = {
  link: '',
  errorMsg: 'Invalid link',
  isValid: false
}

const checkURLReg = /^https?:\/\/.*/i;

const AddForm = () => {
  const [urlObj, dispatch] = useReducer((prevUrl, action) => {
    switch (action.type) {
      case 'input':
        const isValid = !!action.newLink.match(checkURLReg);
        return {
          link: action.newLink,
          errorMsg: isValid ? '' : prevUrl.errorMsg,
          isValid
        };
      case 'clean':
        return initUrlObj;
    }
    
  }, initUrlObj);
  const { newShorten } = useStore();
  const inputChange = (e) => {
    dispatch({
      type: 'input',
      newLink: e.target.value
    });
  }
  const createNewShorten = async () => {
    let newLink = urlObj.link;
    dispatch({
      type: 'clean',
      newLink: ''
    });
    await newShorten(newLink)
  }
  return (
    <Container>
      <TextField size='small' value={urlObj.link} onChange={inputChange} />
      <Tooltip title={urlObj.errorMsg}>
        <span>
          <Button onClick={createNewShorten} disabled={!urlObj.isValid}>Create</Button>
        </span>
      </Tooltip>
    </Container>
  );
}

const LinkItem = (urlObj) => {
  const { shortKey, originLink } = urlObj;
  const link = `${baseURL || location.origin}/${shortKey}`;
  return (
    <tr>
      <td>{originLink}</td>
      <td><a href={`${link}`}>{link}</a></td>
      <td>
        <Button onClick={() => removeShorten(urlObj)}>Delete</Button>
        <Button onClick={() => copy({ name: 'link', content: link })}>Copy</Button>
      </td>
    </tr>
  );
}

const LinkList = () => {
  const { removeShorten, urlList } = useStore();  
  return (
    <table>
      <thead>
        <tr>
          <th>Origin</th>
          <th>Shorten</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {urlList.list.map(url =><LinkItem key={url.shortKey} {...url} />)}
      </tbody>
    </table>
  );
}

const ListPage = () => {
  const { loadList } = useStore();  
  useEffect(() => {
    loadList()
  }, [])
  
  return (
    <Container maxWidth="md" sx={{ boxShadow: "0 0 20px 20px #fff", height: '800px' }}>
      <Typography variant="h2">
        URL Shorten
      </Typography>
      <AddForm />
      <LinkList />
    </Container>
  )
};

export default ListPage;
