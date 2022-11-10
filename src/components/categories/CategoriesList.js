import axios from 'axios';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import {useState, useEffect} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length == 0) {
      (async function () {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + 'categories?per_page=-1',
          );
          if (response.status == 200 && response.data.result) {
            setCategories(response.data.data);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  const handleToggle = (id) => () => {};

  return (
    <List>
      {categories?.length == 0 && (
        <Typography color='primary' sx={{textAlign: 'center'}}>
          No Category
        </Typography>
      )}
      {categories?.length > 0 &&
        categories?.map((value) => (
          <ListItem key={value.id} disablePadding sx={{mb: 1}}>
            <ListItemButton onClick={handleToggle(value.id)} dense sx={{py: 1}}>
              <ListItemText
                id={value.id}
                primary={<Typography color='primary'>{value.name}</Typography>}
              />
              <Badge
                badgeContent={value.auctions_count}
                color='primary'
                sx={{mx: 2}}
                max={999}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}
